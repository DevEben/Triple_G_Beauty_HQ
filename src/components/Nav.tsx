import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { business } from '../config'
import { generalBooking } from '../lib/whatsapp'
import { Logo } from './Logo'
import { trapDialogFocus } from '../lib/dialog'

const links = [{ label: 'The collection', to: '/portfolio' }, { label: 'Our craft', to: '/#craft' }, { label: 'Films', to: '/#films' }, { label: 'Signature styles', to: '/#styles' }]
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [compact, setCompact] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const menuRef = useRef<HTMLButtonElement>(null)
  const { pathname, hash } = useLocation()
  const [open, setOpen] = useState(false)
  useEffect(() => { const update = () => { const journey = document.querySelector('.hero-journey'); setScrolled(journey ? journey.getBoundingClientRect().bottom <= 100 : window.scrollY > 30); setCompact(Boolean(journey && window.scrollY > 120 && journey.getBoundingClientRect().bottom > window.innerHeight)) }; update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update) }, [pathname])
  useEffect(() => { setOpen(false) }, [pathname, hash])
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) { dialog.showModal(); const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = previous; if (dialog.open) dialog.close() } }
    if (dialog.open) dialog.close()
  }, [open])
  const close = () => { setOpen(false); menuRef.current?.focus() }
  const onHome = pathname === '/'
  return <>
    <header className={`site-header ${onHome && !scrolled ? 'header-overlay' : 'header-solid'}${compact ? ' header-compact' : ''}`}><div className="nav-inner shell"><Link to="/" className="brand-link" aria-label="Triple G home"><Logo /></Link><nav className="desktop-nav" aria-label="Primary">{links.map(link => <Link key={link.label} to={link.to} className="nav-link" aria-current={(link.to === '/portfolio' ? pathname.startsWith('/portfolio') : `${pathname}${hash}` === link.to) ? 'page' : undefined}>{link.label}</Link>)}</nav><div className="nav-actions"><a href={generalBooking()} target="_blank" rel="noopener noreferrer" className="nav-book">Book a look <ArrowUpRight size={16} /></a><button ref={menuRef} type="button" className="menu-toggle" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}><Menu size={23} /></button></div></div></header>
    <dialog ref={dialogRef} id="mobile-menu" className="mobile-menu" aria-label="Navigation menu" onKeyDown={trapDialogFocus} onCancel={event => { event.preventDefault(); close() }} onClose={() => setOpen(false)}><div className="mobile-menu-top"><Logo /><button className="icon-button" onClick={close} aria-label="Close menu" autoFocus><X /></button></div><nav aria-label="Mobile primary"><Link to="/" onClick={close}>Home</Link>{links.map(link => <Link key={link.label} to={link.to} onClick={close}>{link.label}<ArrowUpRight size={25} /></Link>)}</nav><div className="mobile-menu-bottom"><a href={generalBooking()} target="_blank" rel="noopener noreferrer" className="book-button button-light">Book on WhatsApp <ArrowUpRight size={20} /></a><p>{business.hours}</p></div></dialog>
  </>
}
