# Portfolio Client

Custom portfolio site built with React, Vite, TypeScript, Express, and SQLite.

## Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS
- Express
- SQLite via `better-sqlite3`

## Local development

1. Install dependencies with `npm install`
2. Copy `.env.example` values into your local environment as needed
3. Run `npm run dev`

The client runs on `http://localhost:3000` and proxies API requests to the Express server on `http://localhost:4000`.

## Available scripts

- `npm run dev` starts the client and server together
- `npm run dev:client` starts the Vite client
- `npm run dev:server` starts the Express server in watch mode
- `npm run build` builds the production client bundle
- `npm run start` starts the Express server
- `npm run lint` runs type-checking and ESLint
