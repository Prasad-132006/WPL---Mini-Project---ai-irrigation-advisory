# AgroAI

AgroAI is a sugarcane irrigation advisory miniproject built with React, Express, Node.js, and local MongoDB.

## Requirements

- Node.js 20 or newer
- npm
- MongoDB Community Server running locally
- MongoDB Compass for inspecting the database

## Setup

1. Run `npm install`.
2. Copy `.env.example` to `.env`.
3. Replace `JWT_SECRET` with a long random value. To enable Admin Support, set `SUPPORT_ADMIN_EMAILS` to one or more comma-separated registered email addresses.
4. Start the local MongoDB service.
5. Run `npm run dev`.
6. Open `http://localhost:5173`.

Express runs at `http://localhost:5000`. Vite proxies browser requests from `/api` to Express.

## MongoDB Compass

Connect Compass to `mongodb://127.0.0.1:27017`, use AgroAI, refresh Compass, and open the `agroai` database. Application records are stored in `farmers`, `fields`, `advisories`, and `support_tickets`.

## Commands

```bash
npm run dev          # Start React and Express
npm run dev:client   # Start only Vite
npm run dev:server   # Start only Express
npm start            # Start Express without watch mode
npm run lint         # Run ESLint
npm run build        # Create a production frontend build
npm test             # Run tests against agroai_test
```

Tests use `TEST_MONGODB_URI` when provided and otherwise use `mongodb://127.0.0.1:27017/agroai_test`. The suite clears only that dedicated test database.

## Configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `5000` | Express port |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/agroai` | Local application database |
| `JWT_SECRET` | Development fallback | Signs authentication cookies |
| `CLIENT_ORIGIN` | `http://localhost:5173` | Allowed frontend origin |
| `NODE_ENV` | `development` | Runtime environment |
| `SUPPORT_ADMIN_EMAILS` | Empty | Comma-separated admin account emails |

Keep `FINAL_SUGARCANE_DATASET.csv` in the project root.
