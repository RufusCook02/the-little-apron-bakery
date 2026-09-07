import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `appType: 'mpa'` below is what makes `npm run preview` serve the prerendered
// dist/our-story/index.html for /our-story. Under the default 'spa' it instead
// falls back to dist/index.html for every extensionless path, so the preview
// server hands the *home* page markup to a page component that renders
// something else — which looks exactly like a hydration bug and isn't one.
//
// The dev server has no prerendered files, so it still needs that fallback.
function devHistoryFallback() {
  return {
    name: 'dev-history-fallback',
    apply: 'serve',
    configureServer(server) {
      // Returned function runs after Vite's own middlewares, so /@vite/*,
      // /src/* and real files are all resolved before we rewrite anything.
      return () => {
        server.middlewares.use((req, res, next) => {
          if (req.method !== 'GET' && req.method !== 'HEAD') return next()
          if (!(req.headers.accept || '').includes('text/html')) return next()

          const pathname = (req.url || '/').split('?')[0]
          // Anything with an extension is an asset request, not a route.
          if (pathname.includes('.')) return next()

          req.url = '/index.html'
          next()
        })
      }
    },
  }
}

export default defineConfig(({ isSsrBuild }) => ({
  appType: 'mpa',
  plugins: [react(), devHistoryFallback()],
  // The SSR bundle is a build-time artefact only — it never needs a copy of
  // public/, and dist-ssr/ is not the deploy output.
  build: isSsrBuild ? { copyPublicDir: false } : {},
}))
