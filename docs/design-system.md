# Design System

This document outlines the design principles, components, and guidelines for projects in this repository. Following these standards ensures consistency, accessibility, and maintainability across all projects.

## Design Principles

Our design approach is guided by these core principles:

1. **Simplicity**: Favor clear, minimal designs over complex ones
2. **Consistency**: Maintain visual and interaction patterns across all projects
3. **Accessibility**: Design for all users regardless of abilities or circumstances
4. **Responsiveness**: Create interfaces that work seamlessly across devices
5. **Performance**: Optimize for speed and efficiency

## Color System

### Primary Colors

Our primary color palette provides brand identity and visual hierarchy:

- Primary: `#4169e1` (Royal Blue)
- Primary Light: `#6384f5`
- Primary Dark: `#3151b5`

### Secondary Colors

Secondary colors complement the primary palette:

- Secondary: `#f5f5f5` (Off-White)
- Secondary Light: `#ffffff`
- Secondary Dark: `#e0e0e0`

### Accent Colors

- Accent: `#ff7f50` (Coral) - Used sparingly for calls-to-action and emphasis

### Semantic Colors

Colors that convey specific meanings:

- Success: `#28a745` (Green)
- Warning: `#ffc107` (Amber)
- Error: `#dc3545` (Red)
- Info: `#17a2b8` (Teal)

### Text Colors

- Primary Text: `#333333` (Dark Gray)
- Secondary Text: `#666666` (Medium Gray)
- Tertiary Text: `#999999` (Light Gray)
- Inverse Text: `#ffffff` (White)

### Background Colors

- Primary Background: `#ffffff` (White)
- Alternative Background: `#f9f9f9` (Light Gray)
- Dark Background: `#222222` (Near Black)

## Typography

### Font Families

- **Primary Font**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
  - Used for body text and most UI elements
- **Secondary Font**: Georgia, 'Times New Roman', Times, serif
  - Used selectively for headings or emphasis
- **Monospace Font**: 'Courier New', Courier, monospace
  - Used for code snippets and technical content

### Font Sizes

We use a modular scale with a base size of 16px (1rem):

- xs: 0.75rem (12px) - Fine print, footnotes
- sm: 0.875rem (14px) - Secondary text, captions
- base: 1rem (16px) - Body text
- md: 1.125rem (18px) - Emphasized body text
- lg: 1.25rem (20px) - Subheadings
- xl: 1.5rem (24px) - Small headings
- 2xl: 1.875rem (30px) - Medium headings
- 3xl: 2.25rem (36px) - Large headings
- 4xl: 3rem (48px) - Hero headings

### Font Weights

- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Line Heights

- Tight: 1.25 - For headings
- Normal: 1.5 - For body text
- Loose: 1.75 - For body text with enhanced readability

## Spacing System

We use a consistent spacing scale based on multiples of 4px (0.25rem):

- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)
- 3xl: 4rem (64px)
- 4xl: 5rem (80px)

This spacing system applies to:
- Margins
- Padding
- Gap between elements
- Component sizing

## Layout

### Containers

- **Standard Container**: 90% width, max-width of 1200px
- **Narrow Container**: 90% width, max-width of 800px

### Breakpoints

- Small (sm): 576px
- Medium (md): 768px
- Large (lg): 992px
- Extra Large (xl): 1200px

### Grid System

Projects use CSS Grid and Flexbox for layouts:
- CSS Grid for two-dimensional layouts
- Flexbox for one-dimensional layouts

## Component Design

### Buttons

Buttons follow these guidelines:
- Clear visual hierarchy (primary, secondary, ghost)
- Consistent padding and font sizes
- Visual feedback on hover/focus states
- Accessible contrast ratios
- Clear labels that describe the action

### Forms

Form elements follow these guidelines:
- Consistent field sizing and spacing
- Clear labels positioned above inputs
- Visible focus states
- Error states with descriptive messages
- Required field indicators

### Cards

Cards follow these guidelines:
- Consistent padding and spacing
- Clear visual hierarchy with titles and content
- Optional footer for actions
- Hover/focus states for interactive cards
- Consistent shadow depths

## Accessibility Guidelines

All projects must adhere to WCAG 2.1 AA standards, including:

- Minimum contrast ratio of 4.5:1 for normal text
- Minimum contrast ratio of 3:1 for large text
- Keyboard navigability for all interactive elements
- Proper semantic HTML structure
- ARIA attributes when necessary
- Support for screen readers
- Focus indicators for all interactive elements

## Responsive Design

All projects follow a mobile-first approach:

1. Design the mobile view first
2. Progressively enhance for larger screens
3. Use relative units (rem, em, %) over fixed units
4. Test on actual devices when possible
5. Ensure touch targets are at least 44px × 44px
6. Avoid layout shifts during page load

## Icons and Imagery

- Use SVG icons when possible for better scaling
- Ensure all images have appropriate alt text
- Optimize images for file size and loading performance
- Maintain consistent styling across icons
- Use imagery that aligns with the brand aesthetic

## Implementation

All design system elements are implemented using CSS variables for consistency and maintainability. Reference the `variables.css` file for the complete set of design tokens.