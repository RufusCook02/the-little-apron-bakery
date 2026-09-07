---
name: ship
description: Ship a completed change to this site as a reviewable PR — branch, commit, screenshot the affected routes at mobile/iPad/desktop, open a PR with the Vercel preview link, and wait for CI. Use after implementing any change to the bakery site, and when asked to "ship this", "open a PR", "make a PR", or "get this ready for review".
---

# Shipping a change

`main` auto-deploys to production via Vercel. Every change is reviewed as a PR and merged
by a human — you open it, you never merge it.

## 1. Branch before you edit

Short kebab-case topic branch off current `main`:

```bash
git checkout main && git pull && git checkout -b squiggle-divider
```

If you've already made edits on `main`, `git checkout -b <name>` carries them across —
do that rather than starting over. A PreToolUse hook blocks pushes to `main`, so if you
see that denial, you're on the wrong branch.

## 2. Commit

Run the change through the normal quality gates first — `npm run lint` and
`npm run format:check` — because CI runs both plus `npm run build`, and a red PR wastes a
review round-trip. The `.githooks/pre-commit` hook runs `lint-staged` on commit.

Stage the specific files you changed, never `git add -A`. Write a message that says what
changed and why; note explicitly when a shared component change ripples to other callers.

## 3. Screenshots — only when they show something

**Screenshot when** the change renders: anything under `src/` that alters layout, colour,
copy, spacing, or component structure.

**Skip screenshots when** the change can't be seen: `api/`, `.github/`, `scripts/`,
`eslint`/`prettier`/`vite` config, `CLAUDE.md`, or docs. Say in the PR that there's nothing
visual to show — don't shoot an unrelated homepage to fill space. Docs being on this list
means "no screenshot needed", **not** "skip the doc update" — see step 4.

For any change that alters layout, confirm at 390px that the page doesn't scroll
sideways (`document.documentElement.scrollWidth === clientWidth`) before opening the PR.

### Which routes

Route keys are defined in [src/data/routes.js](src/data/routes.js) — that file is the
source of truth, so read it rather than trusting a list here. Map each changed page
component to its key (via `PAGES` in [src/pages/registry.js](src/pages/registry.js)) and
shoot **every** affected route. `not-found` is also shootable even though it isn't in
`ROUTES`. A change to a shared component (`Header`, `Footer`, `WaveDivider`) affects every
page — shoot `home` plus one other page that uses it, and say in the PR that the rest
share the same component.

### Capturing

Start the dev server with the `dev` config via the preview tool (never `npm run dev` in a
raw shell), then:

```bash
npm run screenshot -- --route home
```

An unknown route key now throws with the list of valid ones, rather than silently
capturing the home page.

Add `--selector "svg.wave-divider"` to frame a specific element in context instead of
capturing the full page — better for a small change on a long page. Output lands in
`.screenshots/` (gitignored).

To shoot the **built** output rather than the dev server — the only way to see prerendered
HTML, and worth doing for anything touching routing, metadata or the build — start the
`preview` config instead and pass `--url http://localhost:4173`.

Send the images to the user with `SendUserFile` in the same turn you open the PR. Don't
rely on the PR carrying them — it won't.

## 4. Update the docs, then open the PR

Before pushing, check whether the change invalidates anything in
[CLAUDE.md](CLAUDE.md), [README.md](README.md) or this skill file — route lists, npm
scripts, the build pipeline, architecture notes, the conventions section. If it does,
update it **on the same branch**. Docs that describe how the code used to work are worse
than no docs, and a follow-up PR to fix them never gets written.

```bash
git push -u origin <branch>
gh pr create --base main --title "..." --body "..."
```

Body structure:

- **What changed** and why, in a couple of sentences.
- **Preview** — note that Vercel posts a preview URL as a PR comment within a minute or
  two; that's the interactive way to review it.
- **Screenshots** — which routes and viewports you checked (390 / 820 / 1440), and that
  the images are in the chat.
- **Notes** — anything deliberately left out, any side effect worth knowing (e.g. a shared
  component change altering spacing elsewhere).

## 5. Wait for CI, then hand back

```bash
gh run list --branch <branch> --limit 1
```

Watch it to completion. Report the result plainly — if `build` fails, say so with the
error and fix it on the branch.

Then **stop**. Give the user the PR URL and let them merge. Do not merge, do not enable
auto-merge, do not push to `main` to "save a step".
