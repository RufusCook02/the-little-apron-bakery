// Route key -> page component. Kept out of App.jsx so the prerender script can
// import it (via entry-server.jsx) and assert it agrees with ROUTES in
// src/data/routes.js — a page added to one but not the other would otherwise be
// silently unreachable and unprerendered.

import Home from './Home.jsx'
import OurStory from './OurStory.jsx'
import SweetStuff from './SweetStuff.jsx'
import SignatureCakes from './SignatureCakes.jsx'
import Cupcakes from './Cupcakes.jsx'
import Workshops from './Workshops.jsx'
import Order from './Order.jsx'
import Contact from './Contact.jsx'
import Blog from './Blog.jsx'
import Faqs from './Faqs.jsx'
import Terms from './Terms.jsx'
import CakeCare from './CakeCare.jsx'
import NotFound from './NotFound.jsx'

export const PAGES = {
  home: Home,
  'our-story': OurStory,
  'sweet-stuff': SweetStuff,
  signature: SignatureCakes,
  cupcakes: Cupcakes,
  workshops: Workshops,
  order: Order,
  contact: Contact,
  blog: Blog,
  faqs: Faqs,
  terms: Terms,
  'cake-care': CakeCare,
  'not-found': NotFound,
}
