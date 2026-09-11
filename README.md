# PAIVA public portal

The PAIVA portal is a public interface for technology, research, open work,
and evidence-led infrastructure in Brazilian contexts. It is intentionally a
work in progress: pages describe current capability honestly rather than
claiming a finished platform.

## Run locally

```bash
npm install
npm run dev
```

Useful project commands:

```bash
npm run build   # Type-check and create the production bundle in dist/
npm run lint    # Check source files with ESLint
npm run format  # Format source files with Prettier
```

## Public routes

- `/` — PAIVA home and current work
- `/ecosystem` — capability-layer view of the PAIVA ecosystem
- `/avalibr` — AvaliaBR, an early Brazilian-context evaluation pilot
- `/pii-br` — pii-br, a privacy and sensitive-data handling prototype
- `/datasets` — a public registry being prepared for datasets, fixtures, and references
- `/about` — PAIVA's purpose and contact orientation

All current public routes are static React pages. No sign-in, dashboard, or
live Convex service is required to open the public portal.

## Project structure

```text
src/
  components/  Shared interface pieces, including the site header and Brazil field
  pages/       Public routes
  lib/         Shared palette and utilities
work/          Review and source material; not loaded by the public site at runtime
```

## Editorial and technical boundaries

- AvaliaBR is presented as an early pilot, not a scientifically validated benchmark.
- The datasets registry remains empty until a dataset can be published with clear
  provenance, licence, version, and validation boundary.
- Some retained source files and dependencies originate in the original Freebuff
  export. They are not part of the active public route flow and should not be
  treated as a configured authentication or Convex deployment.

## Editor support

The `.vscode/` folder contains local editor recommendations and settings for
Tailwind, ESLint, and Prettier. It is optional for running the site, but makes
the workspace calmer to maintain in VS Code.
