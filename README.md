# RBAC Admin

Frontend for a **role-based access control (RBAC)** admin console: users, roles, permissions, team views, and a kinetic-style dashboard. Built with React and Redux Toolkit (including RTK Query for API calls).

## Tech stack

- **React 19** + **Vite 7**
- **React Router 7** — `/login`, `/signup`, and protected app shell routes
- **Redux Toolkit** — `auth` slice and store configuration
- **RTK Query** — users, roles, permissions mutations/queries (`src/store/services/api.js`, `AuthServices.js`)
- **Tailwind CSS v4** — utility styling alongside scoped CSS and design tokens (`--kp-*` in `index.css`)
- **js-cookie** — optional persistence for auth/session handling

## Features

- **Authentication** — Login and sign-up pages; protected routes via `PrivateRoute`
- **Dashboard** — Overview metrics and activity-style layout
- **Projects** — Kanban-style board; **New Task +** opens a glass-panel task side sheet (`AddTaskSideSheet`)
- **Team** — Team listing and assignment-oriented UI
- **Users / Roles / Permissions** — CRUD-oriented screens with side sheets (e.g. add user, role, permission)
- **Settings** — Profile and app preferences entry points
- **App shell** — Sidebar navigation and layout (`AppLayout`)

## Prerequisites

- **Node.js** 20+ (recommended; matches current Vite/React tooling)

## Environment

| Variable              | Description                                      |
| --------------------- | ------------------------------------------------ |
| `VITE_API_BASE_URL`   | Base URL for admin API (defaults to `/api/admin`) |

Create a `.env` in the project root if your API is not served from the same origin:

```env
VITE_API_BASE_URL=https://your-api.example.com/api/admin
```

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start dev server (Vite)  |
| `npm run build`| Production build         |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint               |

## Project structure (high level)

```
src/
  components/     # Shared UI (side sheets, layout, tables, buttons)
  pages/          # Route-level screens
  store/          # Redux store, slices, RTK Query services
  theme/          # Shared theme helpers (e.g. buttons)
  App.jsx         # Route definitions
  main.jsx        # Store provider, router, auth rehydration
```

## Development

1. Install dependencies: `npm install`
2. Copy/configure `.env` if needed
3. Run `npm run dev` and open the URL shown in the terminal (typically `http://localhost:5173`)

## License

Private project (`"private": true` in `package.json`). Adjust this section if you publish or open-source the repo.
