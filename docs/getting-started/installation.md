# Installation

This guide will help you set up MkDocs with Material theme and Mermaid support.

## Prerequisites

- Python 3.8 or later
- pip (Python package manager)
- Git (for version control)

## Quick Installation

Install the required packages:

```bash
pip install mkdocs-material mkdocs-git-revision-date-localized-plugin
```

## Detailed Setup

### 1. Create Virtual Environment (Recommended)

=== "Unix/macOS"
    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

=== "Windows"
    ```cmd
    python -m venv venv
    venv\Scripts\activate
    ```

### 2. Install Dependencies

```bash
# Core MkDocs with Material theme
pip install mkdocs-material

# Additional plugins
pip install mkdocs-git-revision-date-localized-plugin

# Optional: For math support
pip install mkdocs-material[imaging]
```

### 3. Verify Installation

```bash
mkdocs --version
```

You should see output similar to:
```
mkdocs, version 1.5.3 from /path/to/mkdocs
```

## Project Structure

A typical MkDocs project structure:

```
project/
├── mkdocs.yml          # Configuration file
├── docs/               # Documentation files
│   ├── index.md       # Home page
│   ├── stylesheets/   # Custom CSS
│   └── javascripts/   # Custom JS
└── site/              # Generated site (after build)
```

## Configuration File

Create `mkdocs.yml` in your project root:

```yaml title="mkdocs.yml"
site_name: My Documentation
theme:
  name: material
  features:
    - navigation.tabs
    - navigation.sections
    - toc.follow
    - navigation.top
    - search.suggest
    - search.highlight
    - content.tabs.link
    - content.code.annotation
    - content.code.copy

markdown_extensions:
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - admonition
  - pymdownx.details
  - pymdownx.superfences:
      custom_fences:
        - name: mermaid
          class: mermaid
          format: !!python/name:pymdownx.superfences.fence_code_format
```

## Testing Your Setup

1. **Create a basic documentation file:**

   ```markdown title="docs/index.md"
   # Welcome to My Documentation
   
   This is a test page to verify everything works!
   
   ```mermaid
   graph LR
       A[MkDocs] --> B[Material Theme]
       B --> C[Beautiful Docs!]
   ```
   ```

2. **Serve the documentation locally:**

   ```bash
   mkdocs serve
   ```

3. **Open your browser** to `http://127.0.0.1:8000`

## Common Issues

!!! warning "Python Version"
    Make sure you're using Python 3.8 or later. Check with `python --version`.

!!! tip "Virtual Environment"
    Always use a virtual environment to avoid package conflicts.

!!! info "Live Reload"
    The `mkdocs serve` command includes live reload - changes to your docs will automatically refresh the browser.

## Next Steps

- [Basic Usage](basic-usage.md): Learn how to write and organize content
- [Material Theme Guide](../mkdocs-guide/material-theme.md): Explore theme features
- [Mermaid Diagrams](../mkdocs-guide/mermaid-diagrams.md): Create beautiful diagrams
