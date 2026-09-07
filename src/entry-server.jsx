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

// Re-exported so the prerender script can check the page map against ROUTES.
export { PAGES } from './pages/registry.js'
