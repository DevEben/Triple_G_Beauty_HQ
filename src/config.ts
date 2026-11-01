export const business = {
  name: 'Triple G Beauty HQ',
  headline: 'Every Braid. A Work of Art.',
  tagline: 'Precision. Neatness. Lasting Beauty.',
  whatsapp: '2348155229821',
  phone: '08155229821',
  secondaryPhone: '08168861418',
  secondaryWhatsapp: '2348168861418',
  location: 'Gbagada, Lagos',
  tiktok: 'https://www.tiktok.com/@triplegbeautyhq',
  tiktokHandle: '@triplegbeautyhq',
  hours: 'Monday–Friday, 9 AM–4 PM',
} as const

export type CategoryId = 'knotless' | 'cornrows' | 'boho' | 'kids'
export interface Category { id: CategoryId; label: string }
export const categories: Category[] = [
  { id: 'knotless', label: 'Knotless Braids' },
  { id: 'cornrows', label: 'Cornrows' },
  { id: 'boho', label: 'Boho Braids' },
  { id: 'kids', label: 'Kids Hair' },
]
export const nav = [
  { label: 'Work', to: '/portfolio' },
  { label: 'Styles', to: '/#styles' },
  { label: 'Book', to: '/#book' },
]

/** Supplied brand photographs. See docs/media-provenance.md. */
export const media = {
  owner: '/media/photos/brand-owner.webp',
  finished: '/media/photos/boho-client.jpg',
  sculpted: '/media/photos/sculpted-cornrows.webp',
  hero: '/media/photos/braiding-craft.png',
  process: '/media/photos/process.webp',
  details: '/media/photos/details.webp',
}

export interface PortfolioItem {
  id: string; slug: string; title: string; category: CategoryId
  coverImage: string; images: string[]; description: string; featured: boolean
  details?: string[]
}
const labels: Record<CategoryId, string> = { knotless: 'Knotless Braids', cornrows: 'Cornrows', boho: 'Boho Braids', kids: 'Kids Hair' }
const mk = (category: CategoryId, n: number, title: string, featured: boolean): PortfolioItem => ({
  id: `${category}-${n}`, slug: `${category}-${n}`, title, category, featured,
  description: `${labels[category]} by Triple G Beauty and Braids.`,
  coverImage: `/media/photos/${category}-${n}.webp`, images: [`/media/photos/${category}-${n}.webp`],
})
/** Display order. First six are featured on the homepage. Rename titles/descriptions as needed. */
export const portfolio: PortfolioItem[] = [
  { ...mk('boho', 6, 'Honey-brown Boho Braids', true), coverImage: '/media/photos/boho-client.jpg', images: ['/media/photos/boho-client.jpg'] },
  { ...mk('cornrows', 9, 'Sculpted Cornrow Bun', true), coverImage: '/media/photos/sculpted-cornrows.webp', images: ['/media/photos/sculpted-cornrows.webp'] },
  mk('cornrows', 1, 'Cornrows I', true),
  mk('boho', 1, 'Boho Braids I', true),
  mk('kids', 1, 'Kids Hair I', true),
  mk('cornrows', 4, 'Cornrows IV', true),
  mk('knotless', 1, 'Knotless Braids I', true),
  mk('boho', 2, 'Boho Braids II', true),
  mk('cornrows', 2, 'Cornrows II', false),
  mk('kids', 2, 'Kids Hair II', false),
  mk('knotless', 2, 'Knotless Braids II', false),
  mk('boho', 3, 'Boho Braids III', false),
  mk('cornrows', 3, 'Cornrows III', false),
  mk('cornrows', 5, 'Cornrows V', false),
  mk('boho', 4, 'Boho Braids IV', false),
  mk('cornrows', 6, 'Cornrows VI', false),
  mk('cornrows', 7, 'Cornrows VII', false),
  mk('boho', 5, 'Boho Braids V', false),
  mk('cornrows', 8, 'Cornrows VIII', false),
]
export const services = [
  { category: 'knotless' as CategoryId, title: 'Knotless Braids', line: 'Lightweight braids that start flat and feel natural.' },
  { category: 'cornrows' as CategoryId, title: 'Cornrows', line: 'Sharp, even lines with clean partings.' },
  { category: 'boho' as CategoryId, title: 'Boho Braids', line: 'Soft, free-flowing texture with a relaxed finish.' },
  { category: 'kids' as CategoryId, title: 'Kids Hair', line: 'Neat, comfortable styles for little ones.' },
]
export const videos = [
  { src: '/media/videos/client-1.mp4', poster: '/media/videos/client-1.jpg', label: 'A new week. A new look.' },
  { src: '/media/videos/client-2.mp4', poster: '/media/videos/client-2.jpg', label: 'The finished feeling' },
  { src: '/media/videos/client-3.mp4', poster: '/media/videos/client-3.jpg', label: 'Our beautiful client' },
  { src: '/media/videos/client-4.mp4', poster: '/media/videos/client-4.jpg', label: 'A little slay' },
  { src: '/media/videos/client-5.mp4', poster: '/media/videos/client-5.jpg', label: 'Pretty hair. Personal style.' },
]


