# TaskFlow

TaskFlow is a lightweight task management application built with React and Vite. It provides a focused workflow for logging in, reviewing tasks, creating new items, updating task details, and tracking progress through a simple status-driven interface.

## Overview

This project is designed as a frontend-first task manager. It uses React Context for application state, React Router for navigation, and local JSON files to simulate user and task data. The codebase is structured to keep UI components, page layouts, data access, and validation logic separated and easy to maintain.

## Core Features

- Authentication flow backed by local user data
- Protected routes for the main task views
- Task creation with status and assignee fields
- Inline editing and delete actions for existing tasks
- Search and status filtering on the home page
- Summary cards for task counts by status
- Responsive layout for desktop and mobile screens
- Loading feedback during asynchronous data fetches
- Form validation for login, task creation, and task edits

## Tech Stack

- React 18
- React Router DOM
- Vite
- JavaScript (ES modules)
- CSS for application styling
- ESLint for code quality checks

## Project Structure

```text
src/
├── App.jsx              # Application shell and routing
├── App.css              # Global application styling
├── components/          # Reusable UI components
├── context/             # User and task state providers
├── data/                # Local JSON data sources
├── hooks/               # Custom hooks
├── pages/               # Main application pages
├── routes/              # Route guards and protected route logic
├── services/            # Data-fetching and task service utilities
└── utils/               # Shared constants and validation helpers
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

1. Clone the repository.
   ```bash
   git clone <repository-url>
   cd taskfore
   ```

2. Install dependencies.
   ```bash
   npm install
   ```

3. Start the development server.
   ```bash
   npm run dev
   ```

4. Open the app in your browser.
   ```text
   http://localhost:5173
   ```

### Production Build

Create an optimized production bundle with:

```bash
npm run build
```

Preview the production build locally with:

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint across the project

## How the App Works

- User credentials are read from `src/data/users.json`.
- Task data is loaded from `src/data/tasks.json` through the service layer.
- `UserContext` manages the signed-in user session.
- `TaskContext` manages task state, loading state, and task mutations.
- `PrivateRoute` blocks access to protected pages unless a user is authenticated.
- The Home page combines search, filters, statistics, and task cards in one dashboard view.
- The Add Task page provides a form for creating a new task and returns the user to the dashboard after submission.

## Notes

- This project does not depend on a backend API.
- All data is currently stored locally for development and demonstration purposes.
- The styling is organized in a single application stylesheet so the UI remains consistent across pages and components.

## License

No license has been specified for this project.
