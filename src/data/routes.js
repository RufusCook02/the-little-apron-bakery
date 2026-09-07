// Single source of truth for every page on the site.
//
// Four things read this file: the prerender script (which emits one static HTML
// file per entry), the sitemap writer, the head builder in src/lib/head.js, and
// App.jsx. `scripts/prerender.mjs` fails the build if these keys ever drift
// apart from the PAGES map in src/pages/registry.js.
//
// `key` deliberately matches the old hash-route names, so
// `npm run screenshot -- --route signature` keeps working.

// `origin` is the canonical production domain. It is the ONLY place the domain
// is written in application code — every canonical, og:url and sitemap entry
// derives from it, so moving the site is a one-line change here plus the
// matching URLs in public/robots.txt, README.md and the CI assertion.
//
// When thelittleapron.co.nz is attached to the Vercel project as the
// production domain, change this to 'https://thelittleapron.co.nz'. Pointing
// it there before the domain resolves would canonicalise the site to a host
// that doesn't serve it.
export const SITE = {
  origin: 'https://the-little-apron-bakery.vercel.app',
  name: 'The Little Apron',
  defaultImage: '/assets/logo-landscape.png',
}

export const ROUTES = [
  {
    key: 'home',
    path: '/',
    title: 'The Little Apron — Handmade Cakes, Hamilton NZ',
    description:
      'Handmade custom cakes, cupcakes and hands-on decorating workshops from The Little Apron in Hamilton, Waikato. Order your celebration cake today.',
  },
  {
    key: 'our-story',
    path: '/our-story',
    title: 'Our Story — The Little Apron',
    description:
      'How Cushla went from a first stand mixer to baking custom cakes full time in Hamilton. The story behind The Little Apron, in her own words.',
  },
  {
    key: 'sweet-stuff',
    path: '/sweet-stuff',
    title: 'Custom Cakes, Cupcakes & More — The Little Apron',
    description:
      'Everything The Little Apron makes: signature celebration cakes, cupcakes by the box, and cake decorating workshops in Hamilton, Waikato.',
  },
  {
    key: 'signature',
    path: '/signature',
    title: 'Signature Cakes & Pricing — The Little Apron',
    description:
      'Nine signature cake designs with sizes and pricing — floral, drip, vintage bow, hearts and buttercream, canvas and more. Handmade in Hamilton, NZ.',
  },
  {
    key: 'cupcakes',
    path: '/cupcakes',
    title: 'Cupcakes by the Box — The Little Apron',
    description:
      'Handmade cupcakes in boxes of 6, 12 or 24, with optional fillings. Perfect for birthdays, work shouts and celebrations in Hamilton, Waikato.',
  },
  {
    key: 'workshops',
    path: '/workshops',
    title: 'Cake Decorating Workshops — The Little Apron',
    description:
      'Beginner-friendly, hands-on cake decorating workshops in Hamilton, NZ. Learn to layer, fill and finish a cake you take home. Register your interest.',
  },
  {
    key: 'order',
    path: '/order',
    title: 'Order a Custom Cake — The Little Apron',
    description:
      'Tell us about your cake — date, size, flavours and inspiration photos — and Cushla will come back to you with a quote. Hamilton, Waikato.',
  },
  {
    key: 'contact',
    path: '/contact',
    title: 'Contact — The Little Apron',
    description:
      'Get in touch with The Little Apron in Hamilton, Waikato. Send a message, phone 027 347 0648, or email hello@thelittleapron.co.nz.',
  },
  {
    key: 'blog',
    path: '/blog',
    title: 'Stories from the Kitchen — The Little Apron',
    description:
      'Notes, bakes and behind-the-scenes from The Little Apron kitchen in Hamilton, New Zealand.',
  },
  {
    key: 'faqs',
    path: '/faqs',
    title: 'Frequently Asked Questions — The Little Apron',
    description:
      'Lead times, flavours, collection, allergens and how ordering works — the questions we are asked most about custom cakes at The Little Apron.',
  },
  {
    key: 'terms',
    path: '/terms',
    title: 'Terms & Conditions — The Little Apron',
    description:
      'Ordering, deposits, lead times, changes and cancellations, collection, and allergen information for cakes from The Little Apron.',
  },
  {
    key: 'cake-care',
    path: '/cake-care',
    title: 'Cake Care — The Little Apron',
    description:
      'How to store, handle, cut and serve your cake so it tastes as good at the table as it did leaving our kitchen.',
  },
]

// Deliberately not in ROUTES: this keeps it out of the sitemap and out of any
// nav built by iterating routes.
export const NOT_FOUND = {
  key: 'not-found',
  path: '/404',
  title: 'Page not found — The Little Apron',
  description: 'That page has moved or never existed.',
  noindex: true,
}

export const ROUTE_BY_KEY = Object.fromEntries(ROUTES.map((r) => [r.key, r]))
export const ROUTE_BY_PATH = Object.fromEntries(ROUTES.map((r) => [r.path, r]))

// '/Our-Story/' -> '/our-story'. '/' stays '/'.
export function normalisePath(pathname) {
  let p = pathname || '/'
  try {
    p = decodeURIComponent(p)
  } catch {
    // A malformed percent-escape isn't a route either way — fall through and
    // let the caller's ROUTE_BY_PATH lookup miss into the 404.
  }
  p = p.toLowerCase()
  if (p.length > 1) p = p.replace(/\/+$/, '')
  return p || '/'
}
