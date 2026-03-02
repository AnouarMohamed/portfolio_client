# Portfolio Client

Production-ready portfolio platform built with React, Vite, TypeScript, Express, and SQLite.

This project is not a static template. It ships as a small full-stack app with:

- a public portfolio site
- a protected CMS for the client, with a configurable admin route
- draft vs published content visibility
- built-in analytics for page views and key actions
- a lightweight SQLite-backed content store

## Contents

- [Overview](#overview)
- [Core capabilities](#core-capabilities)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [How content works](#how-content-works)
- [Authentication model](#authentication-model)
- [Analytics model](#analytics-model)
- [Routes](#routes)
- [API surface](#api-surface)
- [Environment variables](#environment-variables)
- [Local development](#local-development)
- [Available scripts](#available-scripts)
- [Build and deployment](#build-and-deployment)
- [Verification](#verification)
- [Notes](#notes)

## Overview

The app has two sides:

1. A public-facing portfolio with case studies, journal content, contact flow, and marketing pages.
2. A private client-only admin area where content, projects, posts, and site settings can be edited.

The frontend consumes CMS data through `/api/content/public`.  
The admin area uses authenticated endpoints under `/api/admin/*`.  
Content is stored as JSON in SQLite and seeded automatically from the TypeScript defaults on first run.

## Core capabilities

- Public portfolio pages backed by a CMS content layer
- Protected admin editor for site settings, homepage sections, page copy, projects, and journal posts
- Draft/published support so visitors never see unpublished work
- Analytics dashboard with visitor counts, page views, tracked actions, and recent events
- Lazy-loaded page routes and split production bundles
- Server-rendered static asset delivery in production through Express

## Architecture

### High-level system

```mermaid
flowchart LR
  Visitor[Visitor Browser]
  Client[React + Vite Client]
  Admin[Client Admin UI]
  API[Express API]
  Auth[Server session + CSRF]
  DB[(SQLite content + analytics)]

  Visitor --> Client
  Client -->|GET /api/content/public| API
  Client -->|POST /api/analytics/track| API
  Admin -->|login/save/read analytics| API
  API --> Auth
  API --> DB
```

### Content lifecycle

```mermaid
flowchart TD
  Defaults[TypeScript default CMS content]
  Seed[Seed content_store on first boot]
  AdminEdit[Admin edits content]
  Write[Write JSON envelope to SQLite]
  PublicRead[Public API reads content]
  Filter[Filter drafts from projects and posts]
  Site[Portfolio renders published content]

  Defaults --> Seed
  Seed --> Write
  AdminEdit --> Write
  Write --> PublicRead
  PublicRead --> Filter
  Filter --> Site
```

### Frontend runtime

```mermaid
flowchart LR
  Browser[Browser]
  Router[React Router]
  Provider[CmsProvider]
  PublicPages[Public pages]
  AdminPage[Admin page]
  PublicApi["/api/content/public"]
  AuthApi["/api/auth/session"]
  AdminApi["/api/admin/content"]
  AnalyticsApi["/api/admin/analytics"]

  Browser --> Router
  Router --> Provider
  Provider --> PublicPages
  Router --> AdminPage
  Provider -->|initial public fetch| PublicApi
  AdminPage -->|session bootstrap| AuthApi
  AdminPage -->|editable content| AdminApi
  AdminPage -->|dashboard metrics| AnalyticsApi
```

### Database layout

```mermaid
erDiagram
  content_store {
    text key PK
    text value
    text updated_at
  }

  admin_sessions {
    text id PK
    text username
    text token_hash
    text csrf_token
    text user_agent_hash
    text created_at
    text last_seen_at
    text expires_at
  }

  analytics_events {
    int id PK
    text session_id
    text event_type
    text path
    text label
    text metadata
    text created_at
  }
```

`content_store` is effectively a keyed document table. The live CMS content is stored under the `content` key as one JSON envelope.

### Request model

- Public visitors can only read published content.
- Admin users authenticate through `/api/auth/login`.
- Authenticated admin requests use a server-backed `httpOnly` session plus CSRF protection.
- Analytics are collected anonymously using a client-side generated session ID stored in localStorage.

## Tech stack

### Frontend

- React 19
- React Router 7
- TypeScript
- Vite 6
- Tailwind CSS 4
- `motion`
- `react-markdown`
- `lucide-react`

### Backend

- Express 4
- `better-sqlite3`
- `dotenv`
- server-backed admin sessions

### Tooling

- ESLint
- TypeScript type-checking
- `tsx`
- `concurrently`

## Project structure

```text
.
|-- public/
|   |-- favicon.svg
|   |-- robots.txt
|   `-- site.webmanifest
|-- server/
|   |-- analytics-store.ts
|   |-- auth.ts
|   |-- config.ts
|   |-- content-store.ts
|   |-- database.ts
|   `-- index.ts
|-- src/
|   |-- analytics/
|   |-- cms/
|   |-- components/
|   |-- features/
|   |   |-- admin/
|   |   |-- contact/
|   |   |-- home/
|   |   |-- journal/
|   |   `-- projects/
|   |-- hooks/
|   |-- pages/
|   |-- App.tsx
|   |-- index.css
|   `-- main.tsx
|-- .env.example
|-- package.json
|-- tsconfig.json
|-- tsconfig.server.json
`-- vite.config.ts
```

### Important modules

- [`src/App.tsx`](src/App.tsx): route registration and lazy page loading
- [`src/cms/CmsProvider.tsx`](src/cms/CmsProvider.tsx): client-side CMS state provider
- [`src/cms/schema.ts`](src/cms/schema.ts): shared content and analytics types
- [`server/index.ts`](server/index.ts): Express entrypoint and API routes
- [`server/content-store.ts`](server/content-store.ts): SQLite-backed content storage
- [`server/analytics-store.ts`](server/analytics-store.ts): analytics persistence and snapshot aggregation
- [`server/auth.ts`](server/auth.ts): signed cookie auth helpers

## How content works

The CMS data model is composed of:

- `site`: global metadata, navigation, social links, contact methods, service options
- `home`: hero, stats, services, featured content, differentiators, process, testimonials, FAQ, final CTA
- `pages`: portfolio/about/contact/journal page copy
- `projects`: case studies with draft/published status
- `blogPosts`: journal posts with draft/published status

On first server boot:

1. The server creates the SQLite database file if it does not exist.
2. The `content_store` table is created if missing.
3. Default CMS content is seeded from the TypeScript defaults.

When public content is returned:

- projects are filtered to published only
- blog posts are filtered to published only

When admin content is returned:

- the full editable content set is returned, including drafts

## Authentication model

Admin access is available at the configured admin route.

Default route:

```text
/admin
```

Recommended:

- move the admin UI to a non-default path with `VITE_ADMIN_PATH`
- restrict admin/auth requests with `ADMIN_ALLOWED_IPS`

Authentication flow:

1. Admin submits username and password to `/api/auth/login`
2. Server validates credentials against the configured admin username and password hash
3. Server creates a revocable server-side session in SQLite
4. Server issues a hardened `httpOnly` session cookie
5. Authenticated requests can access `/api/admin/content` and `/api/admin/analytics`
6. Authenticated write requests must also include a valid CSRF token

### Login sequence

```mermaid
sequenceDiagram
  participant B as Admin browser
  participant A as Express auth route
  participant L as Login rate limiter
  participant V as Password verifier
  participant S as Auth store
  participant D as SQLite

  B->>A: POST /api/auth/login { username, password }
  A->>L: check IP + username buckets
  L-->>A: allowed / blocked
  A->>V: verify username + password hash
  V-->>A: valid / invalid
  alt valid credentials
    A->>S: createSession(request, username)
    S->>D: INSERT admin_sessions
    S-->>A: session + opaque token
    A-->>B: 200 + httpOnly cookie + csrfToken
  else invalid credentials
    A->>L: consume failure
    A-->>B: 401 Invalid credentials
  end
```

### Authenticated write sequence

```mermaid
sequenceDiagram
  participant B as Admin browser
  participant A as Express admin route
  participant S as Auth store
  participant C as Content store
  participant N as Analytics store
  participant D as SQLite

  B->>A: PUT /api/admin/content + cookie + X-CSRF-Token
  A->>S: readSessionFromRequest()
  S->>D: SELECT admin_sessions by token hash
  S-->>A: session or null
  A->>S: verifyCsrf()
  S-->>A: valid / invalid
  A->>C: writeContent(content)
  C->>D: UPSERT content_store
  A->>N: track admin_content_saved
  N->>D: INSERT analytics_events
  A-->>B: updated content envelope
```

Session details:

- cookie name: `aura_admin_session` in development and `__Host-aura_admin_session` in production
- cookie uses `sameSite=strict`
- `httpOnly`
- `secure` in production
- sessions are revoked on logout
- sessions enforce an absolute lifetime and an idle timeout
- sessions are bound to the browser user agent
- CSRF protection is enforced on authenticated mutations

Login and request hardening:

- repeated failed logins are rate-limited
- cross-site write requests are rejected by origin checks
- admin and auth endpoints can be limited to trusted IPs only
- auth and admin responses are marked `Cache-Control: no-store`
- the server applies security headers such as `X-Frame-Options`, `X-Content-Type-Options`, HSTS in HTTPS production, and a restrictive baseline CSP for framing/object usage

## Analytics model

Analytics are intentionally lightweight and internal.

### What is tracked

- page views
- CTA clicks
- project opens
- portfolio filters
- journal filters
- journal pagination
- journal post opens
- contact method clicks
- inquiry submissions
- admin logins
- failed admin logins
- admin logouts
- admin content saves

### How it works

- The client creates an anonymous session ID and stores it in localStorage.
- Events are sent to `/api/analytics/track`.
- The server sanitizes and stores each event in SQLite.
- The admin dashboard reads a snapshot window and calculates:
  - total visitors
  - total page views
  - total actions
  - total inquiries
  - visits by day
  - top pages
  - action breakdown
  - recent events

Default analytics window: `14` days.

### Analytics ingestion pipeline

```mermaid
flowchart LR
  Action[User action]
  ClientTrack[trackAnalyticsEvent]
  LocalGuard[Client dedupe window]
  Api["/api/analytics/track"]
  Origin[Origin check]
  IpLimit[Request rate limiter]
  ServerGuard[Server session dedupe + quotas]
  Insert[(analytics_events)]
  Snapshot[Snapshot aggregation]
  Dashboard[Admin analytics dashboard]

  Action --> ClientTrack
  ClientTrack --> LocalGuard
  LocalGuard --> Api
  Api --> Origin
  Origin --> IpLimit
  IpLimit --> ServerGuard
  ServerGuard --> Insert
  Insert --> Snapshot
  Snapshot --> Dashboard
```

### Analytics snapshot model

```mermaid
flowchart TD
  Events[Windowed analytics rows]
  PageViews[Page views by path and day]
  Actions[Non-page action counts]
  Visitors[Unique visitor session IDs]
  TopPages[Top pages]
  Breakdown[Action breakdown]
  Recent[Recent events]
  Overview[Overview totals]

  Events --> PageViews
  Events --> Actions
  Events --> Visitors
  PageViews --> TopPages
  Actions --> Breakdown
  Events --> Recent
  PageViews --> Overview
  Actions --> Overview
  Visitors --> Overview
```

## Routes

### Public routes

- `/`
- `/portfolio`
- `/portfolio/:slug`
- `/journal`
- `/about`
- `/contact`

### Private route

- `VITE_ADMIN_PATH` value, defaulting to `/admin`

## API surface

### Auth

- `GET /api/auth/session`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Content

- `GET /api/content/public`
- `GET /api/admin/content`
- `PUT /api/admin/content`

### Analytics

- `POST /api/analytics/track`
- `GET /api/admin/analytics`

## Environment variables

Use the values in [.env.example](.env.example) as the starting point.

| Variable | Required | Purpose |
| --- | --- | --- |
| `ADMIN_USERNAME` | Yes | Username for `/admin` login |
| `ADMIN_PASSWORD` | Dev only | Plaintext fallback password for local development only |
| `ADMIN_PASSWORD_HASH` | Yes in production | Scrypt password hash for admin login |
| `SESSION_SECRET` | Yes | Secret used to hash session tokens and bind sessions securely |
| `VITE_ADMIN_PATH` | No | Build-time client route for the admin UI, defaults to `/admin` |
| `APP_ORIGIN` | No | Primary allowed browser origin for authenticated admin writes |
| `ALLOWED_ORIGINS` | No | Comma-separated extra allowed origins for authenticated admin writes |
| `ADMIN_ALLOWED_IPS` | No | Comma-separated exact IPv4 addresses or IPv4 CIDR ranges allowed to reach admin/auth endpoints |
| `TRUST_PROXY` | No | Enables correct client IP detection behind a reverse proxy |
| `ADMIN_LOGIN_WINDOW_MINUTES` | No | Window used for login attempt counting |
| `ADMIN_LOGIN_BLOCK_MINUTES` | No | Temporary lockout duration after too many failed logins |
| `ADMIN_LOGIN_MAX_ATTEMPTS` | No | Maximum failed login attempts allowed within the window |
| `ADMIN_SESSION_DAYS` | No | Absolute admin session lifetime |
| `ADMIN_SESSION_IDLE_HOURS` | No | Idle timeout before an admin session expires |
| `CMS_DB_PATH` | No | Path to the SQLite database file |
| `PORT` | No | Express server port, defaults to `4000` |
| `VITE_API_BASE_URL` | No | Optional client API base URL, useful when frontend and backend are served from different origins |

## Local development

### Prerequisites

- Node.js 20+ recommended
- npm

### Install

```bash
npm install
```

### Configure environment

Create a local env file or set environment variables in your shell.

Example values:

```bash
ADMIN_USERNAME=client
ADMIN_PASSWORD_HASH=
SESSION_SECRET=replace-this-with-a-long-random-secret
VITE_ADMIN_PATH=/client-portal
APP_ORIGIN=
ALLOWED_ORIGINS=
ADMIN_ALLOWED_IPS=203.0.113.10,198.51.100.0/24
TRUST_PROXY=true
ADMIN_LOGIN_WINDOW_MINUTES=15
ADMIN_LOGIN_BLOCK_MINUTES=30
ADMIN_LOGIN_MAX_ATTEMPTS=5
ADMIN_SESSION_DAYS=7
ADMIN_SESSION_IDLE_HOURS=12
CMS_DB_PATH=./data/cms.sqlite
PORT=4000
VITE_API_BASE_URL=
```

Generate a production password hash with:

```bash
npm run hash:password -- "your-strong-password"
```

### Start development

```bash
npm run dev
```

This starts:

- Vite client on `http://localhost:3000`
- Express API on `http://localhost:4000`

In development, Vite proxies `/api/*` requests to the Express server.

### Local development topology

```mermaid
flowchart LR
  Browser[Browser]
  Vite[Vite dev server :3000]
  Api[Express API :4000]
  Db[(SQLite)]

  Browser --> Vite
  Vite -->|proxy /api/*| Api
  Api --> Db
```

### Admin access

Open:

```text
http://localhost:3000/admin
```

If you set `VITE_ADMIN_PATH`, use that route instead.

Use the credentials from your environment variables.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start client and server together |
| `npm run dev:client` | Start the Vite frontend |
| `npm run dev:server` | Start the Express server in watch mode |
| `npm run build` | Build the frontend bundle |
| `npm run preview` | Preview the production frontend bundle |
| `npm run start` | Start the Express server |
| `npm run hash:password -- "password"` | Generate a scrypt password hash for `ADMIN_PASSWORD_HASH` |
| `npm run typecheck` | Run client and server TypeScript checks |
| `npm run lint` | Run type-checking and ESLint |

## Build and deployment

This app is not static-only if you want the CMS/admin features.

To deploy the full system you need:

1. a Node-capable host
2. persistent storage for the SQLite database
3. environment variables for admin auth and session signing

### Production flow

```bash
npm install
npm run build
npm run start
```

### Production runtime topology

```mermaid
flowchart LR
  Browser[Browser]
  Proxy[Optional reverse proxy or platform edge]
  App[Express server]
  Dist[Built dist assets]
  Api[REST API routes]
  Db[(SQLite on persistent disk)]

  Browser --> Proxy
  Proxy --> App
  App --> Dist
  App --> Api
  Api --> Db
```

If you deploy frontend and backend on different origins, the browser still uses the same client bundle, but API calls are redirected through `VITE_API_BASE_URL`.

### Public vs admin data exposure

```mermaid
flowchart TD
  Cms[Stored CMS content]
  PublicRead["readPublicContent()"]
  AdminRead["readAdminContent()"]
  DraftFilter[Remove draft projects and posts]
  PublicJson["/api/content/public"]
  AdminJson["/api/admin/content"]
  Visitor[Visitor-facing site]
  Editor[Authenticated admin]

  Cms --> PublicRead
  Cms --> AdminRead
  PublicRead --> DraftFilter
  DraftFilter --> PublicJson
  AdminRead --> AdminJson
  PublicJson --> Visitor
  AdminJson --> Editor
```

### Deployment notes

- Keep the SQLite database file on persistent storage.
- Do not deploy with the example admin credentials.
- Use `ADMIN_PASSWORD_HASH` instead of `ADMIN_PASSWORD`.
- Set a strong `SESSION_SECRET`.
- Move the admin UI off `/admin` with `VITE_ADMIN_PATH`.
- Restrict access further with `ADMIN_ALLOWED_IPS` if the client has stable office or VPN IPs.
- Set `TRUST_PROXY` correctly if the app sits behind Nginx, Cloudflare, Railway, Render, Fly.io, or another reverse proxy.
- Set `APP_ORIGIN` or `ALLOWED_ORIGINS` if admin writes can originate from another trusted origin.
- If frontend and backend are on different origins, set `VITE_API_BASE_URL`.
- Ensure the reverse proxy forwards cookies correctly.

## Verification

Current verification commands:

```bash
npm run lint
npm run build
```

Both should pass before deployment.

## Notes

- The database is created automatically at the configured `CMS_DB_PATH`.
- Public visitors are always read-only.
- Draft projects and draft journal posts are hidden from the public API.
- The admin area reads and writes live content directly through the server API.
- IP allowlisting works best when the client uses a fixed public IP or reaches the site through a VPN with a stable egress IP.
