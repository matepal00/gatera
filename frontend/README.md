# Gatera Frontend

Test frontend for the Gatera wallet transfer screening MVP.

The app contains:

- public Solutions landing page
- API reference page
- Pricing page
- protected demo dashboard
- screening, wallets, and reports dashboard sections

## Test Version Login

This is a test build. Authentication is hardcoded on the frontend for demo access only.

```text
email: ethsilesia.gatera@gmail.com
password: !QAZ2wsx
```

The login stores a local demo session flag in the browser. It is not production authentication.

## Requirements

- Node.js
- npm

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

If the backend is already running on port `3000`, start the frontend on another port:

```bash
npm run dev -- -p 3001
```

Then open:

```text
http://localhost:3001
```

## Useful Commands

```bash
npm run lint
npm run build
```

## Current Scope

This frontend is aligned with the MVP backend flow:

1. A company wants to check a wallet involved in a treasury transfer.
2. The backend evaluates the transfer and wallet history.
3. The response contains a decision and only triggered heuristics.
4. The result can be used as context for an AI-generated event report.

The frontend is intentionally still a test/demo version. Production auth, billing, and live dashboard data are not implemented yet.
