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
visual to show — don't shoot an unrelated homepage to fill space.

### Which routes

Routes are the hash-route keys of `PAGES` in [src/App.jsx](src/App.jsx) — `home`,
`our-story`, `sweet-stuff`, `signature`, `cupcakes`, `diy`, `workshops`, `order`,
`contact`, `blog`, `faqs`, `terms`, `cake-care`. Map each changed page component to its
key and shoot **every** affected route. A change to a shared component
(`Header`, `Footer`, `WaveDivider`) affects every page — shoot `home` plus one other page
that uses it, and say in the PR that the rest share the same component.

### Capturing

Start the dev server with the `dev` config via the preview tool (never `npm run dev` in a
raw shell), then:

```bash
npm run screenshot -- --route home
```

Add `--selector "svg.wave-divider"` to frame a specific element in context instead of
capturing the full page — better for a small change on a long page. Output lands in
`.screenshots/` (gitignored).

Send the images to the user with `SendUserFile` in the same turn you open the PR. Don't
rely on the PR carrying them — it won't.

## 4. Open the PR

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
