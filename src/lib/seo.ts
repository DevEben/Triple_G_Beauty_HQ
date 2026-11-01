import { business, portfolio } from '../config.ts'
import { siteUrl } from '../seo.config.ts'
export const indexablePaths = ['/', '/portfolio', ...portfolio.map(item => `/portfolio/${item.slug}`)]
export function pageSeo(input: string) {
  const path = new URL(input, siteUrl).pathname.replace(/\/+$/, '') || '/'
  const item = portfolio.find(item => path === `/portfolio/${item.slug}`)
  const title = path === '/' ? `${business.name} | Knotless Braids, Cornrows & Boho Styles` : path === '/portfolio' ? `Hairstyle Collection | ${business.name}` : item ? `${item.title} | ${business.name}` : `Page not found | ${business.name}`
  const description = item ? `${item.title} by ${business.name}. Explore this finished look, discover more braided hairstyles and book your next style on WhatsApp.` : `Discover ${business.name}: carefully crafted knotless braids, cornrows, boho braids and kids hairstyles. Browse our real work and book on WhatsApp.`
  return { title, description, canonical: `${siteUrl}${path === '/' ? '/' : path}`, image: `${siteUrl}${item?.coverImage || '/media/photos/cornrows-1.webp'}`, robots: indexablePaths.includes(path) ? 'index, follow, max-image-preview:large' : 'noindex, follow', type: 'website' }
}
export function structuredData() {
  return { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Organization', '@id': `${siteUrl}/#business`, name: business.name, alternateName: ['Triple G Beauty and Braid', 'Triple G Beauty HQ'], url: `${siteUrl}/`, logo: `${siteUrl}/logo-transparent-bronze.png`, telephone: `+${business.whatsapp}`, sameAs: [business.tiktok] },
    { '@type': 'WebSite', url: `${siteUrl}/`, name: business.name, alternateName: 'Triple G Beauty and Braid', publisher: { '@id': `${siteUrl}/#business` }, inLanguage: 'en' },
  ] }
}
const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
export function renderSeoHead(page: ReturnType<typeof pageSeo>) {
  return [
    `<title>${escape(page.title)}</title>`,
    `<link rel="canonical" href="${escape(page.canonical)}" data-seo/>`,
    ...Object.entries({ description: page.description, robots: page.robots, 'twitter:card': 'summary_large_image', 'twitter:title': page.title, 'twitter:description': page.description, 'twitter:image': page.image }).map(([name, content]) => `<meta name="${name}" content="${escape(content)}" data-seo/>`),
    ...Object.entries({ 'og:title': page.title, 'og:description': page.description, 'og:url': page.canonical, 'og:image': page.image, 'og:image:alt': 'Braided hairstyle by Triple G Beauty and Braids', 'og:type': page.type, 'og:site_name': business.name }).map(([property, content]) => `<meta property="${property}" content="${escape(content)}" data-seo/>`),
    `<script type="application/ld+json" data-seo>${JSON.stringify(structuredData()).replace(/</g, '\\u003c')}</script>`,
  ].join('\n')
}
export function sitemapXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexablePaths.map(path => `  <url><loc>${escape(pageSeo(path).canonical)}</loc></url>`).join('\n')}\n</urlset>\n`
}
export function robotsTxt() { return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n` }
