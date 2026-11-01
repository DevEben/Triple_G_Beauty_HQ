import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { categories, portfolio, type CategoryId } from '../config'
import { portfolioCategory } from '../lib/portfolio'
import { useHydrated, useSeo } from '../lib/hooks'
import { Img } from '../components/Img'
import { Lightbox } from '../components/Lightbox'
import { Page } from '../components/Motion'
import { Booking } from './Home'

export default function Portfolio() {
  useSeo('The Collection | Triple G Beauty and Braids', 'Find your kind of beautiful. Explore real knotless braids, cornrows, boho braids and kids hairstyles by Triple G.')
  const [params, setParams] = useSearchParams()
  const hydrated = useHydrated()
  const cat = portfolioCategory(hydrated ? params.get('category') : null)
  const [open, setOpen] = useState<number | null>(null)
  const previousCategory = useRef(cat)
  useEffect(() => { if (previousCategory.current !== cat) { setOpen(null); previousCategory.current = cat } }, [cat])
  const list = cat ? portfolio.filter(item => item.category === cat) : portfolio
  const filters: { id: CategoryId | null; label: string }[] = [{ id: null, label: 'All looks' }, ...categories]
  return <Page><section className="portfolio-section shell"><div className="portfolio-intro"><div><Link to="/" className="breadcrumb">Triple G / The collection</Link><h1>A look.<br /><em>A feeling. You.</em></h1></div><p>Real people. Beautiful braids.<br />Find a little inspiration for your next chapter.</p></div><div className="gallery-toolbar"><div role="group" aria-label="Filter by style" className="gallery-filters">{filters.map(filter => <button type="button" key={filter.label} aria-pressed={cat === filter.id} onClick={() => { setOpen(null); setParams(filter.id ? { category: filter.id } : {}) }}>{filter.label}</button>)}</div><p aria-live="polite" aria-atomic="true" className="gallery-count">{list.length} looks</p></div><ul className="portfolio-grid">{list.map((item, index) => <li key={item.id} className="portfolio-piece"><button onClick={() => setOpen(index)} className="gallery-image" aria-label={`Open ${item.title}`}><Img src={item.coverImage} alt={item.title} eager={index < 3} /><span className="image-action"><ArrowUpRight size={20} /></span></button><div className="gallery-caption"><div><span>{categories.find(category => category.id === item.category)?.label}</span><Link to={`/portfolio/${item.slug}`}>{item.title}</Link></div><Link to={`/portfolio/${item.slug}`} className="gallery-detail-link" aria-label={`View details for ${item.title}`}><ArrowUpRight size={21} /></Link></div></li>)}</ul></section><Booking />{open !== null && list[open] && <Lightbox items={list} index={open} onClose={() => setOpen(null)} onChange={setOpen} />}</Page>
}
