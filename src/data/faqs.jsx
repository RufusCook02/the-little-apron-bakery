// FAQ content, shared by the FAQs page and the FAQPage structured data.
//
// `a` is what renders (sometimes JSX, because a few answers link out).
// `schemaAnswer` is the plain-text equivalent for JSON-LD, needed wherever `a`
// isn't a bare string.
//
// `unconfirmed: true` marks an answer still waiting on confirmation from
// Cushla. Those render on the page but are deliberately kept out of the
// structured data — a JSON-LD claim carries more weight than body copy, and we
// shouldn't be asserting unverified payment or lead-time terms to search
// engines.

const linkStyle = {
  color: '#4f6f66',
  fontWeight: 600,
  textDecoration: 'underline',
}

export const faqs = [
  {
    q: 'How do I order a custom cake?',
    a: (
      <>
        Fill out our{' '}
        <a href="/order" style={linkStyle}>
          enquiry form
        </a>{' '}
        with your date, size, flavour, and any design ideas or inspiration
        pictures. We'll come back to you to confirm pricing and availability,
        then a deposit secures your booking.
      </>
    ),
    schemaAnswer:
      "Fill out our enquiry form with your date, size, flavour, and any design ideas or inspiration pictures. We'll come back to you to confirm pricing and availability, then a deposit secures your booking.",
  },
  {
    // Placeholder: confirm actual lead times with Cushla before publishing
    unconfirmed: true,
    q: 'How far in advance should I order?',
    a: "We suggest at least 2 weeks notice for most celebration cakes, and more for weddings or large events. If your date is coming up fast, enquire anyway — we'll let you know if we can help.",
  },
  {
    q: 'What sizes and servings do you offer?',
    a: '4 inch (around 8 servings), 6 inch (around 28 servings), 8 inch (around 56 servings), and 10 inch (around 84 servings).',
  },
  {
    q: 'What flavours are available?',
    a: "Vanilla, chocolate, lemon, red velvet, confetti, carrot, banana, and raspberry white chocolate. Can't decide? We're happy to help you pick, or talk through a custom flavour combo.",
  },
  {
    q: 'Can you cater for allergies or dietary requirements?',
    a: "Let us know in your enquiry and we'll talk through what's possible. We can't guarantee an allergen-free cake, as our kitchen isn't nut- or gluten-free, but we'll do our best to accommodate where we can.",
  },
  {
    q: 'Do you deliver, or is it pickup only?',
    a: 'Cakes are collected from us in Hamilton on your chosen date.',
  },
  {
    // Placeholder: confirm actual deposit % and payment methods with Cushla before publishing
    unconfirmed: true,
    q: 'How do I pay, and is a deposit required?',
    a: 'A deposit of 50% confirms your booking, with the balance due before collection. We accept bank transfer or eftpos on collection.',
  },
  {
    q: 'Can I change my order after booking?',
    a: "Yes, where possible — get in touch as soon as you know what you'd like to change. Changes close to your collection date may be limited depending on the request.",
  },
  {
    q: 'What if I need to cancel?',
    a: (
      <>
        Contact us as early as you can. See our{' '}
        <a href="/terms" style={linkStyle}>
          Terms &amp; Conditions
        </a>{' '}
        for our cancellation policy.
      </>
    ),
    schemaAnswer:
      'Contact us as early as you can. See our Terms & Conditions for our cancellation policy.',
  },
  {
    q: 'Do you run cake decorating workshops?',
    a: (
      <>
        Workshops are launching soon for both kids and adults —{' '}
        <a href="/workshops" style={linkStyle}>
          register your interest
        </a>{' '}
        to be first to know when dates open.
      </>
    ),
    schemaAnswer:
      'Workshops are launching soon for both kids and adults — register your interest to be first to know when dates open.',
  },
]
