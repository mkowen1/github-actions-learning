# Workflows

Learn how to create and configure GitHub Actions workflows for automation.

## Workflow File Structure

Workflow files are stored in the `.github/workflows` directory and use YAML syntax:

```
.github/
└── workflows/
    ├── ci.yml
    ├── deploy.yml
    └── docs.yml
```

## Basic Workflow Anatomy

```yaml title=".github/workflows/example.yml"
name: Example Workflow

# When to run this workflow
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

# Environment variables available to all jobs
env:
  NODE_VERSION: '18'

# Jobs to run
jobs:
  build:
    name: Build and Test
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
```

## Trigger Events

### Push Events

```yaml
on:
  push:
    branches: [ main, develop ]
    paths:
      - 'src/**'
      - '!docs/**'
    tags:
      - 'v*'
```

### Pull Request Events

```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened]
    branches: [ main ]
    paths-ignore:
      - '**.md'
      - 'docs/**'
```

### Schedule Events

```yaml
on:
  schedule:
    # Run at 2 AM UTC every day
    - cron: '0 2 * * *'
    # Run every Monday at 8 AM UTC
    - cron: '0 8 * * 1'
```

### Manual Dispatch

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'staging'
        type: choice
        options:
        - staging
        - production
      debug:
        description: 'Enable debug logging'
        required: false
        default: false
        type: boolean
```

## Job Configuration

### Basic Job

```yaml
jobs:
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    - run: npm test
```

### Job Dependencies

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - run: echo "Building..."
    
  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
    - run: echo "Testing..."
    
  deploy:
    needs: [build, test]
    runs-on: ubuntu-latest
    steps:
    - run: echo "Deploying..."
```

### Job Outputs

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.version.outputs.version }}
      
    steps:
    - id: version
      run: echo "version=1.2.3" >> $GITHUB_OUTPUT
    
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
    - run: echo "Deploying version ${{ needs.build.outputs.version }}"
```

## Matrix Strategies

### Basic Matrix

```yaml
jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [16, 18, 20]
        
    runs-on: ${{ matrix.os }}
    
    steps:
    - uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
```

### Matrix with Exclusions

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
    node-version: [16, 18, 20]
    exclude:
      - os: windows-latest
        node-version: 16
      - os: macos-latest
        node-version: 16
```

### Matrix with Includes

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]
    node-version: [18, 20]
    include:
      - os: ubuntu-latest
        node-version: 16
        experimental: true
```

## Environment Variables

### Global Environment Variables

```yaml
env:
  NODE_ENV: production
  API_URL: https://api.example.com

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - run: echo $NODE_ENV
```

### Job-level Environment Variables

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    env:
      BUILD_CONFIG: release
    
    steps:
    - run: echo $BUILD_CONFIG
```

### Step-level Environment Variables

```yaml
steps:
- name: Deploy
  env:
    DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
  run: |
    echo "Deploying with key"
    # Use $DEPLOY_KEY here
```

## Conditional Execution

### Simple Conditions

```yaml
steps:
- name: Deploy to production
  if: github.ref == 'refs/heads/main'
  run: echo "Deploying to production"

- name: Deploy to staging
  if: github.ref != 'refs/heads/main'
  run: echo "Deploying to staging"
```

### Complex Conditions

```yaml
steps:
- name: Run on success
  if: success()
  run: echo "All previous steps succeeded"

- name: Run on failure
  if: failure()
  run: echo "A previous step failed"

- name: Always run
  if: always()
  run: echo "This always runs"

- name: Conditional with multiple checks
  if: success() && github.event_name == 'push'
  run: echo "Success on push event"
```

## Secrets and Variables

### Using Repository Secrets

```yaml
steps:
- name: Deploy
  env:
    API_KEY: ${{ secrets.API_KEY }}
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
  run: |
    echo "Deploying with API key: ${API_KEY:0:4}****"
```

### Using Variables

```yaml
steps:
- name: Build
  env:
    NODE_VERSION: ${{ vars.NODE_VERSION }}
    BUILD_COMMAND: ${{ vars.BUILD_COMMAND }}
  run: |
    echo "Building with Node.js $NODE_VERSION"
    $BUILD_COMMAND
```

## Artifacts and Caching

### Upload Artifacts

```yaml
steps:
- name: Build
  run: npm run build

- name: Upload build artifacts
  uses: actions/upload-artifact@v4
  with:
    name: build-files
    path: dist/
    retention-days: 30
```

### Download Artifacts

```yaml
steps:
- name: Download build artifacts
  uses: actions/download-artifact@v4
  with:
    name: build-files
    path: dist/

- name: Deploy
  run: |
    echo "Files in dist:"
    ls -la dist/
```

### Caching Dependencies

```yaml
steps:
- uses: actions/checkout@v4

- uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'

# Or manual caching
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

## Documentation Workflow Example

Here's the workflow used to deploy this documentation:

```yaml title=".github/workflows/deploy-docs.yml"
name: Deploy Documentation

on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - 'mkdocs.yml'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0
        
    - uses: actions/setup-python@v4
      with:
        python-version: '3.11'
        
    - uses: astral-sh/setup-uv@v3
      with:
        enable-cache: true
        
    - run: uv sync --group docs
    - run: uv run mkdocs build --verbose --clean
    
    - uses: actions/upload-pages-artifact@v2
      with:
        path: './site'

  deploy:
    needs: build
    runs-on: ubuntu-latest
    
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
      
    steps:
    - uses: actions/configure-pages@v3
    - uses: actions/deploy-pages@v2
      id: deployment
```

## Best Practices

!!! tip "Workflow Optimization"
    - Use caching to speed up builds
    - Fail fast with appropriate job dependencies
    - Use matrix builds for cross-platform testing
    - Keep workflows focused and modular

!!! tip "Security"
    - Use `permissions` to limit what workflows can do
    - Never log secrets or sensitive data
    - Use environment protection rules for deployments
    - Pin action versions for security

!!! tip "Maintainability"
    - Use clear, descriptive names for workflows and jobs
    - Add comments to explain complex logic
    - Keep workflows DRY with reusable workflows
    - Use semantic versioning for custom actions

## Troubleshooting

### Common Issues

1. **Workflow not triggering**: Check event configuration and file location
2. **Permission denied**: Review repository permissions and workflow permissions
3. **Secrets not available**: Ensure secrets are configured correctly
4. **Cache misses**: Verify cache key patterns and restore keys

### Debugging Tips

```yaml
- name: Debug context
  env:
    GITHUB_CONTEXT: ${{ toJson(github) }}
  run: echo "$GITHUB_CONTEXT"

- name: Debug environment
  run: |
    echo "Current directory: $(pwd)"
    echo "Files:"
    ls -la
    echo "Environment variables:"
    env | sort
```
