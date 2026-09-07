// Prerender entry point. Built by `npm run build:ssr` into dist-ssr/, then
// imported by scripts/prerender.mjs. Never shipped to the browser.

// This file is a Node module, never part of the client fast-refresh graph, so
// exporting non-components from it is fine.
/* eslint-disable react-refresh/only-export-components */

import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// No StrictMode here: it emits no DOM, so its presence on the server cannot
// affect what the client hydrates against.
export function render(path) {
  return renderToString(<App initialPath={path} />)
}

// Everything scripts/prerender.mjs needs comes through this bundle rather than
// being imported from src/ directly. Vite compiles it, so the prerender script
// doesn't have to care that some modules under src/ contain JSX — which plain
// Node cannot parse.
export { PAGES } from './pages/registry.js'
export { ROUTES, NOT_FOUND, SITE } from './data/routes.js'
export { headHtml } from './lib/head.js'
export { faqs } from './data/faqs.jsx'
