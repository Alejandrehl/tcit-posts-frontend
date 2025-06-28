# TCIT Posts Frontend

[![Build Status](https://img.shields.io/github/actions/workflow/status/Alejandrehl/tcit-posts-frontend/ci.yml?branch=main&label=build)](https://github.com/Alejandrehl/tcit-posts-frontend/actions)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)](https://github.com/Alejandrehl/tcit-posts-frontend/actions)
[![Docker Image Size](https://img.shields.io/docker/image-size/library/node/20-slim?label=docker%20image)](https://hub.docker.com/_/node)

Technical Challenge for TCIT - Senior Full Stack React/Node.js Engineer

A modern React application for managing blog posts with a beautiful, responsive UI built with React 18, TypeScript, Vite, and Material-UI.

---

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Local Development](#local-development)
- [API Integration](#api-integration)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Architecture](#architecture)
- [NPM Scripts](#npm-scripts)
- [CI/CD](#cicd)
- [FAQ](#faq)
- [License](#license)
- [Author & Contact](#author--contact)

---

## Features

- **Modern React App** with TypeScript and Vite for fast development
- **Responsive Design** with Material-UI and mobile-first approach
- **State Management** using Redux Toolkit with thunks
- **Theme System** with dark/light mode toggle using React Context
- **CRUD Operations** for managing blog posts
- **Real-time Updates** with optimistic UI updates
- **Accessibility** with ARIA labels and keyboard navigation
- **Testing** with Vitest and React Testing Library
- **Code Quality** with ESLint, Prettier, and Husky
- **Type Safety** with strict TypeScript configuration
- **Modern UI** with Material-UI components and custom styling
- **Toast Notifications** with react-hot-toast
- **Icons** with Lucide React

---

## Quick Start

### Prerequisites

- **Node.js** 20.x ([Download here](https://nodejs.org/en/download))
- **npm** (comes with Node.js)
- **Git**

### Local Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Alejandrehl/tcit-posts-frontend.git
   cd tcit-posts-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   # Create .env file from example
   cp .env.example .env
   ```

   **Important**: Make sure your `.env` file contains:

   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Verify the installation**
   - Frontend: http://localhost:5173
   - The app will automatically proxy API requests to the backend at http://localhost:3000

### Backend Integration

This frontend is designed to work with the [TCIT Posts Backend](https://github.com/Alejandrehl/tcit-posts-backend). **You must have the backend running before using the frontend.**

To start the backend:

```bash
# Clone and setup the backend
git clone https://github.com/Alejandrehl/tcit-posts-backend.git
cd tcit-posts-backend
npm install
npm run start:dev
```

**Complete setup example:**

```bash
# Terminal 1 - Backend
git clone https://github.com/Alejandrehl/tcit-posts-backend.git
cd tcit-posts-backend
npm install
npm run start:dev

# Terminal 2 - Frontend (in a new terminal)
git clone https://github.com/Alejandrehl/tcit-posts-frontend.git
cd tcit-posts-frontend
npm install
cp .env.example .env
npm run dev
```

### Troubleshooting Setup

If you encounter issues:

1. **Backend not running**: Make sure the backend is running on `http://localhost:3000`
2. **Port conflicts**: If port 5173 is in use, Vite will automatically use the next available port
3. **Environment variables**: Verify your `.env` file exists and contains `VITE_API_BASE_URL=http://localhost:3000`
4. **Dependencies**: Run `npm ci` to reinstall dependencies if you encounter issues

---

## Local Development

### Development Workflow

- **Start development server**

  ```bash
  npm run dev
  ```

  The server will restart automatically on file changes with hot module replacement.

- **Run tests**

  ```bash
  npm test
  npm run test:coverage
  npm run test:ui
  ```

- **Lint and format**

  ```bash
  npm run lint
  npm run lint:fix
  npm run format
  ```

- **Build for production**
  ```bash
  npm run build
  npm run preview
  ```

### API Testing

The frontend automatically proxies API requests to the backend. You can test the integration by:

1. **Starting both servers**

   ```bash
   # Terminal 1 - Backend
   cd tcit-posts-backend
   npm run start:dev

   # Terminal 2 - Frontend
   cd tcit-posts-frontend
   npm run dev
   ```

2. **Using the application**
   - Create posts using the form
   - View posts in the list
   - Delete posts using the delete button
   - Toggle between light and dark themes

---

## API Integration

### Backend Connection

- **Base URL**: `http://localhost:3000` (configured in Vite proxy)
- **API Endpoints**: `/v1/posts`
- **Proxy Configuration**: See `vite.config.ts` for proxy setup

### API Client

The application uses a custom API client (`src/utils/ApiClient.ts`) with:

- Axios for HTTP requests
- Error handling and retry logic
- Request/response interceptors
- TypeScript types for API responses

### State Management

- **Redux Toolkit** for global state management
- **Redux Thunks** for async actions
- **Optimistic updates** for better UX
- **Error handling** with toast notifications

---

## Environment Variables

| Variable            | Description          | Default                 | Required |
| ------------------- | -------------------- | ----------------------- | -------- |
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000` | No       |
| `VITE_APP_TITLE`    | Application title    | `TCIT Posts`            | No       |

### Environment Files

- `.env` - Local environment variables
- `.env.example` - Example environment file
- `.env.production` - Production environment variables

---

## Testing

### Test Coverage

- **Current Coverage**: 100%
- **Target Coverage**: 80% (configurable)
- **Test Types**: Unit tests, Integration tests, Component tests

### Running Tests

```bash
# All tests
npm test

# With coverage report
npm run test:coverage

# Test UI (interactive)
npm run test:ui

# Run tests once
npm run test:run
```

### Test Structure

```
src/
├── components/
│   ├── __tests__/
│   │   ├── App.test.tsx
│   │   ├── PostForm.test.tsx
│   │   ├── PostList.test.tsx
│   │   ├── PostFilter.test.tsx
│   │   └── ThemeToggle.test.tsx
│   └── ...
└── ...
```

### Testing Tools

- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **jsdom** - DOM environment for tests
- **@testing-library/user-event** - User interaction simulation

---

## Architecture

```
src/
├── main.tsx                 # Application entry point
├── App.tsx                  # Root component
├── components/              # Reusable UI components
│   ├── PostForm.tsx         # Post creation form
│   ├── PostList.tsx         # Posts display list
│   ├── PostFilter.tsx       # Search and filter
│   ├── ThemeToggle.tsx      # Theme switcher
│   └── __tests__/           # Component tests
├── features/                # Feature modules
│   └── posts/               # Posts feature
│       ├── postsSlice.ts    # Redux slice
│       ├── postsThunks.ts   # Async actions
│       └── types.ts         # Type definitions
├── hooks/                   # Custom React hooks
│   └── usePosts.ts          # Posts data hook
├── app/                     # App-level configuration
│   ├── store.ts             # Redux store
│   └── hooks.ts             # App hooks
├── theme/                   # Theme system
│   ├── context.ts           # Theme context
│   ├── useTheme.ts          # Theme hook
│   └── ThemeContext.tsx     # Theme provider
├── utils/                   # Utility functions
│   └── ApiClient.ts         # API client
└── assets/                  # Static assets
```

### Design Patterns

- **Component Composition** - Reusable component patterns
- **Custom Hooks** - Logic extraction and reuse
- **Context API** - Theme and global state
- **Redux Toolkit** - Predictable state management
- **TypeScript** - Type safety and developer experience

---

## NPM Scripts

| Script                  | Description               |
| ----------------------- | ------------------------- |
| `npm run dev`           | Start development server  |
| `npm run build`         | Build for production      |
| `npm run preview`       | Preview production build  |
| `npm test`              | Run tests in watch mode   |
| `npm run test:coverage` | Run tests with coverage   |
| `npm run test:ui`       | Run tests with UI         |
| `npm run test:run`      | Run tests once            |
| `npm run lint`          | Lint code with ESLint     |
| `npm run lint:fix`      | Fix linting errors        |
| `npm run format`        | Format code with Prettier |
| `npm run lighthouse`    | Run Lighthouse audit      |

---

## CI/CD

### GitHub Actions

- **Trigger**: Push to main branch or Pull Request
- **Workflow**: `.github/workflows/ci.yml`
- **Steps**:
  1. Lint code
  2. Run tests with coverage
  3. Build application
  4. Deploy to staging (if applicable)

### Quality Gates

- Code must pass linting
- Tests must pass with 80%+ coverage
- Build must succeed

---

## Performance

### Optimization Features

- **Vite Build** - Fast development and optimized production builds
- **Tree Shaking** - Unused code elimination
- **Minification** - Production build optimization
- **Hot Module Replacement** - Fast development experience

### Performance Metrics

- **Bundle Size**: Optimized with Vite
- **Development Speed**: Fast with Vite HMR
- **Build Time**: Optimized with TypeScript and Vite

---

## Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

---

## Troubleshooting (Common Issues)

- **Port 5173 already in use**: Stop the process using it (`lsof -i :5173` and then `kill <PID>`), or change the port in `vite.config.ts`.
- **Backend connection error**: Make sure the backend is running on `http://localhost:3000`.
- **Dependency issues**: Run `npm ci` to reinstall from scratch.
- **Tests fail due to context**: Make sure all components are wrapped with necessary providers in tests.
- **TypeScript errors**: Run `npm run lint:fix` to auto-fix issues.

---

## FAQ

**Q: How do I add a new component?**
A: Create the component in `src/components/`, add tests in `__tests__/`, and import it where needed.

**Q: How do I modify the theme?**
A: Edit the theme configuration in `src/theme/context.ts` and update the Material-UI theme.

**Q: How do I add a new API endpoint?**
A: Add the endpoint to `src/utils/ApiClient.ts` and create corresponding Redux actions in `src/features/posts/`.

**Q: How do I run the application in production mode?**
A: Run `npm run build` then `npm run preview` to test the production build locally.

**Q: How do I access the application from another device?**
A: Use `npm run dev -- --host` to make the dev server accessible from other devices on the network.

---

## License

This project is for technical evaluation purposes only.

---

## Author & Contact

**Alejandro Exequiel Hernández Lara**

- **Phone:** +56 9 4488 9280
- **Email:** [alejandrehl@icloud.com](mailto:alejandrehl@icloud.com)
- **LinkedIn:** [linkedin.com/in/alejandrehl](https://www.linkedin.com/in/alejandrehl/)
- **GitHub:** [github.com/Alejandrehl](https://github.com/Alejandrehl)

---
