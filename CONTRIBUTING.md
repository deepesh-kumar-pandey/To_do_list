# Contributing to QuestLog

First off, thank you for considering contributing to QuestLog! It's people like you that make QuestLog such a great tool.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Commit Message Conventions](#commit-message-conventions)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all. By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Edge, Safari)
- Text editor or IDE (VS Code recommended)
- Git for version control
- Node.js 18+ (for development tools)
- Python 3.x (for local server)

### Setup Development Environment

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/questlog.git
   cd questlog
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Supabase**

   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Run the migrations in `frontend/boss_battles_migration.sql`
   - Run the security policies in `frontend/security_policies.sql`
   - Copy `frontend/config.js.example` to `frontend/config.js`
   - Update with your Supabase credentials

4. **Start development server**

   ```bash
   npm run dev
   ```

   Visit `http://localhost:8000/auth.html`

## Development Workflow

### Branching Strategy

We use a simplified Git Flow:

- `main` - Production-ready code
- `develop` - Latest development changes
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### Working on a Feature

1. **Create a branch from `develop`**

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**

   - Write clean, readable code
   - Follow the code style guide
   - Add comments for complex logic
   - Test your changes thoroughly

3. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

4. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**

   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template
   - Link any related issues

## Code Style Guidelines

### JavaScript

- **Use ES6+ features**: `const`, `let`, arrow functions, template literals
- **Prefer `const` over `let`**: Only use `let` when reassignment is needed
- **Use descriptive variable names**: `userQuestList` not `uql`
- **Add JSDoc comments** for functions:

  ```javascript
  /**
   * Calculate XP required for next level
   * @param {number} currentLevel - The current character level
   * @returns {number} XP required for next level
   */
  function calculateXPForLevel(currentLevel) {
    return GAME_CONFIG.levelThresholds[currentLevel]?.xpRequired || 0;
  }
  ```

- **Handle errors gracefully**:

  ```javascript
  try {
    const data = await supabase.from('quests').select();
    return data;
  } catch (error) {
    console.error('Failed to fetch quests:', error);
    showErrorToast('Unable to load quests. Please try again.');
    return [];
  }
  ```

### CSS

- **Use custom properties**: Define in `:root`, use `var(--variable-name)`
- **Mobile-first approach**: Base styles for mobile, `@media` for larger screens
- **BEM naming convention**: `.block__element--modifier`
- **Group related properties**:

  ```css
  .button {
    /* Positioning */
    position: relative;
    
    /* Display & Box Model */
    display: flex;
    padding: 12px 24px;
    margin: 8px 0;
    
    /* Typography */
    font-size: 16px;
    font-weight: 600;
    
    /* Visual */
    background: var(--md-primary);
    border-radius: 12px;
    
    /* Animation */
    transition: all 0.2s ease;
  }
  ```

### HTML

- **Semantic HTML**: Use `<header>`, `<main>`, `<nav>`, `<article>`, etc.
- **Accessibility attributes**: `aria-label`, `role`, `aria-labelledby`
- **Valid HTML**: No unclosed tags, proper nesting
- **Descriptive IDs and classes**: `btn-add-quest` not `btn1`

## Commit Message Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no code change)
- `refactor`: Code refactoring (no feature change)
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(boss-battles): add new dragon boss with fire breath attack

fix(auth): resolve session timeout issue on slow networks

docs(readme): update deployment instructions for Vercel

style(css): format styles.css with Prettier

refactor(app): extract quest rendering into separate function

perf(app): optimize DOM updates with document fragments

chore(deps): update Supabase client to v2.39.0
```

## Pull Request Process

### Before Submitting

1. **Ensure code quality**

   ```bash
   npm run lint        # Check for linting errors
   npm run format      # Format code
   npm run validate    # Run all checks
   ```

2. **Test thoroughly**

   - Test on multiple browsers (Chrome, Firefox, Safari)
   - Test on mobile devices
   - Test with slow network (throttling in DevTools)
   - Verify all features still work

3. **Update documentation**

   - Update README if adding new features
   - Add inline code comments
   - Update JSDoc comments

### PR Template

When creating a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on mobile
- [ ] Tested with slow network

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass
```

### Code Review Process

1. At least one maintainer must approve
2. All CI checks must pass
3. No merge conflicts
4. Discussion points resolved

## Reporting Bugs

### Before Submitting a Bug Report

- Check existing issues to avoid duplicates
- Verify the bug in the latest version
- Collect information about your environment

### Bug Report Template

```markdown
**Describe the bug**
Clear and concise description

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.2.0]

**Additional context**
Any other context about the problem
```

## Suggesting Enhancements

### Enhancement Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
What you want to happen

**Describe alternatives you've considered**
Alternative solutions or features

**Additional context**
Mockups, examples, or references
```

## Project Structure

```
questlog/
├── frontend/
│   ├── index.html          # Main dashboard
│   ├── auth.html           # Authentication page
│   ├── app.js              # Main application logic
│   ├── auth.js             # Authentication logic
│   ├── boss_battles.js     # Boss battle system
│   ├── config.js          # Configuration
│   ├── styles.css          # Main styles
│   ├── boss_battles.css    # Boss battle styles
│   ├── manifest.json       # PWA manifest
│   ├── service-worker.js   # Service worker
│   └── assets/             # Images and icons
├── scripts/
│   └── build.js            # Build script
├── .eslintrc.json          # ESLint config
├── .prettierrc             # Prettier config
├── package.json            # Dependencies
├── vercel.json             # Vercel config
└── README.md               # Documentation
```

## Attribution

This Contributing Guide is adapted from open-source contribution best practices.

Thank you for contributing to QuestLog! 🎮⚔️
