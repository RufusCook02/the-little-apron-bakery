// Single source of truth for the bakery's social profiles — referenced by the
// footer, contact page, blog and order page so the handles only live in one place.
export const SOCIALS = {
  instagram: {
    label: 'Instagram',
    handle: '@thelittleapronnz',
    url: 'https://www.instagram.com/thelittleapronnz/',
  },
  facebook: {
    label: 'Facebook',
    handle: 'The Little Apron',
    url: 'https://www.facebook.com/TheLittleApronNZ',
  },
  tiktok: {
    label: 'TikTok',
    handle: '@thelittleapronnz',
    url: 'https://www.tiktok.com/@thelittleapronnz',
  },
}

// Spread onto an <a> so external social links open in a new tab safely.
export const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
}
