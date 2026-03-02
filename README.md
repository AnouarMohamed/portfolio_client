# Portfolio Client

This branch is the Vercel-safe static deployment variant of the portfolio.

It keeps the public React/Vite site, the current UI, and the local CMS seed content, but it does not depend on the Express, SQLite, auth, or custom analytics stack at runtime.

The static deployment also ships with explicit response security headers from `vercel.json`.

## What This Branch Is

- A static personal portfolio build that can be deployed directly to Vercel
- Read-only content sourced from the files in `src/cms`
- A client-side React Router app with SPA rewrites configured in `vercel.json`
- A branch meant for public deployment, not live editing

## What Is Disabled Here

- The private admin editor
- SQLite-backed content persistence
- Express auth and admin APIs
- Custom server-side analytics storage

The admin route still exists, but on this branch it renders an "editor unavailable" screen instead of trying to log in to a missing backend.

## Branch Layout

- `main`: full-stack version with Express, SQLite, auth, CMS writes, and analytics
- `deploy/vercel-static`: static Vercel deployment version

## How This Branch Works

- `CmsProvider` stays in local/default-content mode by default through `VITE_APP_MODE=static`
- the public site renders from `src/cms/defaultContent.ts`
- custom analytics calls are disabled so the frontend does not spam missing `/api/*` routes
- `vercel.json` rewrites deep links back to `index.html` so React Router routes work on refresh

## Deploy To Vercel

1. Push this branch.
2. Import the repo into Vercel.
3. Set the production branch to `deploy/vercel-static`.
4. Use the default Vite build:

```bash
npm install
npm run build
```

Vercel should serve the built `dist` output automatically.

## Local Development

Static mode is the default on this branch:

```bash
npm install
npm run dev
```

Useful scripts:

- `npm run dev`: start the static Vite site
- `npm run dev:fullstack`: still available if you intentionally want to run the old backend locally
- `npm run build`: production build
- `npm run lint`: typecheck and lint

## Environment

See [.env.example](.env.example).

Important values:

- `VITE_APP_MODE="static"`: default for this branch
- `VITE_ADMIN_PATH="/admin"`: optional private route alias, even though editing is disabled here
- `VITE_API_BASE_URL=""`: leave empty for the static deployment
- `ADMIN_PASSWORD_HASH` and `SESSION_SECRET`: required if you intentionally start the old Express server locally

## Notes

- This branch is the right one for Vercel when you only need the public portfolio.
- If you want live editing on Vercel, you need to replace SQLite and the custom server state with hosted storage.
- The full-stack behavior still lives on `main`.
