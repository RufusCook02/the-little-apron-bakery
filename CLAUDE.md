# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## How changes ship

`main` auto-deploys to production, so it is never a working branch.

- Branch before editing; never commit or push to `main` (a PreToolUse hook blocks the push).
- Every implemented change ships as a PR. Open it, never merge it — the human merges.
- Visual changes carry screenshots at 390 / 820 / 1440 via `npm run screenshot`, sent in chat.
- Vercel posts a preview URL on every PR automatically; reference it in the PR body.

Follow the `ship` skill for the full procedure.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — full production build: client bundle, then SSR bundle, then
  prerender. The three steps are also available individually as `build:client`,
  `build:ssr` and `prerender`, but CI and Vercel both run `build`.
- `npm run preview` — serve the built `dist/`. This is the only way to see the
  prerendered HTML as production serves it; the dev server never prerenders.
- `npm run lint` / `npm run lint:fix` — ESLint over the repo
- `npm run format` / `npm run format:check` — Prettier
- `npm run optimize-images` — one-off Sharp-based compression pass over `public/assets/`; not wired into build or CI, run manually after adding new photos
- `npm run screenshot -- --route home` — capture a route at 390/820/1440 into `.screenshots/` (gitignored); drives the machine's installed Chrome/Edge via `puppeteer-core`, set `CHROME_PATH` to override. `--selector` clips around one element, `--url` targets a deployed site instead of localhost

There is no test suite — no test script exists. CI (`.github/workflows/ci.yml`) runs `lint`, `format:check` and `build` on push/PR to `main`, then asserts the prerender actually produced content (a page file, the 404, the sitemap, and a real canonical and body copy inside `dist/our-story.html`) — a silently broken prerender would still look fine in a browser while serving an empty shell to every crawler.

Pre-commit hook is wired via `git config core.hooksPath .githooks` (set by the `prepare` npm script), not the standard Husky-generated hook — `.githooks/pre-commit` just runs `lint-staged` directly.

## Architecture

React 18 + Vite 5, no backend framework, no CSS framework, no React Router.

**Routing:** real paths (`/our-story`), not hash fragments. `src/data/routes.js` is the single source of truth — `ROUTES` holds each page's `key`, `path`, `title` and `description`; `src/pages/registry.js` maps `key` to component.

Every link on the site is a plain `<a href="/our-story">`. `App.jsx` runs one delegated `click` listener that hands off to `resolveNavClick` in `src/lib/navigation.js`, which decides whether a click is an in-app navigation or something the browser should handle itself (external links, `target="_blank"`, `tel:`/`mailto:`, modified clicks, same-page `#anchor`s). In-app clicks `pushState` and swap the page component; `popstate` handles back/forward. Unknown paths render `NotFound`.

**Prerendering:** `scripts/prerender.mjs` renders every route to a static HTML file at build time (`dist/our-story.html`), so crawlers that don't execute JavaScript — which is all the AI crawlers — get the full page, its own `<title>`/description and a self-referencing canonical. It also writes `dist/sitemap.xml`. The client then hydrates that markup. Because pages are prerendered, **anything non-deterministic at render time is a hydration mismatch** — no `Date.now()`, `Math.random()`, `window`/`document` reads or locale formatting during render. `Footer.jsx` needs `suppressHydrationWarning` on the copyright year for exactly this reason.

`vite.config.js` sets `appType: 'mpa'` so `npm run preview` serves the prerendered file for each path instead of falling back to `index.html`; a small dev-only plugin restores the history fallback the dev server needs.

To add a page: add it to `ROUTES` in `src/data/routes.js` _and_ to `PAGES` in `src/pages/registry.js`, then add a nav link (`/your-route`) in `Header.jsx`/`Footer.jsx`. The build fails if those two maps disagree.

**Form submission is centralized in `App.jsx`**, not per-page. `handleSubmit(name)` is a single handler shared by every form (contact, order, workshop), keyed by a `name` string. It's passed down to the active page as a prop along with `sent`, `submitting`, and `submitError` (all keyed by that same `name`), so each page component just needs to call `handleSubmit('formName')` on its `<form onSubmit>` and read `sent['formName']` etc. for its own UI state — there's no local form state in the page components themselves.

Submission flow: reads `FormData` from the event, strips out the honeypot (`website`) and mount-timestamp (`ts`) fields into `meta` (used for spam detection, never sent as a visible field), converts any attached files to base64, and POSTs JSON to `/api/send-email`.

**Backend is a single Vercel serverless function**, `api/send-email.js`. It handles all three form types via a `form` field (`contact` | `order` | `workshop` → `FORMS` map for the email subject) and sends through Brevo's transactional email API. Env vars (`BREVO_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) are documented in `.env.example` and required — the handler 500s without them.

Spam mitigation in the API handler mirrors the frontend's honeypot/timestamp fields: a filled honeypot or a submission faster than `MIN_SUBMIT_MS` (1500ms) returns a fake success (`200 { ok: true }`) without calling Brevo, so bots can't detect they were blocked. Attachments are capped at 5, validated against an image-extension allowlist, and the whole request body is capped defensively below Vercel's 4.5MB limit.

**Styling** is global CSS classes in `src/index.css` (nav, buttons, cards, footer, animations) combined with per-component inline `style={{...}}` objects — there's no CSS-in-JS library or module scoping, so shared visual patterns live in `index.css` and one-off layout lives inline.

**Images** in `public/assets/` are referenced by literal string path (e.g. `/assets/logo-landscape.png`), not imported through Vite's module graph — they aren't processed at build time. `scripts/optimize-images.mjs` rewrites files in place at their existing path/filename for this reason: renaming or moving an asset requires manually updating every JSX reference to it.

**Deployment:** Vercel, auto-deploys `main` via GitHub integration. `vercel.json` pins the framework and sets immutable long-cache headers on `/assets/*`. `cleanUrls` serves `dist/our-story.html` at `/our-story` and redirects the `.html` form back to it; `trailingSlash: false` redirects `/our-story/` to `/our-story`. Between them each page has exactly one reachable URL, which is what the canonical tags assert. There are deliberately **no rewrites** — every route is a real file, and a catch-all SPA rewrite would swallow `dist/404.html` and turn every typo into a 200 serving the home page. The repo is public specifically so GitHub branch protection on `main` (required `build` status check, no force-push/delete) is available for free.

The canonical production domain is `https://the-little-apron-bakery.vercel.app`, set once as `SITE.origin` in `src/data/routes.js` and used for every canonical, `og:url` and sitemap entry.

**Moving to the custom domain:** `thelittleapron.co.nz` is the intended eventual home but is not attached to the Vercel project yet. Canonicalising to a domain that doesn't resolve would point Google at a host that doesn't serve the site, so the switch has to happen _after_ the domain is live, not before. When it is: change `SITE.origin`, then the three places the domain is written outside application code — `public/robots.txt`, the live-site link in `README.md`, and the canonical assertion in `.github/workflows/ci.yml`. Nothing else hardcodes it. Keep serving the old `.vercel.app` host afterwards so the redirect chain stays intact.

## Conventions

Things that are easy to break silently, and are expected of every change.

**Adding a page** — add it to `ROUTES` in `src/data/routes.js` with its own `title` and `description`, _and_ to `PAGES` in `src/pages/registry.js`. The prerender step fails the build if those disagree. Link to it with a real anchor (`<a href="/your-route">`); never a JS-only handler, because a crawler follows hrefs.

**Metadata** — every route carries a unique title and description in `routes.js`; the canonical, `og:*` and `twitter:*` tags are derived from it in `src/lib/head.js`. Don't add page metadata to `index.html` — everything between the `<!--head-start-->` markers is replaced per route at build time. Never hardcode the production origin; use `SITE.origin`.

**Keep these docs current.** A change that invalidates anything in `CLAUDE.md`, `README.md` or `.claude/skills/ship/SKILL.md` updates that file _in the same PR_, never as a follow-up. The things that go stale fastest: the route list, the npm scripts and build pipeline, the architecture notes above, and these conventions. All three files described hash routing long after it was replaced, and `SKILL.md` listed a `diy` route that never existed in `PAGES` — that is the failure this rule exists to prevent.

`main` never takes direct commits — see **How changes ship** at the top.

`The little apron/` at the repo root is the original design export (DC HTML, change-request uploads, story photos) — gitignored and not guaranteed to exist in a fresh clone. Don't treat it as a source of truth for current content; it's historical reference only.
