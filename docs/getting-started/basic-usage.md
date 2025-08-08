# Basic Usage

Learn the fundamentals of creating content with MkDocs and Material theme.

## Creating Content

### Writing Pages

MkDocs uses Markdown for content. Create `.md` files in the `docs/` directory:

```markdown title="docs/my-page.md"
# Page Title

This is a paragraph with **bold** and *italic* text.

## Section Header

- List item 1
- List item 2
- List item 3

### Code Example

```python
def greet(name):
    return f"Hello, {name}!"
```
```

### Page Navigation

Define your site structure in `mkdocs.yml`:

```yaml
nav:
  - Home: index.md
  - Getting Started:
    - Installation: getting-started/installation.md
    - Basic Usage: getting-started/basic-usage.md
  - Advanced: advanced.md
```

## Common Commands

### Serve Locally

For development with live reload:

```bash
mkdocs serve
# Or specify port
mkdocs serve --dev-addr=localhost:8080
```

### Build Static Site

Generate the static HTML files:

```bash
mkdocs build
```

The built site will be in the `site/` directory.

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

!!! warning
    The `gh-deploy` command pushes directly to the `gh-pages` branch. Use with caution in production!

## Content Organization

### File Structure

```
docs/
├── index.md                 # Home page
├── getting-started/
│   ├── installation.md      # Getting Started > Installation
│   └── usage.md            # Getting Started > Usage
├── guides/
│   ├── advanced.md         # Guides > Advanced
│   └── troubleshooting.md  # Guides > Troubleshooting
└── assets/
    ├── images/
    └── files/
```

### Linking Between Pages

=== "Relative Links"
    ```markdown
    [Installation Guide](installation.md)
    [Advanced Guide](../guides/advanced.md)
    ```

=== "Absolute Links"
    ```markdown
    [Home](/index.md)
    [Installation](/getting-started/installation.md)
    ```

=== "Anchor Links"
    ```markdown
    [Jump to Section](#section-header)
    [External Section](other-page.md#specific-section)
    ```

## Markdown Extensions

### Code Highlighting

```python title="example.py" linenums="1" hl_lines="2 3"
def main():
    # These lines are highlighted
    print("Hello, World!")
    return True
```

### Admonitions

!!! note "Information"
    This is a note with custom title.

!!! tip
    This is a tip without custom title.

!!! warning "Important"
    Pay attention to this warning.

### Content Tabs

=== "Tab 1"
    Content for tab 1.

=== "Tab 2"
    Content for tab 2.

### Task Lists

- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task

### Tables

| Feature | Supported | Notes |
|---------|-----------|-------|
| Mermaid | ✅ | Full support |
| MathJax | ✅ | With extension |
| Search  | ✅ | Built-in |

### Keyboard Keys

Use ++ctrl+c++ to copy and ++ctrl+v++ to paste.

## Images and Assets

### Adding Images

```markdown
![Alt text](assets/images/screenshot.png)
![Alt text](assets/images/screenshot.png "Optional title")
```

### Image with Caption

<figure markdown>
  ![Image description](https://via.placeholder.com/600x400)
  <figcaption>Image caption</figcaption>
</figure>

### Responsive Images

```markdown
![Alt text](assets/images/screenshot.png){ width="300" }
![Alt text](assets/images/screenshot.png){ width="50%" }
```

## Configuration Tips

### Site Information

```yaml title="mkdocs.yml"
site_name: My Documentation
site_description: A comprehensive guide
site_author: Your Name
site_url: https://yourdomain.com/docs/
```

### Theme Customization

```yaml
theme:
  name: material
  palette:
    primary: blue
    accent: indigo
  font:
    text: Roboto
    code: Roboto Mono
```

### Custom CSS/JS

```yaml
extra_css:
  - stylesheets/extra.css

extra_javascript:
  - javascripts/extra.js
```

## Best Practices

!!! tip "Content Organization"
    - Use descriptive filenames
    - Keep directory structure shallow (2-3 levels max)
    - Group related content together
    - Use index files for section overviews

!!! tip "Writing Style"
    - Use clear, concise headings
    - Break up long content with subheadings
    - Include code examples where relevant
    - Use admonitions to highlight important information

!!! tip "Navigation"
    - Design navigation from user perspective
    - Keep main navigation items to 7±2 items
    - Use descriptive link text
    - Test navigation on mobile devices
