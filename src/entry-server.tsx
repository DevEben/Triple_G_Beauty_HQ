import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
export { indexablePaths, pageSeo, renderSeoHead, sitemapXml, robotsTxt } from './lib/seo'
export function renderPage(path: string) {
  return renderToString(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)
}
