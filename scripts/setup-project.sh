#!/bin/bash
# Script to set up a new web project branch
# Author: {{author-name}}
# Date: {{creation-date}}
#
# Usage: ./setup-project.sh project-name [project-type]
#   project-name: The name of the project (required)
#   project-type: The type of project to create (optional)
#                 Available types: static, react, node
#                 Default: static

# Text formatting
BOLD='\033[1m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to display script usage
function show_usage {
  echo -e "${BOLD}Usage:${NC} $0 project-name [project-type]"
  echo "  project-name: The name of the project (required)"
  echo "  project-type: The type of project to create (optional)"
  echo "                Available types: static, react, node"
  echo "                Default: static"
  exit 1
}

# Function to display error message and exit
function error_exit {
  echo -e "${RED}Error: $1${NC}" >&2
  exit 1
}

# Function to display success message
function success_message {
  echo -e "${GREEN}$1${NC}"
}

# Function to display info message
function info_message {
  echo -e "${BLUE}$1${NC}"
}

# Function to display warning message
function warning_message {
  echo -e "${YELLOW}$1${NC}"
}

# Check if project name is provided
if [ -z "$1" ]; then
  error_exit "Project name is required"
  show_usage
fi

# Set project name and type
PROJECT_NAME=$1
PROJECT_TYPE=${2:-static}

# Validate project type
if [[ ! $PROJECT_TYPE =~ ^(static|react|node)$ ]]; then
  error_exit "Invalid project type: $PROJECT_TYPE"
  show_usage
fi

# Create and checkout a new branch
info_message "Creating new branch for project: $PROJECT_NAME"
git checkout main || error_exit "Failed to checkout main branch"
git pull || warning_message "Failed to pull latest changes from main branch"
git checkout -b $PROJECT_NAME || error_exit "Failed to create new branch: $PROJECT_NAME"

# Create directory structure based on project type
info_message "Setting up directory structure for $PROJECT_TYPE project"

# Common directories for all project types
mkdir -p assets/images assets/icons assets/fonts css js/utils docs

# Create base files
touch README.md
cp ../templates/docs/README.md ./README.md

# Process based on project type
case $PROJECT_TYPE in
  static)
    # Static website setup
    touch index.html
    touch css/normalize.css
    touch css/variables.css
    touch css/main.css
    touch js/main.js
    
    # Copy template files if they exist
    if [ -d "../templates/html" ]; then
      cp ../templates/html/index.html ./index.html
      success_message "Copied template index.html"
    fi
    
    if [ -d "../templates/css" ]; then
      cp ../templates/css/normalize.css ./css/normalize.css
      cp ../templates/css/variables.css ./css/variables.css
      cp ../templates/css/main.css ./css/main.css
      success_message "Copied template CSS files"
    fi
    
    if [ -d "../templates/js" ]; then
      cp ../templates/js/main.js ./js/main.js
      success_message "Copied template JS files"
    fi
    ;;
    
  react)
    # React project setup
    warning_message "Setting up React project. This requires Node.js and npm."
    npm init -y
    
    # Create package.json with React dependencies
    if [ -f "../templates/config/react-package.json" ]; then
      cp ../templates/config/react-package.json ./package.json
      success_message "Copied React package.json template"
    else
      # Create basic React package.json if template doesn't exist
      cat > package.json << EOF
{
  "name": "${PROJECT_NAME}",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
EOF
      success_message "Created basic React package.json"
    fi
    
    # Create React project structure
    mkdir -p public src/components src/pages src/hooks src/context src/utils src/styles
    
    # Create basic React files
    touch public/index.html
    touch src/index.js
    touch src/App.js
    
    # Copy React templates if they exist
    if [ -d "../templates/react" ]; then
      cp ../templates/react/public/index.html ./public/index.html
      cp ../templates/react/src/index.js ./src/index.js
      cp ../templates/react/src/App.js ./src/App.js
      success_message "Copied React template files"
    else
      warning_message "No React templates found. Creating basic files."
      # Create basic index.html
      cat > public/index.html << EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${PROJECT_NAME}</title>
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
</body>
</html>
EOF
      
      # Create basic index.js
      cat > src/index.js << EOF
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF
      
      # Create basic App.js
      cat > src/App.js << EOF
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>${PROJECT_NAME}</h1>
        <p>Welcome to your new React app!</p>
      </header>
    </div>
  );
}

export default App;
EOF
    fi
    ;;
    
  node)
    # Node.js project setup
    warning_message "Setting up Node.js project. This requires Node.js and npm."
    mkdir -p src/routes src/controllers src/models src/middleware src/utils src/config
    
    # Create base files
    touch src/index.js
    touch src/app.js
    
    # Create package.json
    if [ -f "../templates/config/node-package.json" ]; then
      cp ../templates/config/node-package.json ./package.json
      success_message "Copied Node.js package.json template"
    else
      # Create basic Node.js package.json if template doesn't exist
      npm init -y
      success_message "Created basic Node.js package.json"
    fi
    
    # Copy Node.js templates if they exist
    if [ -d "../templates/node" ]; then
      cp ../templates/node/index.js ./src/index.js
      cp ../templates/node/app.js ./src/app.js
      success_message "Copied Node.js template files"
    else
      warning_message "No Node.js templates found. Creating basic files."
      # Create basic index.js
      cat > src/index.js << EOF
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
EOF
      
      # Create basic app.js
      cat > src/app.js << EOF
const express = require('express');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello from ${PROJECT_NAME} API!');
});

module.exports = app;
EOF
    fi
    ;;
esac

# Copy .gitignore
if [ -f "../templates/config/.gitignore" ]; then
  cp ../templates/config/.gitignore ./.gitignore
  success_message "Copied .gitignore template"
else
  warning_message "No .gitignore template found. Creating basic .gitignore"
  cat > .gitignore << EOF
# Dependencies
node_modules/

# Environment variables
.env
.env.local

# Build directories
dist/
build/

# OS files
.DS_Store
Thumbs.db

# Editor files
.idea/
.vscode/
EOF
fi

# Replace placeholders in README.md
info_message "Customizing README.md..."
sed -i "s/{{project-name}}/${PROJECT_NAME}/g" README.md
sed -i "s/{{creation-date}}/$(date +'%B %d, %Y')/g" README.md

# Initial commit
info_message "Creating initial commit..."
git add .
git commit -m "Initial setup for ${PROJECT_NAME}" || warning_message "Failed to create initial commit"
git push -u origin ${PROJECT_NAME} || warning_message "Failed to push to remote. You can push later."

# Success message
success_message "=============================================="
success_message "Project '${PROJECT_NAME}' setup successfully!"
success_message "=============================================="
echo ""
info_message "Project structure:"
find . -type d | sort | grep -v "node_modules" | grep -v ".git"
echo ""
info_message "Next steps:"
echo "1. Navigate to your project directory: cd ${PROJECT_NAME}"
case $PROJECT_TYPE in
  static)
    echo "2. Open index.html in your browser to start development"
    ;;
  react)
    echo "2. Install dependencies: npm install"
    echo "3. Start the development server: npm start"
    ;;
  node)
    echo "2. Install dependencies: npm install"
    echo "3. Start the server: npm start"
    ;;
esac
echo ""
success_message "Happy coding!"