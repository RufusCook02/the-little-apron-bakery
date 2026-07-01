# Startup Design System

A design system for **Startup**, a multi-tenant SaaS **starter app** maintained by **Wise Group**. Startup is meant to stand up a new product quickly: it ships **multiple selectable visual styles** so you can pick one outright, or start from the closest match and customize. This repository captures Startup's visual foundations, tokens, assets, and high-fidelity UI-kit recreations so design agents can produce on-brand interfaces, mocks, and production-ready markup.

> This system currently documents the **default "classic" style** in depth (the active default skin: dark sidenav, teal primary). The starter's other built-in skins — saas, modern, minimal, flat, material, galaxy, luxe, retro, neon, pixel — are alternate themes selectable at runtime; see *Selectable styles* below.

---

## 1. Product context

**Startup** is a multi-tenant B2B SaaS **starter application** — a scaffold for quickly standing up a new product. The frontend is a React 19 + TypeScript + Vite app built on top of the **INSPINIA** Bootstrap 5 admin template (the bundled marketing pages and the large `views/template/*` tree are INSPINIA's own demo content — not part of Startup's own product surface).

The **real, built product surface** lives under `src/views/app/*` and `src/views/admin/*`:

- **Auth & onboarding** — Kinde-hosted auth; a landing/login screen and an "Create your organization" onboarding flow (tenant registration with name + handle).
- **Dashboard** — tenant overview: tenant banner, user stat cards (total / active / suspended), quick-action tiles.
- **Todos** — full CRUD task manager (status + priority badges, due dates, CSV/XLSX import & export, quick-stats sidebar). The reference feature of the scaffold.
- **Chat** — real-time 1:1 messaging (SignalR), user search, presence dots, message bubbles.
- **Users** — tenant user management (list, create, detail, claims, permissions).
- **Notifications** — in-app notification feed + logs; topbar bell with unread badge.
- **Settings / Setup** — general tenant settings, notification logs.
- **Admin** — cross-tenant admin area: dashboard, tenants, users, feature flags, notifications.

**Selectable styles:** the starter is theme-driven. The app reads a `data-skin` attribute and ships **11 built-in skins** (`classic` — the default — plus `saas`, `modern`, `minimal`, `flat`, `material`, `galaxy`, `luxe`, `retro`, `neon`, `pixel`), each defined in `frontend/src/assets/scss/config/_theme-*.scss` with its own palette and font. Sidenav color (dark / light / gray / gradient / image), topbar color, and light/dark mode are independently switchable via the in-app customizer. The intent is that a new product picks a skin (or the closest one) and customizes from there — so treat tokens as *defaults of the classic skin*, not immutable brand law.

**Example domain:** the generated API layer (`src/network/schemas/*`) carries an extensive example business domain (orders, costing, bill-of-materials, production, SKUs, etc.) used to exercise the scaffold. It's sample/seed surface for the starter, not a fixed product direction — ignore it unless a specific build calls for it.

The product is **Kinde**-authenticated, **TanStack Query**-driven, **React-Bootstrap** + custom INSPINIA SCSS for UI, **Tabler Icons** (via `react-icons/tb`) for iconography.

### Sources
- **Codebase:** `frontend/` (mounted, read-only) — React/TS app. Brand truth.
  - Theme tokens: `frontend/src/assets/scss/_variables.scss`, `…/config/_root.scss`, `…/config/_theme-classic.scss` (default skin).
  - App shell: `frontend/src/layouts/components/MainSidenav.tsx`, `…/app-topbar/index.tsx`.
  - Product screens: `frontend/src/views/app/*`, `frontend/src/views/admin/*`.
- **Brand assets:** `frontend/src/assets/images/` — logos, footprint favicon, dashboard/hero imagery, user avatars.
- No Figma file or slide decks were provided. No formal brand/tone guide exists in-repo; the Content & Visual sections below are inferred from product copy and the compiled theme.

---

## 2. Content fundamentals

How Startup writes copy (observed across dashboard, todos, chat, onboarding, settings):

- **Voice:** plain, functional, encouraging. Product-led SaaS tone — clear over clever. No jargon, no exclamation-spam (one friendly "!" max, e.g. *"Welcome back, …!"*, *"Add your first todo to get started!"*).
- **Person:** addresses the user as **"you / your"** ("Manage your tasks and stay organized", "Configure your preferences"). System/brand refers to itself implicitly, never "we" in UI chrome.
- **Casing:** **Title Case** for primary buttons and nav-level page titles where short (e.g. *Add Todo*, *Manage Users*, *Create Organization*), **Sentence case** for descriptions, helper text, table headers, and longer labels. Section headings use sentence case ("Quick Actions" is the exception — Title Case for card titles).
- **Buttons** are verb-first and terse: *Add Todo, Create Todo, Update Todo, Import, Export, Sign In, Sign Up, Create Organization, View all notifications*.
- **Empty states** are warm + directive: *"No todos yet — Add your first todo to get started!"*, *"Select a user to start chatting"*, *"No messages yet. Send the first message!"*.
- **Helper / micro-copy** is concise and instructional: *"Your organization will be accessible as **acme-corp**"*, *"Required column: Title. Optional: Description, Priority…"*.
- **Status language:** badge labels are single words (Pending, Completed, Low, Medium, High, Critical). Counts are spelled inline ("5 new this month", "Total Todos").
- **Emoji:** **none** anywhere in the product. Do not introduce emoji. Meaning is carried by Tabler icons + colored badges.
- **Punctuation:** ellipses for in-progress/placeholder states ("Creating…", "Loading…", "Search… (Ctrl+K)").

**Vibe:** competent, calm, operational. A tool for getting work done — not a consumer app. Favor clarity and density over marketing flourish.

---

## 3. Visual foundations

### Color
- **Primary is teal `#1ab394`** — the action/brand-interaction color (buttons, links, active nav, focus, progress). This is INSPINIA's classic-skin primary and Startup's operative accent.
- **Brand marks** use **blue `#2f7fd1`** (Startup footprint + Wise Group wordmark) with a **green `#6cbf3f`** accent dot. Blue is brand-identity; teal is product-interaction. Don't confuse the two — UI actions are teal.
- Full semantic set: secondary blue `#1c84c6`, success green `#0acf97`, info cyan `#23c6c8`, warning amber `#f8ac59`, danger red `#ed5565`, purple `#7b70ef`.
- **Neutrals** run cool-gray `#f6f7fb → #313a46`. Body canvas is `#f1f2f7`, surfaces are pure white, text is a soft near-black `#4c4c5c` (not `#000`).
- Subtle fills use ~85% tints of the semantic color (`bg-*-subtle`), e.g. teal subtle `#e8f7f4`. Status badges pair a subtle bg with the saturated text color.

### Type
- **Inter** everywhere (variable font, weights 300–700). Headings are **semibold 600**, body **400**, emphasis **500**. Mono is the system stack (SFMono/Menlo/Consolas).
- Scale: h1 40 / h2 32 / h3 28 / h4 24 / h5 20 / h6 18; body 16; small 14; fine 13/12. Line-height 1.5 body, ~1.3 headings.
- Page titles in-app are typically `h3` (28px) with a muted one-line subtitle beneath.

### Backgrounds
- Predominantly **flat solid fills** — `#f1f2f7` canvas, white cards. **No gradients** in the product UI (gradient sidenav/topbar exist only as optional INSPINIA skins, not the default). 
- The marketing/auth surfaces use **photographic imagery** (hero dashboard screenshot `dashboard-1.png`, auth split-image `auth.jpg`, CTA `landing-cta.jpg`) and a faint dotted `bg-pattern.png` halo behind the hero.
- Avoid inventing decorative gradients, blobs, or textures — Startup's surfaces are clean and matte.

### Cards
- White background, **1px `#e7e9eb` border**, radius **`.3rem` (~5px)**, very soft resting shadow `0 1px 4px rgba(130,143,163,.15)` (often shadow is `none` and the border carries definition). Generous internal padding (~1.25–1.5rem). Card headers separated by a hairline border.

### Borders & radius
- Hairline 1px borders in `#e7e9eb` / `#eef2f7` define most structure. Radii are **small and restrained**: 4px (sm) / ~5px (default) / 6px (lg). Reserve `1rem` (xl) for large feature/CTA images and `50rem` pills for avatars, status dots, and badge chips.

### Elevation / shadows
- Three steps: resting card `0 1px 4px rgba(130,143,163,.15)`; raised (dropdowns, popovers, modals, hero image) `0 .25rem 1rem rgba(76,76,92,.20)`; inset for pressed/inputs. No heavy/colored drop shadows.

### Spacing & layout
- Base spacer **1.25rem (20px)**; scale 5/10/20/30/60px. 12-column Bootstrap grid, gutter 1.25rem.
- **Fixed app shell:** sidenav **235px** (collapses to 75px condensed / offcanvas on mobile), topbar **65px** sticky. Default sidenav is **dark `#23303c`** with light-gray idle items (`#8495ab`) and lighter active text; topbar is **white**. Content scrolls within the remaining canvas.

### Buttons & controls
- Solid fills for semantic buttons (teal primary by default), `outline-*` variants for secondary actions, ghost/`light` for tertiary. Radius matches cards (~5px). Padding ~`.45rem 1.1rem`. Icon+label buttons place a Tabler icon left of the label with a small gap.
- Inputs: white, 1px `#e7e9eb` border, ~5px radius, no heavy focus ring (focus ring width is 0 in theme — focus is shown via subtle border/shadow). Search field carries a leading icon.

### Hover / press / motion
- **Hover:** links & nav items shift to primary teal; nav hover bg becomes teal-subtle `#e8f7f4` (or `#2f3742` on the dark sidenav). Buttons darken ~15%. Quick-action tiles gain a shadow on hover.
- **Active/selected:** teal text + teal-subtle background; dark sidenav active item uses `#1c262f` bg with light text.
- **Motion:** quiet and quick — `all .25s ease-in-out` is the base transition (used for sidenav width, hovers). Collapses animate height `.35s ease`. No bounces, no springy/playful easing. Fades are linear and short (`.15s`).

### Transparency & blur
- Used sparingly: subtle color fills via low-alpha (`bg-opacity` utilities), the modal/offcanvas backdrop is a translucent scrim. No glassmorphism/backdrop-blur in the default product.

### Imagery vibe
- Real product screenshots and stock photography, **warm-neutral and bright**, no heavy filters or duotone. Avatars are full-color circular crops. Imagery is functional (show the product / the person), not moody.

---

## 4. Iconography

- **Primary icon set: [Tabler Icons](https://tabler.io/icons).** The app imports them via `react-icons/tb` (`TbLayoutDashboard`, `TbCheckupList`, `TbMessageDots`, `TbBell`, `TbUsers`, `TbSettings`, `TbShieldLock`, `TbPlus`, `TbEdit`, `TbTrash`, `TbEye`, `TbDownload`, `TbUpload`, `TbSend2`, `TbChevronDown`, etc.). Tabler is a 24×24, **1.75–2px stroke, outline** set with rounded joins — clean and consistent.
- **Secondary:** a few **Lucide** icons (`react-icons/lu`) appear in chrome (`LuSearch`, `LuMoon`, `LuSun`, `LuMessageSquare`). Lucide shares Tabler's stroke/outline language, so they mix cleanly. `@iconify/react` is also a dependency for ad-hoc glyphs.
- **No icon font of Startup's own**, no custom SVG sprite, **no emoji**, no unicode-glyph icons. Color comes from `currentColor` (icons inherit text color; semantic icons take the matching theme color).
- **For artifacts in this system:** load **Tabler Icons from CDN** — e.g. the web-font `https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3/dist/tabler-icons.min.css` (use `<i class="ti ti-…"></i>`) — or inline Tabler SVGs. Match the 1.75px outline weight. Do **not** hand-draw icons or substitute a filled/duotone set. If a needed glyph is missing from Tabler, fall back to Lucide (same family) and note it.

### Brand marks (in `assets/`)
- `startup_favicon.png` / `startup_favicon_192.png` — the **footprint mark** (blue toes/heel with a green accent dot). Brand-neutral; use it as the standalone app/favicon icon and alongside the "Startup" wordmark.
- `logo-sm.png` — small footprint mark for the collapsed sidenav.
- `logo-black.png` — **"wisegroup."** wordmark, blue + gray (the parent company), for light backgrounds (157×39).
- **Wordmark:** the product wordmark is rendered as the text **"Startup"** (Inter, 700) paired with the footprint mark — see the Logos card and the UI-kit sidenav. There is no production "Startup" wordmark image yet.

> ⚠️ **Stale asset:** `logo-white.png` / `logo.png` are leftover from the template's previous "STRIDE" identity — their pixels still read *STRIDE*, so they are **not referenced** anywhere in this system. Delete them or replace with a real "Startup" wordmark export when one exists.

> Convention: **Startup** is the product (rendered as text + footprint mark); **Wise Group** is the parent company (`logo-black.png`). Use the footprint mark as the standalone app/favicon icon.

---

## 5. Repository index / manifest

Root files:
- **`README.md`** — this file: product context, content & visual foundations, iconography, manifest.
- **`colors_and_type.css`** — CSS custom properties for all color, type, spacing, radius, shadow, and layout tokens, plus semantic element defaults (scope with `.startup`). Import this into any artifact.
- **`SKILL.md`** — Agent-Skill front-matter wrapper so this system can be used as a downloadable skill.

Folders:
- **`assets/`** — brand marks (logos, footprint favicons), product imagery (`dashboard-1.png`, `auth.jpg`, `landing-cta.jpg`, `sidenav-bg.jpg`, `bg-pattern.png`), and `users/` avatars.
- **`preview/`** — small HTML "spec cards" that populate the Design System tab (colors, type, spacing, radius/shadow, components, brand).
- **`ui_kits/startup-app/`** — high-fidelity, interactive recreation of the Startup application shell and core screens (sidenav, topbar, dashboard, todos, chat, login). See its own `README.md`.

### How to use
1. Link `colors_and_type.css` and add `class="startup"` to `<body>` (or a wrapper).
2. Pull Tabler Icons from CDN for iconography.
3. For full screens, copy components from `ui_kits/startup-app/` and assemble. They are cosmetic recreations — visually faithful, not production logic.
4. Honor the content & visual rules above: teal for actions, blue for brand marks, no emoji, flat surfaces, restrained radii, quiet motion.

---

## Caveats / substitutions
- **Font:** the default "classic" skin loads **Open Sans** alongside the globally-loaded **Inter**; Inter is the base family and is used by every modern skin, so this system standardizes on **Inter** (Google Fonts, exact family used in-app — no substitution).
- **Icons:** sourced from CDN Tabler/Lucide to mirror the `react-icons` sets used in code (same glyphs, same stroke). Flagged here for transparency.
- No Figma, brand guide, or decks were provided — content/visual guidance is inferred from code + compiled theme + product copy.
