import { Link } from 'react-router-dom'
import { ArrowUpRight, Play } from 'lucide-react'
import { useRef, useState } from 'react'
import { business, media, portfolio, services, videos } from '../config'
import { generalBooking } from '../lib/whatsapp'
import { useSeo } from '../lib/hooks'
import { Img } from '../components/Img'
import { Page, Reveal } from '../components/Motion'
import { BookButton } from '../components/BookButton'
import { Hero } from '../components/Hero'

function Collection() {
  const selected = [portfolio[0], portfolio[1], portfolio[4], portfolio[2]]
  return (
    <section id="collection" className="section-space collection shell">
      <div className="section-heading"><div><p className="section-note">The Triple G collection</p><h2>Find your<br /><em>kind of beautiful.</em></h2></div><div className="section-heading-aside"><p>A few of our favourite looks.<br />Each one, unmistakably personal.</p><Link to="/portfolio" className="text-link">Explore all styles <ArrowUpRight size={18} /></Link></div></div>
      <div className="collection-grid">
        {selected.map((item, index) => <Reveal key={item.id} className={`collection-piece piece-${index}`}>
          <Link to={`/portfolio/${item.slug}`} className="work-link"><div className="work-image"><Img src={item.coverImage} alt={item.title} /><span className="image-action"><ArrowUpRight size={21} /></span></div><div className="work-caption"><h3>{services.find(s => s.category === item.category)?.title}</h3><span>View style <ArrowUpRight size={15} /></span></div></Link>
        </Reveal>)}
      </div>
    </section>
  )
}

function Story() {
  return (
    <section className="studio-section" id="studio"><div className="shell studio-grid">
      <div className="studio-photo"><Img src={media.process} alt="A Triple G stylist carefully braiding hair in the studio" /><span className="photo-caption">The hands behind the detail.</span></div>
      <Reveal className="studio-copy"><p className="section-note">In the studio</p><h2>Good hair.<br /><em>Thoughtful hands.</em></h2><p>There is an art to making it look effortless. The clean parting. The even tension. The last braid, as considered as the first.</p><p>At Triple G Beauty and Braids, we take our time with the details. So you leave with a style that feels like you.</p><Link to="/#book" className="text-link">Let’s find your next look <ArrowUpRight size={18} /></Link></Reveal>
    </div></section>
  )
}

function Craft() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [error, setError] = useState(false)
  const play = async () => {
    try { await videoRef.current?.play(); setError(false) } catch { setError(true) }
  }
  return (
    <section className="craft-section shell section-space"><div className="craft-heading"><h2>Made with care.<br /><em>Down to the last braid.</em></h2><p>Step a little closer to the craft.</p></div>
      <div className="craft-film"><video ref={videoRef} controls={started} playsInline preload="none" poster={videos[0].poster} aria-label="Watch a Triple G braiding session" onPlay={() => setStarted(true)} onError={() => setError(true)}><source src={videos[0].src} type="video/mp4" /></video>
        {!started && <button className="film-play" onClick={play} aria-label="Play braiding film"><span><Play size={21} fill="currentColor" /></span>Watch the craft</button>}
      </div>{error && <p role="status" className="film-error">The film couldn’t play. <a href={videos[0].src} className="text-link">Open the video directly <ArrowUpRight size={16} /></a></p>}
    </section>
  )
}

function Styles() {
  return (
    <section id="styles" className="styles-section"><div className="shell styles-grid"><div className="styles-intro"><p className="section-note">A style for every side of you</p><h2>Your hair.<br /><em>Your expression.</em></h2><p>From beautifully simple to a little more expressive. Find the look that feels right.</p></div><div className="style-list">{services.map((service, index) => <Link key={service.category} to={`/portfolio?category=${service.category}`} className="style-row"><span className="style-number">0{index + 1}</span><div><h3>{service.title}</h3><p>{service.line}</p></div><ArrowUpRight size={24} /></Link>)}</div></div></section>
  )
}

export function Booking() {
  return <section id="book" className="booking-section"><div className="shell booking-grid"><div><p className="section-note">Let’s make it yours</p><h2>Your next look.<br /><em>Beautifully you.</em></h2></div><div className="booking-copy"><p>Have a style in mind? Send us your inspiration, ask a question, or arrange your next appointment.</p><BookButton href={generalBooking()} variant="dark">Let’s talk on WhatsApp</BookButton><p className="booking-hours">Studio hours · {business.hours}</p></div></div></section>
}

export default function Home() {
  useSeo('Triple G Beauty and Braids | Every Braid. A Work of Art.', 'Thoughtfully crafted knotless braids, cornrows, boho braids and kids hair. Explore real work by Triple G Beauty and Braids and book on WhatsApp.')
  return <Page><Hero /><Collection /><Story /><Craft /><Styles /><Booking /></Page>
}




