import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { categories, portfolio, services } from '../config'
import { styleBooking } from '../lib/whatsapp'
import { useSeo } from '../lib/hooks'
import { Img } from '../components/Img'
import { Page } from '../components/Motion'
import { BookButton } from '../components/BookButton'

const descriptions = {
  cornrows: 'Considered lines. Intricate patterns. A beautifully neat finish. Explore this cornrow look, then make it your own with Triple G.',
  knotless: 'A flat, natural-looking start and beautifully flowing braids. A considered look with plenty of room for your own expression.',
  boho: 'Braided structure meets soft, free-flowing texture. A little movement, a little personality, and a finish that feels effortless.',
  kids: 'Beautifully neat braids for little personalities. Thoughtful styling, carefully finished with comfort in mind.',
}
export default function Detail() {
  const { slug } = useParams()
  const item = portfolio.find(style => style.slug === slug)
  useSeo(item ? `${item.title} | Triple G Beauty and Braids` : 'Style not found | Triple G', item ? descriptions[item.category] : 'Explore the Triple G hairstyle collection.')
  if (!item) return <Page><section className="not-found shell"><p className="section-note">A different direction</p><h1>This look<br /><em>isn’t here.</em></h1><p>There’s still plenty of inspiration in the collection.</p><BookButton href="/portfolio">Back to the collection</BookButton></section></Page>
  const category = categories.find(value => value.id === item.category)?.label
  const related = portfolio.filter(style => style.category === item.category && style.id !== item.id).slice(0, 3)
  return <Page><article className="detail-section shell"><Link to={`/portfolio?category=${item.category}`} className="back-link"><ArrowLeft size={16} /> Back to {category}</Link><div className="detail-grid"><div className="detail-photo"><Img src={item.coverImage} alt={item.title} eager /></div><div className="detail-copy"><span className="section-note">{category}</span><h1>{item.title}</h1><p>{descriptions[item.category]}</p><div className="detail-notes"><p><span>The feeling</span>{services.find(service => service.category === item.category)?.line}</p><p><span>Make it yours</span>Ask us about your preferred length, colour and finish.</p></div><BookButton href={styleBooking(item.title)}>Book this look</BookButton><p className="detail-booking-note">We’ll talk through the details on WhatsApp.</p></div></div>{item.images.length > 1 && <div className="detail-more-images">{item.images.slice(1).map(src => <Img key={src} src={src} alt={`Another view of ${item.title}`} />)}</div>}{related.length > 0 && <section className="related-section"><div className="related-heading"><h2>A little more<br /><em>inspiration.</em></h2><Link to={`/portfolio?category=${item.category}`} className="text-link">Explore {category} <ArrowUpRight size={18} /></Link></div><ul className="related-grid">{related.map(style => <li key={style.id}><Link to={`/portfolio/${style.slug}`} className="work-link"><div className="work-image"><Img src={style.coverImage} alt={style.title} /><span className="image-action"><ArrowUpRight size={20} /></span></div><div className="work-caption"><h3>{style.title}</h3><ArrowUpRight size={17} /></div></Link></li>)}</ul></section>}</article></Page>
}
