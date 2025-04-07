# Web Development Projects Repository

![Web Development Banner](https://as1.ftcdn.net/jpg/03/77/08/22/1000_F_377082215_XdCMMLYICc9uDtX4bFLP7k0bfRf5rAPF.jpg)

A comprehensive collection of web development projects, each maintained in its own dedicated branch. This repository serves as a centralized hub for organizing various web applications, sites, and experiments while keeping each project's codebase separate and organized.

## Repository Organization

This repository uses a **branch-based organization system** that provides several advantages:

- **Clean Separation**: Each project exists in its own branch, preventing code overlap
- **Single Repository**: All projects are housed in one repository for easy management
- **Consistent Structure**: Common patterns and templates across projects
- **Simple Navigation**: Easily switch between projects using git branch commands
- **Version Control**: Complete history for each individual project

## Projects

| Project | Description | Technologies | Status |
|---------|-------------|--------------|--------|
| [Codecademy - Challenge Project: Company Home Page with Flexbox](https://github.com/andy-comcast/andy-comcast/tree/project-codecademy-company-home-page) | Simple Flexbox Use | HTML, CSS, | In Progress |

*Note: This table will be updated as projects are added to the repository. Click on project names to view their source code and documentation.*

## Getting Started

To explore this repository and its projects:

```bash
# Clone the repository
git clone https://github.com/andy-comcast/andy-comcast

# Navigate to the repository
cd andy-comcast

# See all available branches (projects)
git branch -a

# Switch to a specific project
git checkout project-name
```

## Creating a New Project

To create a new project branch:

```bash
# Make sure you're on the main branch with the latest updates
git checkout main
git pull

# Create a new branch for your project
git checkout -b project-name

# Set up project structure using the provided script
./scripts/setup-project.sh project-name

# Or manually create your project structure following the templates
```

After setting up your project:

```bash
# Add, commit, and push the branch
git add .
git commit -m "Initial setup for project-name"
git push -u origin project-name
```

## Repository Structure

The main branch contains:

```
repository-root/
├── README.md                 # Main repository documentation
├── LICENSE                   # License file
├── .gitignore                # Global gitignore file
├── CONTRIBUTING.md           # Contribution guidelines (optional)
├── CHANGELOG.md              # Repository-wide changelog (optional)
├── templates/                # Templates for new projects
│   ├── html/
│   │   └── index.html        # Basic HTML template
│   ├── css/
│   │   ├── normalize.css     # CSS reset/normalize
│   │   └── main.css          # Main stylesheet template
│   ├── js/
│   │   └── main.js           # JavaScript template
│   ├── components/           # Reusable component templates
│   │   ├── header/
│   │   ├── footer/
│   │   └── forms/
│   └── README.md             # Project README template
├── scripts/                  # Utility scripts
│   ├── setup-project.sh      # New project setup script
│   └── update-templates.sh   # Script to update templates
├── docs/                     # Documentation
│   ├── style-guide.md        # Coding standards
│   ├── workflow.md           # Development workflow
│   └── design-system.md      # Design system documentation
└── .github/                  # GitHub-specific files
    ├── ISSUE_TEMPLATE/
    ├── PULL_REQUEST_TEMPLATE.md
    └── workflows/            # GitHub Actions workflows
```

Each project branch will have its own structure based on the project requirements, but generally following a consistent pattern for organization.

## Development Standards

Across all projects in this repository, based on the project requirements, these standards are maintained:

- **Responsive Design**: Mobile-first approach to ensure compatibility across devices
- **Semantic HTML**: Clear, accessible markup structure
- **Modern CSS**: Using CSS variables, flexbox and grid for layouts
- **JavaScript Best Practices**: ES6+ features, modular code organization
- **Documentation**: Clear READMEs for each project
- **Git Workflow**: Descriptive commit messages and organized branch management

## Tech Stack

Technologies commonly used across projects include:

- HTML5, CSS3, JavaScript (ES6+)
- Frontend frameworks (React, Vue)
- CSS preprocessors (SASS)
- Backend technologies (Node.js, Express)
- Database solutions (MongoDB, MySQL)
- API integration
- Responsive design frameworks

## License

This repository is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Feel free to reach out with questions or feedback about any of the projects contained in this repository.

- GitHub: [andy-comcast](https://github.com/andy-comcast)
- Portfolio: [my-portfolio](https://andy-comcast.github.io/andy-comcast/)
- Email: andrewreeves73@icloud.com

---

*Last updated: April 2025*
