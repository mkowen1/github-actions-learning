# Material Theme Guide

The Material theme for MkDocs provides a beautiful, responsive design with many powerful features.

## Theme Configuration

The theme is configured in `mkdocs.yml`:

```yaml
theme:
  name: material
  palette:
    # Light mode
    - media: "(prefers-color-scheme: light)"
      scheme: default
      primary: blue
      accent: indigo
      toggle:
        icon: material/brightness-7
        name: Switch to dark mode
    # Dark mode
    - media: "(prefers-color-scheme: dark)"
      scheme: slate
      primary: blue
      accent: indigo
      toggle:
        icon: material/brightness-4
        name: Switch to light mode
```

## Key Features

### Navigation

The theme supports various navigation features:

=== "Tabs"
    ```yaml
    theme:
      features:
        - navigation.tabs
        - navigation.tabs.sticky
    ```

=== "Sections"
    ```yaml
    theme:
      features:
        - navigation.sections
        - navigation.expand
    ```

=== "Path"
    ```yaml
    theme:
      features:
        - navigation.path
    ```

### Code Blocks

Code blocks are beautifully styled with syntax highlighting:

```python title="example.py" linenums="1"
def hello_world():
    """A simple greeting function."""
    return "Hello, World!"

# Call the function
greeting = hello_world()
print(greeting)  # (1)!
```

1. This will print the greeting to the console.

### Admonitions

The theme supports various types of admonitions:

!!! note
    This is a note admonition.

!!! tip "Pro Tip"
    This is a tip with a custom title.

!!! warning
    This is a warning admonition.

!!! danger
    This is a danger admonition.

??? info "Collapsible Info"
    This admonition starts collapsed.

!!! bug
    This is a bug admonition.

!!! question
    This is a question admonition.

### Content Tabs

You can create tabbed content:

=== "Python"
    ```python
    print("Hello from Python!")
    ```

=== "JavaScript"
    ```javascript
    console.log("Hello from JavaScript!");
    ```

=== "Bash"
    ```bash
    echo "Hello from Bash!"
    ```

### Task Lists

- [x] Set up MkDocs
- [x] Configure Material theme
- [x] Add Mermaid support
- [ ] Deploy to GitHub Pages
- [ ] Add more content

### Keyboard Keys

Use ++ctrl+c++ to copy or ++cmd+v++ to paste.

## Customization

### Custom CSS

Add custom styles in `docs/stylesheets/extra.css`:

```css
:root {
  --md-primary-fg-color: #1976d2;
  --md-accent-fg-color: #3f51b5;
}
```

### Icons and Emojis

Material supports thousands of icons:

- :material-rocket: Rocket icon
- :fontawesome-solid-heart: Heart icon
- :octicons-mark-github-16: GitHub icon

## Search

The built-in search is powerful and supports:

- Fuzzy matching
- Keyboard navigation (++slash++ to focus)
- Search highlighting
- Auto-suggestions
