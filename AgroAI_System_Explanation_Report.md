# AgroAI System Explanation Report

## Scope

AgroAI is a sugarcane-only smart irrigation advisory system. It combines farmer-entered conditions with `FINAL_SUGARCANE_DATASET.csv` and stores farmer, field, recommendation, and acceptance records in a local MongoDB database.

It does not claim a trained AI model, physical IoT integration, or a live weather service. Dataset rainfall, humidity, temperature, disease, yield, and irrigation fields are historical reference values.

## End-to-end architecture

```text
React browser
  -> credentialed /api request
Express validation and authenticated owner check
  -> Mongoose
Local MongoDB (agroai)
  -> farmers / fields / advisories / support_tickets

Recommendation request
  -> read owned field
  -> match historical CSV record
  -> calculate water and duration
  -> persist advisory
  -> return result to React
```

## Authentication

Registration normalizes email addresses, prevents duplicates, and hashes passwords with bcrypt. Login creates a signed, HTTP-only, SameSite cookie. The browser restores a session through `/api/auth/me`; logout clears the cookie. Protected API routes load the farmer from the signed token.

The `passwordHash` field is excluded from normal database queries and never appears in an API response.

## Data model

- `farmers`: name, normalized unique email, password hash, optional profile, timestamps
- `fields`: farmer owner, field name, area, fixed Sugarcane crop, crop stage, soil type, electricity availability, current moisture, pump flow, timestamps
- `advisories`: farmer owner, field reference, immutable input snapshot, calculated recommendation, reference CSV row, accepted state, accepted time, timestamps
- `support_tickets`: farmer owner, optional owned-field reference, category, subject, message, reply, status, responding admin, and timestamps

Every field and advisory operation includes the authenticated farmer ID. Object IDs alone do not grant access. The My Fields interface lists each owned field as a separate card and filters advisory history by its `field` reference.

Support requests use the same authenticated farmer session. Farmers can read only their own tickets. Admin access is derived server-side from `SUPPORT_ADMIN_EMAILS`; registration never accepts a role. Admin replies and status changes are persisted through protected Express endpoints.

Legacy `farms` records are copied to `fields` with identifiers and ownership intact. Advisory references are migrated from `farm` to `field`; the legacy collection is removed only after the copy and relationships are verified.

## Recommendation method

The CSV contains 3,000 historical records. UI stages map to dataset stages:

| UI stage | Dataset stage |
| --- | --- |
| Germination | Early |
| Vegetative | Early |
| Grand growth | Mid |
| Maturity | Late |

The backend filters rows by mapped stage and soil type, compares the farmer’s moisture with the full matching cohort, and selects the row with soil moisture nearest to the current reading for traceability. If a stage/soil combination has no usable row, it falls back to stage-only records.

The CSV’s raw water field is retained and displayed, but is not used as an operational dose because its 500–2,000 litre/acre scale is inconsistent with published sugarcane irrigation depths. When current moisture is low relative to the historical cohort, a stage/soil planning depth is converted at 4,046.856 litres per millimetre-acre and divided by the farmer’s measured pump flow. When moisture is typical or high, the system prescribes zero water and requests a field recheck. The response exposes the matched CSV row number, cohort size, raw values, and safety boundary.

## Validation and failure handling

- The frontend validates required plot inputs before making a request.
- Zod validates every authentication, farm, and advisory request.
- Mongoose repeats important enum, numeric, ownership, and uniqueness constraints.
- The API returns clear 4xx errors for invalid input, duplicates, bad credentials, missing records, and unauthenticated access.
- MongoDB connection failure prevents server startup and prints a direct remediation message.
- React displays request errors and success states without discarding entered form values.

## Demonstration

Use the setup and MongoDB Compass instructions in `README.md`. The main demonstration should show two different farmers, confirm separate `farmer` references in Compass, and verify that each account sees only its own plots and advisories.
