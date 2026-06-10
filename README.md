# Enterprise Playwright API Testing Framework

An enterprise-grade API testing framework built with **Playwright** and **TypeScript**, using the free [reqres.in](https://reqres.in) API.

---

## Project Structure

```
Enterprise_Playwright_Framework/
├── .github/workflows/     # CI/CD pipelines
├── config/                # Environment configurations
├── constants/             # Endpoints, headers, messages
├── fixtures/              # Test data (JSON)
├── pages/                 # API client classes (BaseAPI, UserAPI, AuthAPI, ProductAPI)
├── services/              # Service layer with built-in assertions
├── utils/                 # Logger, retry, random data helpers
├── schemas/               # JSON schemas for response validation
├── tests/
│   ├── smoke/             # Critical path tests
│   ├── regression/        # Full regression suite
│   ├── crud/              # CRUD operation tests
│   └── authentication/    # Auth tests
├── .env.dev / .env.qa / .env.prod
├── playwright.config.ts
└── package.json
```

---

## Setup

```bash
npm install
npx playwright install
```

---

## Running Tests

```bash
# All tests
npm test

# By suite
npm run test:smoke
npm run test:regression
npm run test:crud
npm run test:auth

# By environment
npm run test:dev
npm run test:qa
npm run test:prod
```

---

## Environment Variables

Each `.env.*` file contains:

```env
BASE_URL=https://reqres.in
API_VERSION=/api
ENV=dev
```

---

## API Used

All tests run against **[reqres.in](https://reqres.in)** — a free, hosted REST API for testing.
