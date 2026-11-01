import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { business } from '../config'
import { generalBooking } from '../lib/whatsapp'
import { Logo } from './Logo'
export function Footer() {
  return <footer className="site-footer"><div className="shell"><div className="footer-top"><div className="footer-brand"><Link to="/" aria-label="Triple G home"><Logo /></Link><p>Beautiful braids.<br />Considered from start to finish.</p></div><nav aria-label="Footer"><Link to="/portfolio">The collection</Link><Link to="/#studio">Our craft</Link><Link to="/#styles">Signature styles</Link></nav><address><a href={generalBooking()} target="_blank" rel="noopener noreferrer">Let’s talk <ArrowUpRight size={17} /></a><a href={`tel:+${business.whatsapp}`}>{business.phone}</a><a href={business.tiktok} target="_blank" rel="noopener noreferrer">{business.tiktokHandle} <ArrowUpRight size={15} /></a><a href={`https://wa.me/${business.secondaryWhatsapp}`} target="_blank" rel="noopener noreferrer">{business.secondaryPhone}</a><p>{business.location}</p><p>{business.hours}</p></address></div><div className="footer-bottom"><p>© {new Date().getFullYear()} {business.name}</p><p>Every braid. A work of art.</p><a href="#main">Back to top ↑</a></div></div></footer>
}
