# Copilot Coding Standards

This document defines the coding standards for AI-assisted development in this project. All future Copilot tasks should follow these practices.

## CSS/Styling Standards

### 1. Avoid Inline Tailwind Utility Classes in HTML

**Don't do this:**
```html
<header class="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <h1 class="text-3xl font-bold text-primary-600">Title</h1>
  </div>
</header>
```

**Do this instead:**
```html
<header class="header">
  <div class="header__container">
    <h1 class="header__title">Title</h1>
  </div>
</header>
```

### 2. Use Semantic Class Names with BEM Methodology

Create meaningful class names that describe the component or element's purpose, not its appearance. Use BEM (Block Element Modifier) naming convention:

- **Block**: The main component (e.g., `header`, `card`, `form`)
- **Element**: A part of the block (e.g., `header__title`, `card__body`)
- **Modifier**: A variant or state (e.g., `button--primary`, `input--error`)

### 3. Use @apply Directive in Component SCSS Files

Move Tailwind utility classes to component-specific SCSS files using `@apply`:

```scss
// header.component.scss
@reference "../../../styles.scss";  // Required for Tailwind v4 in Angular components

.header {
  @apply bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50;
}

.header__container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4;
}

.header__title {
  @apply text-3xl font-bold text-primary-600;
}
```

### 4. Move Reusable Classes to Global Styles

If a CSS class has the potential to be used across multiple components, add it to `src/styles.scss`:

```scss
/* Global reusable layout classes */
.page-container {
  @apply min-h-screen bg-neutral-50;
}

.section {
  @apply mb-16;
}

.section-title {
  @apply text-3xl font-bold text-neutral-900 mb-6 flex items-center gap-3;
}
```

### 5. Component Style Structure

Each component should have its styles organized as follows:

1. **Global styles** (`src/styles.scss`): Shared utility classes, design tokens, and reusable patterns
2. **Component styles** (`*.component.scss`): Component-specific styles using `@apply`

### 6. @reference Directive for Tailwind v4

When using `@apply` in Angular component SCSS files with Tailwind v4, include the `@reference` directive at the top:

```scss
@reference "path/to/styles.scss";

.my-component {
  @apply flex items-center;
}
```

The path should be relative from the component's SCSS file to the main `styles.scss`.

## File Organization

```
src/
├── styles.scss                  # Global styles, design system, shared utilities
├── app/
│   ├── app.scss                 # App-specific styles (minimal)
│   ├── app.html                 # Uses semantic class names
│   ├── shared/
│   │   └── components/
│   │       └── header/
│   │           ├── header.component.html    # Lean markup with semantic classes
│   │           └── header.component.scss    # Styles using @apply
```

## Benefits

1. **Lean HTML markup**: Easier to read and maintain templates
2. **Centralized styling**: All styles in dedicated SCSS files
3. **Reusability**: Shared classes available globally
4. **Consistency**: Enforced design system through utility classes
5. **Easier refactoring**: Change styles without touching HTML

## Examples of Reusable Utility Classes

The following classes are available globally in `src/styles.scss`:

### Layout
- `.page-container` - Full-height container with background
- `.page-content` - Max-width centered content area
- `.section` - Standard section with bottom margin

### Typography
- `.section-title` - Section headings
- `.subsection-title` - Subsection headings
- `.card-title` - Card headings
- `.card-text` - Card body text

### Flex & Grid
- `.flex-row-wrap` - Flex row with wrap and gap
- `.flex-items-center` - Flex with centered items
- `.grid-2-cols` - Two-column responsive grid
- `.grid-3-cols` - Three-column responsive grid

### Spacing
- `.space-stack-sm` - Small vertical spacing
- `.space-stack-md` - Medium vertical spacing
- `.space-stack-lg` - Large vertical spacing

### Icons
- `.icon-sm` - Small icon (16px)
- `.icon-md` - Medium icon (20px)
- `.icon-primary` - Medium icon with primary color
