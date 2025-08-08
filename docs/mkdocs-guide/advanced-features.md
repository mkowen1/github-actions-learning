# Advanced Features

Explore advanced features and customizations available in MkDocs Material.

## Plugin System

MkDocs has a rich ecosystem of plugins that extend functionality.

### Popular Plugins

#### Git Revision Date Localized
Shows last modification dates for pages:

```yaml
plugins:
  - git-revision-date-localized:
      enable_creation_date: true
      type: date
      fallback_to_build_date: true
```

#### Search Plugin
Enhanced search functionality:

```yaml
plugins:
  - search:
      separator: '[\s\-\.]+'
      lang: 
        - en
        - ja
```

#### Minify Plugin
Minifies HTML output:

```yaml
plugins:
  - minify:
      minify_html: true
      minify_css: true
      minify_js: true
      htmlmin_opts:
        remove_comments: true
```

## Advanced Markdown Extensions

### Superfences with Custom Fences

```yaml
markdown_extensions:
  - pymdownx.superfences:
      custom_fences:
        - name: mermaid
          class: mermaid
          format: !!python/name:pymdownx.superfences.fence_code_format
        - name: plotly
          class: mkdocs-plotly
          format: !!python/name:mkdocs_plotly_plugin.fences.fence_plotly
```

### Advanced Code Features

#### Code Annotations

```python
def fibonacci(n):
    """Calculate fibonacci number."""
    if n <= 1:
        return n  # (1)!
    return fibonacci(n-1) + fibonacci(n-2)  # (2)!
```

1. Base case: return n for 0 and 1
2. Recursive case: sum of two previous numbers

#### Code Grouping

```python title="Python" linenums="1"
def greet(name):
    return f"Hello, {name}!"
```

```javascript title="JavaScript" linenums="1"
function greet(name) {
    return `Hello, ${name}!`;
}
```

### Mathematical Expressions

#### Inline Math
Use `$...$` for inline: The area of a circle is $A = \pi r^2$.

#### Block Math
Use `$$...$$` for display math:

$$
\frac{d}{dx}\left( \int_{a}^{x} f(u)\,du\right) = f(x)
$$

#### Complex Equations

$$
\begin{aligned}
\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} &= \frac{4\pi}{c}\vec{\mathbf{j}} \\
\nabla \cdot \vec{\mathbf{E}} &= 4 \pi \rho \\
\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} &= \vec{\mathbf{0}} \\
\nabla \cdot \vec{\mathbf{B}} &= 0
\end{aligned}
$$

## Advanced Admonitions

### Collapsible Admonitions

??? note "This is a collapsible note"
    This content is hidden by default and can be expanded.

??? success "Installation Complete!"
    Your installation was successful. You can now proceed to the next step.

### Nested Admonitions

!!! warning "Important Configuration"
    Make sure to configure your settings properly.
    
    !!! tip "Pro Tip"
        You can nest admonitions for better organization.

### Custom Admonition Types

With custom CSS, you can create custom admonition types:

!!! custom "Custom Admonition"
    This uses a custom admonition type with special styling.

## Advanced Navigation

### Section Index Pages

Create `index.md` files in directories for section overviews:

```yaml
nav:
  - Home: index.md
  - User Guide:
    - guide/index.md  # Section overview
    - Installation: guide/installation.md
    - Configuration: guide/configuration.md
```

### Navigation Badges

```yaml
nav:
  - Home: index.md
  - "🚀 Getting Started": getting-started.md
  - "⚙️ Configuration": configuration.md
  - "📊 Examples": examples.md
```

## Custom Styling

### CSS Variables

Override Material Design colors and other properties:

```css title="docs/stylesheets/extra.css"
:root {
  --md-primary-fg-color: #ee0a24;
  --md-primary-fg-color--light: #ff5252;
  --md-primary-fg-color--dark: #c62828;
  --md-accent-fg-color: #526cfe;
}

/* Custom admonition */
.md-typeset .admonition.custom,
.md-typeset details.custom {
  border-color: #448aff;
}

.md-typeset .custom > .admonition-title,
.md-typeset .custom > summary {
  background-color: #448aff1a;
  border-color: #448aff;
}

.md-typeset .custom > .admonition-title::before,
.md-typeset .custom > summary::before {
  background-color: #448aff;
  mask-image: var(--md-admonition-icon--abstract);
}
```

### Custom JavaScript

```javascript title="docs/javascripts/extra.js"
// Add copy button to all code blocks
document.addEventListener("DOMContentLoaded", function() {
  const codeBlocks = document.querySelectorAll("pre code");
  
  codeBlocks.forEach((block, index) => {
    // Add copy functionality
    const button = document.createElement("button");
    button.textContent = "Copy";
    button.className = "copy-button";
    
    button.addEventListener("click", () => {
      navigator.clipboard.writeText(block.textContent);
      button.textContent = "Copied!";
      setTimeout(() => button.textContent = "Copy", 2000);
    });
    
    block.parentNode.appendChild(button);
  });
});

// Dark mode toggle
function toggleDarkMode() {
  document.body.setAttribute(
    "data-md-color-scheme",
    document.body.getAttribute("data-md-color-scheme") === "slate" ? "default" : "slate"
  );
}
```

## Social Cards

Generate social media preview cards automatically:

```yaml
plugins:
  - social:
      cards_layout_options:
        background_color: "#1976d2"
        color: "#ffffff"
```

## Blog Integration

Add blog functionality with the blog plugin:

```yaml
plugins:
  - blog:
      blog_dir: blog
      blog_toc: true
      post_dir: "{blog}/posts"
      post_date_format: full
      post_url_format: "{date}/{slug}"
      pagination_per_page: 10
```

## Internationalization

### Multi-language Support

```yaml
plugins:
  - i18n:
      docs_structure: suffix
      languages:
        - locale: en
          default: true
          name: English
          build: true
        - locale: ja
          name: 日本語
          build: true
          nav_translations:
            Home: ホーム
```

### Language Alternates

```yaml
extra:
  alternate:
    - name: English
      link: /
      lang: en
    - name: 日本語
      link: /ja/
      lang: ja
```

## Advanced Search

### Search Boosting

```yaml
plugins:
  - search:
      separator: '[\s\-\.]+'
      lang: en
      prebuild_index: true
```

### Custom Search Results

```javascript
// Custom search result formatting
document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.querySelector("[data-md-component=search-query]");
  
  if (searchInput) {
    searchInput.addEventListener("input", function(e) {
      // Custom search logic here
      console.log("Search query:", e.target.value);
    });
  }
});
```

## Performance Optimization

### Optimization Settings

```yaml
# Optimize build performance
plugins:
  - search:
      prebuild_index: true
  - minify:
      minify_html: true
      minify_css: true
      minify_js: true

# Optimize images
theme:
  features:
    - content.code.copy
    - navigation.indexes
    - navigation.top
    - search.suggest
    - search.share
```

### Lazy Loading

```css
/* Lazy load images */
img[data-src] {
  opacity: 0;
  transition: opacity 0.3s;
}

img[data-src].loaded {
  opacity: 1;
}
```

## Analytics Integration

### Google Analytics

```yaml
extra:
  analytics:
    provider: google
    property: G-XXXXXXXXXX
    feedback:
      title: Was this page helpful?
      ratings:
        - icon: material/emoticon-happy-outline
          name: This page was helpful
          data: 1
          note: >-
            Thanks for your feedback!
        - icon: material/emoticon-sad-outline
          name: This page could be improved
          data: 0
          note: >-
            Thanks for your feedback! Help us improve this page by
            using our <a href="..." target="_blank" rel="noopener">feedback form</a>.
```

### Custom Analytics

```javascript title="docs/javascripts/analytics.js"
// Custom analytics tracking
function trackEvent(action, category, label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
}

// Track code copy events
document.addEventListener('click', function(e) {
  if (e.target.matches('.md-clipboard')) {
    trackEvent('copy_code', 'documentation', window.location.pathname);
  }
});
```

## Deployment Strategies

### Multiple Environment Deployment

```yaml title=".github/workflows/deploy.yml"
name: Deploy Docs

on:
  push:
    branches: [main, develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Determine environment
      run: |
        if [[ ${{ github.ref }} == 'refs/heads/main' ]]; then
          echo "ENVIRONMENT=production" >> $GITHUB_ENV
          echo "SITE_URL=https://docs.example.com" >> $GITHUB_ENV
        else
          echo "ENVIRONMENT=staging" >> $GITHUB_ENV
          echo "SITE_URL=https://staging-docs.example.com" >> $GITHUB_ENV
        fi
    
    - name: Build docs
      run: |
        sed -i "s|site_url:.*|site_url: $SITE_URL|" mkdocs.yml
        uv run mkdocs build
    
    - name: Deploy
      run: echo "Deploying to $ENVIRONMENT"
```

This advanced setup provides a comprehensive foundation for creating sophisticated documentation sites with MkDocs Material.
