# Development Workflow

This document outlines the standard development workflow for projects in this repository.

## Branch Strategy

All projects follow a branch-based workflow:

1. **Main Branch**: Contains repository templates and common resources
2. **Project Branches**: Each project exists in its own dedicated branch
3. **Feature Branches**: Created from project branches for specific features

## Development Cycle

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

#### Feature Development

1. Create a feature branch from your project branch:
   ```bash
   git checkout project-name
   git checkout -b project-name/feature-description
   ```

2. Implement the feature with frequent, descriptive commits

3. Test thoroughly before merging back to the project branch

4. Create a PR or merge directly to the project branch:
   ```bash
   git checkout project-name
   git merge project-name/feature-description
   git push origin project-name
   ```

##### Updating From Templates

1. Run the update-templates script in your project branch:
   ```bash
   git checkout project-name
   ./scripts/update-templates.sh
   ```

2. Resolve any conflicts that arise during the update

3. Test to ensure updates don't break existing functionality

4. Commit and push the updates:
   ```bash
   git add .
   git commit -m "Update templates from main"
   git push origin project-name
   ```