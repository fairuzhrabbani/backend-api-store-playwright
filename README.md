# Backend API Store – API Automation Testing

[![Playwright](https://img.shields.io/badge/Playwright-API%20Testing-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ESM-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Allure Report](https://img.shields.io/badge/Allure-Report%203-FF6A00?logo=allure&logoColor=white)](https://allurereport.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Pino](https://img.shields.io/badge/Logger-Pino-687634)](https://getpino.io/)

A comprehensive **API Automation Testing Framework** built with Playwright and JavaScript to validate backend API functionality, role-based access control, response integrity, and database consistency.

This project demonstrates a structured approach to API automation testing with reusable components, multiple validation layers, structured logging, detailed reporting, and code quality standards.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Testing Scope](#testing-scope)
- [Validation Strategy](#validation-strategy)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Logging](#logging)
- [Code Quality](#code-quality)
- [Test Automation Approach](#test-automation-approach)
- [Author](#author)

---

## Project Overview

The Backend API Store project is designed to implement API automation testing across different application modules and user authorization levels.

The framework separates test execution into two primary roles:

- **Admin Role:** Validates API functionalities and permissions available to administrator accounts.
- **User Role:** Validates API functionalities, access permissions, and restrictions applicable to standard users.

The framework focuses not only on validating HTTP responses but also on verifying response structures, JSON schema compliance, and actual database records.

The main objective is to build a maintainable and scalable automation framework following practical QA Automation Engineering principles.

## Key Features

- API automation using Playwright.
- Role-based testing (Admin and User).
- Reusable API testing components and fixtures.
- Dynamic test data generation using Faker.js.
- JSON Schema validation using AJV.
- Database verification using PostgreSQL.
- Environment-based test execution (SIT and UAT).
- Structured logging using Pino.
- Playwright built-in HTML reporting.
- Allure Report 3 integration.
- ESLint for code quality and static analysis.
- Prettier for consistent code formatting.
- Husky and lint-staged for pre-commit quality checks.

## Testing Scope

The framework covers the following API modules:

| Module | Testing Coverage |
|---|---|
| Authentication | Login and Registration |
| Products | Product management and authorization |
| Categories | Category management and authorization |
| Cart | Shopping cart functionality |
| Users | User management and authorization |

### Role-Based Testing

**1. Admin Role**

Tests API functionalities using administrator credentials and validates administrative permissions.

**2. User Role**

Tests API functionalities using standard user credentials and verifies that restricted administrative operations cannot be accessed by unauthorized users.

**3. Authorization Testing**

Validates access control and permission boundaries between Admin and User roles.

## Validation Strategy

The framework implements four validation layers to improve API reliability and data integrity.

### 1. HTTP Status Code Validation

Verifies that API endpoints return the expected HTTP status codes based on the request and business scenarios.

Examples:
- 200 OK
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

### 2. Response Body Validation

Validates response payloads against expected business requirements.

Examples:
- Required properties.
- Expected response values.
- Data types.
- Success and error messages.
- Authentication tokens and user information.
- Negative scenario responses.

### 3. JSON Schema Validation

Uses **AJV (Another JSON Schema Validator)** to validate API response structures and data types.

Benefits:
- Ensures response consistency.
- Validates required properties.
- Checks data types and constraints.
- Detects unexpected response structures.
- Supports reusable JSON schemas.

### 4. Database Validation

Uses PostgreSQL connectivity through the `pg` library to verify actual database records.

Database validation helps ensure:
- Data is correctly inserted after successful registration.
- Database records match API response data.
- Updated records contain expected values.
- Deleted records no longer exist.
- Invalid requests do not create unexpected database records.

## Technology Stack

| Technology | Purpose |
|---|---|
| JavaScript (ES Modules) | Programming language |
| Playwright | API automation and test execution |
| AJV | JSON Schema validation |
| Faker.js | Dynamic test data generation |
| dotenv | Environment variable management |
| cross-env | Cross-platform environment configuration |
| PostgreSQL | Database |
| pg | PostgreSQL database connectivity |
| Pino | Structured application and test logging |
| pino-pretty | Readable log output |
| Allure Report 3 | Advanced test reporting |
| Playwright HTML Reporter | Built-in test reporting |
| ESLint | Static code analysis |
| Prettier | Code formatting |
| Husky | Git hooks |
| lint-staged | Pre-commit code quality checks |

## Project Structure

The repository is organized into configuration, source code, and test directories.

```text
backend-api-store-playwright/
│
├── config/
│   └── environments/
│       ├── .sit.env
│       └── .uat.env
│
├── src/
│   ├── fixtures/
│   ├── helpers/
│   ├── api/
│   ├── schemas/
│   ├── utils/
│   └── ...
│
├── tests/
│   ├── auth/
│   │   ├── login/
│   │   │   ├── admin/
│   │   │   └── user/
│   │   └── register/
│   │       └── user/
│   │
│   ├── products/
│   │   ├── admin/
│   │   └── user/
│   │
│   ├── category/
│   │   └── admin/
│   │
│   └── authorization/
│
├── playwright.config.js
├── allurerc.js
├── eslint.config.js
├── .prettierrc.json
├── .prettierignore
├── .gitignore
├── package.json
└── package-lock.json
```

*Note: The tree above illustrates the main project organization and representative directories. Additional files and modules may exist within the source and test folders.*

## Prerequisites

Before running the automation tests, make sure the following tools are installed:

- Node.js and npm.
- PostgreSQL.
- Backend API Store application.
- Git.

## Installation

**First, you need to clone the backend repository here.**
Clone the repository for Backend Side:
[Backend Repository]([https://getpino.io/](https://github.com/fairuzhrabbani/backend-api-kopling-to-cvt.git))

Clone the repository API Testing:

```bash
git clone https://github.com/fairuzhrabbani/backend-api-store-playwright.git
```

Navigate to the project directory:

```bash
cd backend-api-store-playwright
```

Install dependencies:

```bash
npm install
```

## Environment Configuration

This project supports multiple testing environments, such as SIT and UAT.

Create environment files inside:

```text
config/environments/
```

Create `.sit.env` and `.uat.env`.

Example environment configuration:

```env
# API Configuration
BASE_URL=http://localhost:3000/api

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
DB_USER=your_username
DB_PASSWORD=your_password

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password

# User Credentials
USER_EMAIL=user@example.com
USER_PASSWORD=your_user_password
```

Adjust the values according to your backend API and PostgreSQL configuration.

**Important:** Never commit environment files containing actual credentials, database passwords, or sensitive information to GitHub.

## Running Tests

The project provides several npm scripts to execute API automation tests.

### Run All Tests

```bash
npm test
```

### Run Tests by Environment

SIT:

```bash
npm run test:sit
```

UAT:

```bash
npm run test:uat
```

### Run Tests by Role

Admin:

```bash
npm run test:admin
```

User:

```bash
npm run test:user
```

### Run Authorization Tests

```bash
npm run test:authz
```

### Run Specific Test Modules

Admin Login:

```bash
npm run test:auth:login:admin:sit
```

User Login:

```bash
npm run test:auth:login:user:sit
```

User Registration:

```bash
npm run test:auth:register:user:sit
```

Admin Get All Categories:

```bash
npm run test:category:getall:admin:sit
```

Admin Get One Category:

```bash
npm run test:category:getone:admin:sit
```

Additional test scripts can be executed using the Playwright CLI:

```bash
npx playwright test tests/products/admin
```

## Test Reports

This framework integrates two reporting solutions to provide comprehensive test execution visibility.

### 1. Playwright HTML Report

Playwright's built-in HTML reporter provides:
- Test execution summary.
- Passed and failed test cases.
- Execution duration.
- Error details and stack traces.
- Test attachments and traces when available.

Generate and open the report:

```bash
npx playwright show-report
```

The report is generated in:

```text
playwright-report/
```

### 2. Allure Report 3

Allure Report 3 provides more detailed and interactive test reporting.

Reporting capabilities include:
- Test suite organization.
- Test execution steps.
- Test status and duration.
- Test metadata and labels.
- Attachments and debugging information.
- Environment information.
- Historical execution visibility when report history is maintained.

Generate the Allure report:

```bash
npm run report:generate
```

Open the generated report:

```bash
npm run report:open
```

The report directories are:

```text
allure-results/
allure-report/
```

## Logging

The framework uses **Pino** as its structured logging solution.

Logging is implemented to improve test execution traceability, debugging, and troubleshooting.

Logging coverage includes:
- API request information.
- API response information.
- HTTP status codes.
- Test execution details.
- Error information.
- Sensitive data masking.

The project also uses `pino-pretty` to improve log readability during local execution.

## Code Quality

Code quality and consistency are maintained through ESLint, Prettier, Husky, and lint-staged.

### ESLint

Run code analysis:

```bash
npm run lint
```

Automatically fix supported issues:

```bash
npm run lint:fix
```

### Prettier

Format project files:

```bash
npm run format
```

Check formatting without modifying files:

```bash
npm run format:check
```

### Husky & lint-staged

The project integrates Git hooks to help maintain code quality before commits.

Supported checks include:
- JavaScript formatting.
- ESLint auto-fixes.
- JSON and Markdown formatting.

## Test Automation Approach

This project follows several important API automation testing principles:

1. **Separation of Concerns** – Separating test scenarios, API interactions, fixtures, utilities, and validation logic.
2. **Reusability** – Using reusable components to minimize code duplication.
3. **Data-Driven Testing** – Generating dynamic test data using Faker.js.
4. **Multi-Layer Validation** – Combining HTTP, response body, JSON Schema, and database validation.
5. **Role-Based Testing** – Ensuring API authorization works correctly for different user roles.
6. **Environment Management** – Supporting multiple environments through environment-specific configuration.
7. **Observability** – Using structured logging and detailed reporting to simplify troubleshooting.
8. **Code Quality** – Applying consistent coding standards and automated quality checks.

## Author

**Fairuz Hanif Rabbani**

QA Engineer | QA Automation Enthusiast

- GitHub: [@fairuzhrabbani](https://github.com/fairuzhrabbani)
- Repository: [Backend API Store – Playwright](https://github.com/fairuzhrabbani/backend-api-store-playwright)

---

⭐ If you find this project useful or interesting, feel free to explore the repository, provide feedback, or connect with me!
