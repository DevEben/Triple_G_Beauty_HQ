import { build } from 'vite'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'
await build({ build: { ssr: 'src/entry-server.tsx', outDir: '.seo-build', emptyOutDir: true }, logLevel: 'error' })
const seo = await import(pathToFileURL(resolve('.seo-build/entry-server.js')).href)
const template = await readFile('dist/index.html', 'utf8')
for (const path of [...seo.indexablePaths, '/404']) {
  const html = template.replace('<!-- SEO -->', seo.renderSeoHead(seo.pageSeo(path))).replace('<div id="root"></div>', () => `<div id="root">${seo.renderPage(path)}</div>`)
  const output = resolve('dist', path === '/' ? 'index.html' : `${path.slice(1)}.html`)
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, html)
}
for (const folder of ['public', 'dist']) {
  await writeFile(`${folder}/sitemap.xml`, seo.sitemapXml())
  await writeFile(`${folder}/robots.txt`, seo.robotsTxt())
}
console.log(`Prerendered ${seo.indexablePaths.length} indexable pages and a noindex 404 page.`)
