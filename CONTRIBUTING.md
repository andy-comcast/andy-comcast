# Contributing to Web Development Projects Repository

Thank you for considering contributing to this repository! This document outlines the process for contributing to the repository and provides guidelines to ensure consistency across all projects.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Branch Strategy](#branch-strategy)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Documentation](#documentation)
- [Testing](#testing)
- [Updating Templates](#updating-templates)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. Please be considerate of differing viewpoints and experiences, and focus on constructive feedback and collaboration.

## Getting Started

1. **Fork the repository** if you're an external contributor, or create a new branch if you're a repository collaborator
2. **Clone the repository** to your local machine
3. **Set up your development environment** following the instructions in the README

## Branch Strategy

This repository uses a branch-based organization:

- **Main Branch**: Contains repository templates and common resources
- **Project Branches**: Each project exists in its own dedicated branch named `project-*`
- **Feature Branches**: When working on a specific feature for a project, create a branch from the project branch with the format `project-name/feature-description`

## Development Workflow

### Starting a New Project

1. Create a new project branch from main:
   ```bash
   git checkout main
   git pull
   git checkout -b project-name
   ./scripts/setup-project.sh project-name [project-type]
   ```

2. Customize project templates and commit initial setup:
   ```bash
   git add .
   git commit -m "Initial setup for project-name"
   git push -u origin project-name
   ```

### Feature Development

1. Create a feature branch from your project branch:
   ```bash
   git checkout project-name
   git checkout -b project-name/feature-description
   ```

2. Implement the feature with frequent, descriptive commits

3. Test thoroughly before merging back to the project branch

4. Create a PR or merge directly to the project branch

## Pull Request Process

1. Ensure your code follows the repository's coding standards
2. Update documentation as necessary
3. Fill out the PR template completely
4. Request review from at least one maintainer
5. Address any feedback from code review
6. Once approved, the PR will be merged by a maintainer

## Coding Standards

### HTML
- Use semantic HTML elements
- Maintain proper indentation (2 spaces)
- Include appropriate accessibility attributes
- Validate HTML against W3C standards

### CSS
- Follow the BEM (Block Element Modifier) naming convention
- Use CSS variables for consistent theming
- Maintain mobile-first responsive design
- Keep selectors as simple as possible

### JavaScript
- Follow ES6+ standards
- Use meaningful variable and function names
- Comment complex logic
- Avoid global variables
- Use proper error handling

## Commit Message Guidelines

Use conventional commit messages with the format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types include:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code changes that neither fix bugs nor add features
- **test**: Adding or modifying tests
- **chore**: Changes to the build process or auxiliary tools

Example:
```
feat(navigation): add mobile dropdown menu

Implement responsive dropdown menu for mobile devices
that appears when the hamburger icon is clicked.

Closes #123
```

## Documentation

- Update documentation for any feature, API change, or workflow modification
- Follow the established documentation style
- Include code examples where appropriate
- Document both how to use a feature and why it exists

## Testing

- Write tests for all new features and bug fixes
- Maintain existing tests
- Ensure all tests pass before submitting a PR
- Follow the testing approach appropriate for the project type

## Updating Templates

When improving a common component or template:

1. Make changes to the template in the main branch
2. Run the update-templates script in your project branch:
   ```bash
   git checkout project-name
   ./scripts/update-templates.sh
   ```

3. Resolve any conflicts that arise during the update

4. Test to ensure updates don't break existing functionality

5. Commit and push the updates:
   ```bash
   git add .
   git commit -m "Update templates from main"
   git push origin project-name
   ```

Thank you for contributing to the Web Development Projects Repository!
