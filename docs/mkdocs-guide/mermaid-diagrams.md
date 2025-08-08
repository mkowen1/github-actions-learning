# Mermaid Diagrams

Mermaid allows you to create diagrams and flowcharts using simple text syntax.

## Configuration

To enable Mermaid in MkDocs Material, add this to your `mkdocs.yml`:

```yaml
markdown_extensions:
  - pymdownx.superfences:
      custom_fences:
        - name: mermaid
          class: mermaid
          format: !!python/name:pymdownx.superfences.fence_code_format
```

## Diagram Types

### Flowcharts

```mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
```

### Sequence Diagrams

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Database
    
    User->>+Frontend: Request page
    Frontend->>+API: Fetch data
    API->>+Database: Query
    Database-->>-API: Results
    API-->>-Frontend: JSON response
    Frontend-->>-User: Rendered page
```

### Class Diagrams

```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
        +move()
    }
    
    class Dog {
        +String breed
        +bark()
        +fetch()
    }
    
    class Cat {
        +String color
        +meow()
        +hunt()
    }
    
    Animal <|-- Dog
    Animal <|-- Cat
```

### State Diagrams

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Processing : Start
    Processing --> Success : Complete
    Processing --> Error : Fail
    Success --> [*]
    Error --> Retry : Fix Issue
    Retry --> Processing
    Error --> [*] : Give Up
```

### Git Graph

```mermaid
gitgraph
    commit
    commit
    branch feature
    checkout feature
    commit
    commit
    checkout main
    commit
    merge feature
    commit
```

### Entity Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
    
    USER {
        string id PK
        string name
        string email
        date created_at
    }
    
    ORDER {
        string id PK
        string user_id FK
        date order_date
        decimal total
    }
    
    PRODUCT {
        string id PK
        string name
        decimal price
        string description
    }
```

### Gantt Charts

```mermaid
gantt
    title Development Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Requirements    :done,    req, 2024-01-01, 2024-01-10
    Design         :done,    des, 2024-01-05, 2024-01-15
    
    section Development
    Backend API    :active,  backend, 2024-01-10, 2024-02-01
    Frontend       :         frontend, after backend, 3w
    Testing        :         testing, after frontend, 1w
    
    section Deployment
    Staging        :         staging, after testing, 3d
    Production     :         prod, after staging, 1d
```

### Pie Charts

```mermaid
pie title Technology Usage
    "JavaScript" : 35
    "Python" : 25
    "Java" : 20
    "TypeScript" : 15
    "Other" : 5
```

### User Journey

```mermaid
journey
    title User Documentation Experience
    section Discovery
      Visit website     : 5: User
      Browse docs       : 4: User
      Search content    : 4: User
    section Learning
      Read guide        : 3: User
      Try examples      : 5: User
      Watch videos      : 4: User
    section Implementation
      Copy code         : 5: User
      Adapt to project  : 3: User
      Test solution     : 4: User
```

## Tips for Better Diagrams

!!! tip "Best Practices"
    - Keep diagrams simple and focused
    - Use descriptive labels
    - Maintain consistent styling
    - Test diagrams in different themes
    - Use appropriate diagram types for your content

!!! warning "Limitations"
    - Large diagrams may be hard to read on mobile
    - Complex diagrams can slow page loading
    - Not all Mermaid features are supported in all contexts

## Interactive Features

Mermaid diagrams in Material for MkDocs support:

- **Zooming**: Click and drag to pan, scroll to zoom
- **Theme adaptation**: Automatically adapts to light/dark theme
- **Responsive design**: Scales appropriately on different screen sizes
