# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
- `npm run lint` / `npm run lint:fix` — ESLint over the repo
- `npm run format` / `npm run format:check` — Prettier
- `npm run optimize-images` — one-off Sharp-based compression pass over `public/assets/`; not wired into build or CI, run manually after adding new photos

There is no test suite — no test script exists, and CI (`.github/workflows/ci.yml`) only runs `lint`, `format:check`, and `build` on push/PR to `main`.

Pre-commit hook is wired via `git config core.hooksPath .githooks` (set by the `prepare` npm script), not the standard Husky-generated hook — `.githooks/pre-commit` just runs `lint-staged` directly.

## Architecture

React 18 + Vite 5, no backend framework, no CSS framework, no React Router.

**Routing:** `src/App.jsx` reads `location.hash` (stripping a leading `#/`) into a `route` string and looks it up in the `PAGES` map to pick a page component. Listens for the `hashchange` event to update `route` and closes the mobile menu / scrolls to top on navigation. To add a page: add the component to `PAGES` and add a nav link (`#your-route`) in `Header.jsx`/`Footer.jsx`.

**Form submission is centralized in `App.jsx`**, not per-page. `handleSubmit(name)` is a single handler shared by every form (contact, order, workshop), keyed by a `name` string. It's passed down to the active page as a prop along with `sent`, `submitting`, and `submitError` (all keyed by that same `name`), so each page component just needs to call `handleSubmit('formName')` on its `<form onSubmit>` and read `sent['formName']` etc. for its own UI state — there's no local form state in the page components themselves.

Submission flow: reads `FormData` from the event, strips out the honeypot (`website`) and mount-timestamp (`ts`) fields into `meta` (used for spam detection, never sent as a visible field), converts any attached files to base64, and POSTs JSON to `/api/send-email`.

**Backend is a single Vercel serverless function**, `api/send-email.js`. It handles all three form types via a `form` field (`contact` | `order` | `workshop` → `FORMS` map for the email subject) and sends through Brevo's transactional email API. Env vars (`BREVO_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) are documented in `.env.example` and required — the handler 500s without them.

Spam mitigation in the API handler mirrors the frontend's honeypot/timestamp fields: a filled honeypot or a submission faster than `MIN_SUBMIT_MS` (1500ms) returns a fake success (`200 { ok: true }`) without calling Brevo, so bots can't detect they were blocked. Attachments are capped at 5, validated against an image-extension allowlist, and the whole request body is capped defensively below Vercel's 4.5MB limit.

**Styling** is global CSS classes in `src/index.css` (nav, buttons, cards, footer, animations) combined with per-component inline `style={{...}}` objects — there's no CSS-in-JS library or module scoping, so shared visual patterns live in `index.css` and one-off layout lives inline.

**Images** in `public/assets/` are referenced by literal string path (e.g. `/assets/logo-landscape.png`), not imported through Vite's module graph — they aren't processed at build time. `scripts/optimize-images.mjs` rewrites files in place at their existing path/filename for this reason: renaming or moving an asset requires manually updating every JSX reference to it.

**Deployment:** Vercel, auto-deploys `main` via GitHub integration. `vercel.json` pins the framework and sets immutable long-cache headers on `/assets/*`. The repo is public specifically so GitHub branch protection on `main` (required `build` status check, no force-push/delete) is available for free.

`The little apron/` at the repo root is the original design export (DC HTML, change-request uploads, story photos) — gitignored and not guaranteed to exist in a fresh clone. Don't treat it as a source of truth for current content; it's historical reference only.
