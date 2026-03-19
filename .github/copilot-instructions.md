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

## Documentation Conventions
- Use JSDoc-style block comments in `src/js/**` for module purpose and non-trivial public helpers.
- Use concise inline comments only where logic is not immediately obvious (avoid restating code).
- Add short file-header/section-intent comments in `src/css/**` and structural comments in `src/html/index.html` for JS wiring points.
- Keep terminology consistent with the domain: stage, place notation, rows, hunt bells, lead/plain course.

## Mandatory Sync Checklist For Changes
When making any code change, always perform this checklist in the same update:
1. **Comment accuracy check**: If behavior, assumptions, or flow changed, update nearby comments/JSDoc in the edited source files.
2. **Architecture guidance check**: If module responsibilities or cross-file interaction changed, update this file (`.github/copilot-instructions.md`) to match.
3. **No stale docs**: Remove or rewrite comments that no longer describe actual runtime behavior.
4. **Generated output rule**: Never document behavior by editing `web/**`; update `src/**` and regenerate.

## Key Module Context For AI
- `src/js/lib/RingingPractice.js`: owns tutor runtime lifecycle, option normalisation, row progression state, and hot-path canvas rendering/caching.
- `src/js/lib/PlaceNotation.js`: source of truth for notation expansion/normalisation and parsing into permutations used by runtime logic.
- `src/js/ui/Tutor.js`: maps chooser inputs to a `RingingPractice` instance and computes line/highlight options for followed bell feedback.
