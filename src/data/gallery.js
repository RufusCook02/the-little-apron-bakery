// Every photo on /gallery, in display order, plus the curated subset the
// "Get inspired" slider shows on /sweet-stuff.
//
// Deliberately flat: no categories and no filter UI. Filtering would be client
// state, which means the prerendered HTML either ships every photo and hides
// most of them with JS — the opposite of what prerendering is for — or ships
// one category and hides the rest from crawlers entirely. If grouping is ever
// wanted, add real <h2> sections with every photo still in the DOM.
//
// Fields:
//   src      - literal /assets path, as everywhere else on this site. Must be
//              a key in image-manifest.json or `npm run check-images` fails.
//   alt      - content, not decoration: describe the cake. Written from the
//              actual photo, never guessed from the filename.
//   featured - optional, picks the photo for the /sweet-stuff slider.
//   focus    - optional `object-position`, for a subject that sits off-centre
//              and would lose its top to the 4:5 tile crop.

// NOTE: this is the existing cake photography, reused so the page is real
// rather than a placeholder. Cushla's dedicated gallery set replaces and
// extends it — adding a photo is a new entry here plus
// `npm run optimize-images`.
export const gallery = [
  {
    src: '/assets/cakes/floral.jpg',
    alt: 'Buttercream celebration cake crowned with fresh seasonal blooms',
    featured: true,
  },
  {
    src: '/assets/cakes/vintage-bow.jpg',
    alt: 'Vintage-style cake in soft piped shells, finished with a ribbon bow',
    featured: true,
  },
  {
    src: '/assets/cakes/drip.jpg',
    alt: 'Glossy ganache drip cake with toppers, chocolate balls and gold touches',
    featured: true,
  },
  {
    src: '/assets/cakes/baby-bean.jpg',
    alt: 'Honeycomb drip cake made for a baby shower',
    featured: true,
  },
  {
    src: '/assets/cakes/vintage-piped.jpg',
    alt: 'Classic vintage piping in pastel tones with a scalloped border and piped hearts',
    featured: true,
  },
  {
    src: '/assets/cakes/wedding.jpg',
    alt: 'Tiered wedding cake finished in smooth buttercream',
    featured: true,
  },
  {
    src: '/assets/cakes/chocolate.jpg',
    alt: 'Chocolate lover cake with ganache and rich chocolate icing',
    featured: true,
  },
  {
    src: '/assets/cakes/baby-gold.jpg',
    alt: 'Baby shower cake finished in soft tones with gold detailing',
    featured: true,
  },
  {
    src: '/assets/cakes/pink.jpg',
    alt: 'Little four-inch pink celebration cake',
  },
  {
    src: '/assets/cakes/canvas.jpg',
    alt: 'Smooth buttercream canvas cake, left plain and ready to top',
  },
]

// The slider on /sweet-stuff. An explicit flag rather than `gallery.slice(0, n)`
// (the `sigPreview` pattern in cakes.js) because the strongest photos are a
// curation decision, not whichever ones happen to come first.
export const inspired = gallery.filter((photo) => photo.featured)
