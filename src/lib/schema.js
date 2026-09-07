// schema.org JSON-LD, baked into the prerendered head by src/lib/head.js.
//
// Ground rule: everything here comes from facts already published on the site.
// No invented address, opening hours, ratings or reviews, and nothing marked
// `unconfirmed` in the source data — structured data is a stronger claim than
// body copy, and a wrong one is worse than a missing one.

import { SITE, ROUTES, ROUTE_BY_KEY } from '../data/routes.js'
import { SOCIALS } from '../data/socials.js'
import { sig } from '../data/cakes.js'
import { faqs } from '../data/faqs.jsx'

const abs = (path) => `${SITE.origin}${path}`
const ORG_ID = `${SITE.origin}/#organization`

// Deliberately Organization, not LocalBusiness/Bakery. LocalBusiness needs a
// street address and opening hours to be eligible for a local rich result, and
// neither exists — the site says only "based in Waikato". Upgrading the @type
// and adding `address.streetAddress` + `openingHoursSpecification` is the only
// change needed if Cushla is ever happy to publish them.
function organization() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.origin,
    logo: abs('/assets/logo-landscape.png'),
    description:
      'Handmade custom cakes, cupcakes and cake decorating workshops in Hamilton, Waikato, New Zealand.',
    email: 'hello@thelittleapron.co.nz',
    telephone: '+64273470648',
    founder: { '@type': 'Person', name: 'Cushla' },
    // City and region are stated on the site; street address is not, so it is
    // omitted rather than guessed.
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hamilton',
      addressRegion: 'Waikato',
      addressCountry: 'NZ',
    },
    areaServed: { '@type': 'City', name: 'Hamilton' },
    sameAs: [SOCIALS.instagram.url, SOCIALS.facebook.url, SOCIALS.tiktok.url],
  }
}

function website() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.origin}/#website`,
    url: SITE.origin,
    name: SITE.name,
    inLanguage: 'en-NZ',
    publisher: { '@id': ORG_ID },
  }
}

// Home > Sweet Stuff > Signature Cakes, following the site's real structure via
// the optional `parent` key in routes.js.
function breadcrumbs(route) {
  const trail = []
  let current = route
  while (current && current.key !== 'home') {
    trail.unshift(current)
    current = current.parent ? ROUTE_BY_KEY[current.parent] : null
  }
  if (!trail.length) return null

  const items = [ROUTE_BY_KEY.home, ...trail]
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: r.label,
      item: abs(r.path),
    })),
  }
}

// '4" 4 layered — $110' -> 110. 'Priced on enquiry' -> nothing.
function pricesOf(cake) {
  return cake.prices
    .map((tier) => /\$(\d+(?:\.\d+)?)/.exec(tier))
    .filter(Boolean)
    .map((m) => Number(m[1]))
}

function cakeProducts() {
  return sig.map((cake) => {
    const prices = pricesOf(cake)
    return {
      '@type': 'Product',
      name: cake.name,
      description: cake.blurb,
      image: abs(cake.img),
      brand: { '@type': 'Brand', name: SITE.name },
      // Baby Bean is priced on enquiry, so it gets no offers block rather than
      // a made-up price.
      ...(prices.length
        ? {
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'NZD',
              lowPrice: Math.min(...prices),
              // Only when there genuinely is a range. Mini Me lists a single
              // "from $50" tier, and low === high would assert a fixed price.
              ...(Math.max(...prices) > Math.min(...prices)
                ? { highPrice: Math.max(...prices) }
                : {}),
              offerCount: prices.length,
              availability: 'https://schema.org/InStock',
              seller: { '@id': ORG_ID },
            },
          }
        : {}),
    }
  })
}

function faqPage() {
  const answerable = faqs.filter((f) => !f.unconfirmed)
  return {
    '@type': 'FAQPage',
    mainEntity: answerable.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.schemaAnswer ?? f.a,
      },
    })),
  }
}

// Returns the JSON-LD graph for a route, or null if there's nothing to emit.
export function schemaFor(route) {
  const graph = [organization(), website()]

  const crumbs = breadcrumbs(route)
  if (crumbs) graph.push(crumbs)

  if (route.key === 'signature') graph.push(...cakeProducts())
  if (route.key === 'faqs') graph.push(faqPage())

  return { '@context': 'https://schema.org', '@graph': graph }
}

// A JSON-LD payload is inert data, but "</script>" inside it would still end
// the script element early — escaping "<" is what prevents that.
export function schemaJson(route) {
  return JSON.stringify(schemaFor(route)).replace(/</g, '\\u003c')
}

// Every indexable route carries the graph; the 404 doesn't need one.
export function hasSchema(route) {
  return !route.noindex && ROUTES.some((r) => r.key === route.key)
}
