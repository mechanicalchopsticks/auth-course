# Repository Guidelines

## Project Structure & Module Organization

This repository contains two NestJS authentication examples:

- `cookie-based/` implements JWT authentication stored in cookies.
- `session-based/` implements Passport sessions backed by Redis.
- Each application keeps runtime code in `src/`, unit tests beside the code as `*.spec.ts`, and end-to-end tests in `test/` as `*.e2e-spec.ts`.
- Feature folders such as `src/auth/`, `src/user/`, and `src/database/` group controllers, services, modules, guards, strategies, entities, and DTOs.
- Root `docker-compose*.yaml` files and `docker-utils/` provide shared PostgreSQL and Redis infrastructure.

Keep changes scoped to the relevant example unless behavior is intentionally shared.

## Build, Test, and Development Commands

Run application commands from either `cookie-based/` or `session-based/`:

- `pnpm install` installs that application's dependencies.
- `pnpm start:dev` runs NestJS in watch mode.
- `pnpm build` compiles TypeScript into `dist/`.
- `pnpm lint` runs type-aware Oxlint checks over `src/` and `test/`.
- `pnpm format` formats TypeScript with Prettier.
- `pnpm test`, `pnpm test:e2e`, and `pnpm test:cov` run unit, end-to-end, and coverage suites.

From the repository root, use `docker compose up -d` to start PostgreSQL and Redis. The development override exposes PostgreSQL on port `5433` and Redis on `6379`.

## Coding Style & Naming Conventions

Use TypeScript with two-space indentation, single quotes, and trailing commas, matching `.prettierrc`. Follow NestJS naming patterns: `*.module.ts`, `*.controller.ts`, `*.service.ts`, `*.guard.ts`, and `*.strategy.ts`. Use PascalCase for classes and DTOs, camelCase for methods and variables, and kebab-case for directories and filenames. Prefer dependency injection and keep controllers thin.

## Testing Guidelines

Vitest is the test runner; Supertest supports HTTP-level e2e tests. Add focused unit tests beside changed code and e2e tests for externally visible authentication flows. Name files `feature.spec.ts` or `feature.e2e-spec.ts`. Run lint, unit tests, and relevant e2e tests before submitting. No coverage threshold is configured, but new behavior should include regression coverage.

## Commit & Pull Request Guidelines

Recent commits use short, imperative summaries such as `Add basic database infrastructure`. Keep each commit focused and describe the outcome, not implementation mechanics. Pull requests should identify the affected authentication example, summarize behavior changes, list verification commands, link related issues, and call out configuration or API changes. Include screenshots only for rendered documentation or UI changes.

## Security & Configuration

Do not commit real credentials, secrets, or production cookie/JWT settings. Treat checked-in development values as local-only examples. Document any new environment variables and use secure, environment-specific values outside development.
