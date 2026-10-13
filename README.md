# AgroAI Sugarcane Smart Irrigation Advisory

AgroAI is a locally runnable React, Express, and MongoDB college mini-project for sugarcane irrigation planning. Farmers can register, sign in, save one or more plots, generate recommendations from the included 3,000-row `FINAL_SUGARCANE_DATASET.csv`, accept an advisory, sign out, and retrieve their data later.

The advisory engine is intentionally described accurately: it is a rule-based historical-record matcher, not a trained machine-learning model. Soil moisture is entered manually. Rainfall and temperature shown with a recommendation are historical indicators from the matched CSV row, not live sensor or weather data.

## Stack

- React 19 + Vite frontend
- Node.js + Express backend
- Local MongoDB through Mongoose
- HTTP-only signed authentication cookie and bcrypt password hashing
- Zod request validation, Helmet security headers, CORS, and authentication rate limiting

## Prerequisites

- Node.js 20 or newer
- MongoDB Community Server running as a local Windows service
- MongoDB Compass for inspection

No MongoDB Atlas account or paid service is required.

## First-time setup

```powershell
git clone --branch backend-mongodb-integration https://github.com/Prasad-132006/WPL---Mini-Project---ai-irrigation-advisory.git
cd WPL---Mini-Project---ai-irrigation-advisory
npm install
Copy-Item .env.example .env
```

Change `JWT_SECRET` in `.env` to a long random value. The default MongoDB connection is:

```text
mongodb://127.0.0.1:27017/agroai
```

## Start local MongoDB for Compass

MongoDB Compass is the graphical database manager. The MongoDB Community Server Windows service stores and serves the data that Compass displays. Install both MongoDB Community Server and Compass from MongoDB’s official installer, selecting **Install MongoD as a Service** during setup.

Check the local service from PowerShell:

```powershell
Get-Service MongoDB
```

If its status is not `Running`, start it from Windows Services or from an administrator PowerShell terminal:

```powershell
Start-Service MongoDB
```

The application connects directly to this local service. Docker, MongoDB Atlas, and cloud accounts are not used.

## Run the application

```powershell
npm run dev
```

This starts both services:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`

Vite proxies `/api` requests to Express. For separate terminals, use `npm run dev:server` and `npm run dev:client`.

## Inspect records in MongoDB Compass

1. Start the local `MongoDB` Windows service.
2. Open MongoDB Compass.
3. Paste `mongodb://127.0.0.1:27017` into **New Connection** and select **Connect**.
4. Run AgroAI and complete registration, field saving, or advisory generation.
5. Select the refresh icon in Compass and open the `agroai` database.
5. Inspect these collections:
   - `farmers`: account, name, normalized email, bcrypt password hash, and profile fields
   - `fields`: separate sugarcane field documents with a `farmer` owner reference
   - `advisories`: captured inputs, calculated recommendation, a `field` reference, and acceptance status

The same owner ObjectId connects a farmer’s records. API queries always include that owner, so another authenticated farmer cannot read or modify them.

## Main workflow

1. Register with a unique email and password of at least 8 characters.
2. The backend hashes the password and creates an HTTP-only session cookie.
3. Open **My Fields**, add a sugarcane field, and enter its name, area, stage, soil type, current moisture, electricity availability, and measured pump flow rate.
4. Save the field, or generate an advisory (which saves the field first). Multiple fields are stored as separate documents.
5. The backend maps the UI stage to the dataset’s `Early`, `Mid`, or `Late` stage, filters by soil, compares current moisture with that full cohort, and exposes the closest raw CSV record for traceability.
6. If moisture is low relative to the cohort, the backend produces a planning depth based on published sugarcane stage/soil guidance, converts millimetres to litres for the entered acreage, and uses the farmer's pump flow to estimate duration. Otherwise it recommends delaying or rechecking and prescribes zero water.
7. Accepting the advisory persists `accepted: true` and `acceptedAt`.
8. Log out and back in to reload saved fields and their individual histories.

### Existing `farms` collection migration

On startup, the backend checks for the legacy `farms` collection. It copies every record into `fields` with the same `_id` and `farmer`, adds the corresponding `field` reference to legacy advisories, and verifies identifiers, ownership, crop values, and advisory relationships. The old collection is dropped only after all checks pass; on any mismatch the server stops and preserves `farms`. The migration is idempotent, so normal restarts do not duplicate records.

Only `Sugarcane` is accepted. The backend rejects another crop even if someone bypasses the frontend.

### Dataset-quality boundary

The attached CSV remains fully available to the matching workflow, but its raw water field is approximately 500–2,000 litres per acre and its rainfall-total field is approximately 800–2,000 mm. Those values are displayed as raw historical reference data rather than being misrepresented as an exact irrigation dose or rain probability. The operational planning depth and stage/soil interval follow the [Tamil Nadu Agricultural University sugarcane irrigation guidance](https://agritech.tnau.ac.in/expert_system/sugar/irrigationmanagement.html). Farmers must still check actual rainfall, drainage, calibrated root-zone moisture, and local agricultural advice.

## API summary

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Database and dataset readiness |
| `POST` | `/api/auth/register` | Create a unique farmer account |
| `POST` | `/api/auth/login` | Start a secure session |
| `POST` | `/api/auth/logout` | Clear the session |
| `GET` | `/api/auth/me` | Restore the signed-in farmer |
| `GET/POST` | `/api/fields` | List or create owned fields |
| `GET` | `/api/fields/:id` | Retrieve an owned field with its advisories |
| `PUT` | `/api/fields/:id` | Update an owned field |
| `GET/POST` | `/api/advisories` | List or generate owned advisories |
| `PATCH` | `/api/advisories/:id/accept` | Persist acceptance for an owned advisory |

## Verification

Run static checks and the production build:

```powershell
npm run lint
npm run build
```

The automated integration test uses the same local MongoDB Community Server but a separate `agroai_test` database. It never drops or modifies the demonstration `agroai` database:

```powershell
npm test
```

The tests verify all 3,000 dataset rows load, low-moisture volume and pump calculations, wet-field zero-water behavior, safe legacy migration, registration, case-insensitive duplicate-email rejection, password hashing, session protection, multiple-field persistence, field editing and detail retrieval, advisory generation and association, acceptance persistence, unsupported-crop rejection, and isolation between two farmers.

## Project structure

```text
server/
  app.js             Express routes and error handling
  auth.js            HTTP-only JWT cookie authentication
  dataset.js         CSV loading and historical matching
  migrate.js         Verified farms-to-fields migration
  models.js          MongoDB farmers, fields, and advisories
  validation.js      API input validation
  app.test.js        Database-backed integration tests
src/
  api.js             Credentialed frontend API client
  auth.jsx           Persistent React authentication state
  components/        Existing UI plus connected dashboard workspace
FINAL_SUGARCANE_DATASET.csv
```

## Security and reliability notes

- Password hashes are never returned by the API.
- Authentication state is not stored in local storage.
- Cookies are HTTP-only, SameSite=Lax, and secure in production mode.
- Duplicate email and duplicate per-farmer field names are protected by database indexes.
- All field and advisory reads and writes are scoped to the authenticated farmer.
- API inputs are size-limited and validated; Sugarcane is enforced at both validation and database levels.
- The server exits with a clear message when MongoDB is unavailable rather than running in a partially connected state.
