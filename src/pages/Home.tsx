import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Phone } from 'lucide-react'
import { business, media, portfolio, services } from '../config'
import { generalBooking, styleBooking } from '../lib/whatsapp'
import { useSeo } from '../lib/hooks'
import { Img } from '../components/Img'
import { Heading, Page, Reveal } from '../components/Motion'
import { BookButton } from '../components/BookButton'
import { Hero } from '../components/Hero'
import { CraftStory, Transformation } from '../components/CraftStory'
import { ClientFilms } from '../components/ClientFilms'
function Collection() {
  const selected = services.map(service=>portfolio.find(item=>item.category===service.category)!)
  return <section id="collection" className="section-space collection shell"><div className="section-heading"><div><p className="section-note">The signature collection</p><Heading>Find your<br/><em>kind of beautiful.</em></Heading></div><div className="section-heading-aside"><p>Protective styles. Individual expression.<br/>Find the one that feels like you.</p><Link to="/portfolio" className="text-link">Explore all styles <ArrowUpRight size={18}/></Link></div></div><div className="collection-grid">{selected.map((item,index)=>{
    const service=services.find(s=>s.category===item.category)!
    return <Reveal key={item.id} delay={index%2*.1} className={`collection-piece piece-${index}`}><Link to={`/portfolio?category=${item.category}`} className="work-link"><div className="work-image"><Img src={item.coverImage} alt={item.title}/><span className="image-action"><ArrowUpRight size={21}/></span></div><div className="work-caption"><h3>{service.title}</h3><span>Explore <ArrowUpRight size={15}/></span></div></Link><p className="collection-description">{service.line}</p><a href={styleBooking(service.title)} className="collection-enquire" target="_blank" rel="noopener noreferrer">Enquire about this style <ArrowUpRight size={14}/></a></Reveal>
  })}</div></section>
}
function Story() {
  return <section className="studio-section" id="studio"><div className="shell studio-grid"><Reveal className="studio-photo owner-photo"><Img src={media.owner} alt="The owner of Triple G Beauty HQ, seated in a black lace dress"/><span className="photo-caption">The woman behind Triple G.</span></Reveal><div className="studio-copy"><p className="section-note">The hands behind the beauty</p><Heading>Good hair.<br/><em>Thoughtful hands.</em></Heading><p>There is an art to making it look effortless. The clean parting. The even tension. The last braid, as considered as the first.</p><p>At Triple G Beauty HQ, we take our time with the details. So you leave with a style that feels like you.</p><Link to="/#book" className="text-link">Let’s find your next look <ArrowUpRight size={18}/></Link></div></div></section>
}
function Styles() {
 return <section id="styles" className="styles-section"><div className="shell styles-grid"><div className="styles-intro"><p className="section-note">A style for every side of you</p><Heading>Your hair.<br/><em>Your expression.</em></Heading><p>From beautifully simple to a little more expressive. Find the look that feels right.</p></div><div className="style-list">{services.map((service,index)=><Reveal key={service.category} delay={index*.06}><Link to={`/portfolio?category=${service.category}`} className="style-row"><span className="style-number">0{index+1}</span><div><h3>{service.title}</h3><p>{service.line}</p></div><ArrowUpRight size={24}/></Link></Reveal>)}</div></div></section>
}
export function Booking() {
 return <section id="book" className="booking-section"><div className="shell booking-grid"><div><p className="section-note">Let’s make it yours</p><Heading>Your next look<br/><em>starts here.</em></Heading><p className="booking-location"><MapPin size={17}/>{business.location}</p></div><div className="booking-copy"><p>Send us your inspiration, ask about a style, or arrange your next appointment. We’ll talk through the details together.</p><BookButton href={generalBooking()} variant="dark">Book on WhatsApp</BookButton><div className="booking-details"><a href={`tel:+${business.whatsapp}`}><Phone size={15}/>{business.phone}</a><a href={`https://wa.me/${business.secondaryWhatsapp}`} target="_blank" rel="noopener noreferrer">{business.secondaryPhone} <span>WhatsApp / second line</span></a><p>Monday–Friday / 9 AM–4 PM</p><a href={business.tiktok} target="_blank" rel="noopener noreferrer">TikTok {business.tiktokHandle} <ArrowUpRight size={15}/></a></div></div></div></section>
}
export default function Home() {
 useSeo()
 return <Page><Hero/><CraftStory/><Transformation/><Collection/><Story/><ClientFilms/><Styles/><Booking/></Page>
}
