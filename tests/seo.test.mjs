import test from 'node:test'
import assert from 'node:assert/strict'
import { pageSeo, indexablePaths, renderSeoHead, sitemapXml } from '../src/lib/seo.ts'

const origin = 'https://triplegbeautyhq.vercel.app'

test('filtered galleries share a clean canonical URL', () => {
  assert.equal(pageSeo('/portfolio?category=boho#main').canonical, `${origin}/portfolio`)
})
test('all real styles have their own title, canonical and social image', () => {
  assert.equal(indexablePaths.length, 19)
  assert.equal(new Set(indexablePaths).size, 19)
  const page = pageSeo('/portfolio/boho-1')
  assert.match(page.title, /Boho Braids I.*Triple G/)
  assert.equal(page.canonical, `${origin}/portfolio/boho-1`)
  assert.equal(page.image, `${origin}/media/photos/boho-1.webp`)
  assert.equal(page.robots, 'index, follow, max-image-preview:large')
})
test('unknown styles cannot be indexed', () => {
  assert.equal(pageSeo('/portfolio/missing').robots, 'noindex, follow')
})
test('HTML metadata escapes untrusted text and exposes brand identity', () => {
  const page = pageSeo('/')
  const head = renderSeoHead({ ...page, title: 'A < B & "C"' })
  assert.match(head, /A &lt; B &amp; &quot;C&quot;/)
  assert.match(head, /application\/ld\+json/)
  assert.match(head, /Triple G Beauty and Braid/)
  assert.match(head, /rel="canonical"/)
})
test('sitemap contains only absolute canonical page URLs', () => {
  const xml = sitemapXml()
  assert.equal((xml.match(/<loc>/g) || []).length, 19)
  assert.match(xml, /https:\/\/triplegbeautyhq.vercel.app\/portfolio\/cornrows-1/)
  assert.doesNotMatch(xml, /\?category|#|missing|localhost/)
})
