# Project Guidelines

## Code Style
- Use vanilla JavaScript with ES modules (`import` / `export`) in `src/js/**`.
- Keep changes small and focused; preserve existing naming and module boundaries.
- Match existing formatting in the file you edit (indentation/style is not fully standardized across the repo).

## Architecture
- Source of truth is `src/**`; distributable output is generated into `web/**`.
- App bootstrap is `src/js/app.js`; UI orchestration is in `src/js/ui/**`.
- Core ringing animation/runtime logic is in `src/js/lib/RingingPractice.js`.
- Notation parsing logic is in `src/js/lib/PlaceNotation.js`.
- Canvas scaling abstraction is in `src/js/lib/Canvas.js`.

## Build and Test
- Install dependencies: `npm install`
- Build all outputs: `npm run build`
- Rebuild on source changes: `npm run watch`
- Local dev server with build+watch: `npm start` (serves on `http://localhost:8080`)

## Conventions
- Edit only source files under `src/**` unless explicitly asked otherwise.
- Do not hand-edit generated files in `web/**`; regenerate via npm scripts.
- Keep HTML/service worker `{{DATE}}` placeholders intact in source; build scripts replace them.
- Prefer validating changes with `npm run build` after code edits.
- There is no dedicated automated test suite configured; rely on build success and targeted manual runtime checks.
