import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { inject } from '@vercel/analytics'
import './index.css'
import App from './App.jsx'
import { ROUTE_BY_KEY } from './data/routes.js'

inject()

// The site used to live on #hash routes. Send old bookmarks and social links to
// the real path before the first render. Only from '/', so a genuine in-page
// anchor like /signature#budget is never touched.
let redirected = false
const legacy = window.location.hash.replace(/^#\/?/, '').trim()
if (
  window.location.pathname === '/' &&
  legacy !== 'home' &&
  ROUTE_BY_KEY[legacy]
) {
  window.history.replaceState({}, '', ROUTE_BY_KEY[legacy].path)
  redirected = true
}

const container = document.getElementById('root')
const tree = (
  <StrictMode>
    <App initialPath={window.location.pathname} />
  </StrictMode>
)

// A prerendered page has real markup inside #root; `npm run dev` serves the
// bare template, where the only child is the <!--app--> placeholder comment —
// hence firstElementChild rather than hasChildNodes(). After a legacy-hash
// redirect the markup is for the wrong page, so throw it away rather than
// forcing React through a whole-tree hydration mismatch.
if (container.firstElementChild && !redirected) {
  hydrateRoot(container, tree)
} else {
  container.innerHTML = ''
  createRoot(container).render(tree)
}
