import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { PortfolioItem } from '../config'
import { Img } from './Img'
import { trapDialogFocus } from '../lib/dialog'

export function Lightbox({ items, index, onClose, onChange }: { items: PortfolioItem[]; index: number; onClose: () => void; onChange: (i: number) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const startX = useRef<number | null>(null)
  const item = items[index]
  const go = (direction: number) => onChange((index + direction + items.length) % items.length)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    const dialog = dialogRef.current
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    return () => { dialog?.close(); document.body.style.overflow = overflow; previous?.focus() }
  }, [])
  return <dialog ref={dialogRef} className="lightbox" aria-label={item.title} onCancel={event => { event.preventDefault(); onClose() }} onKeyDown={event => { trapDialogFocus(event); if (event.key === 'ArrowRight') { event.preventDefault(); go(1) } if (event.key === 'ArrowLeft') { event.preventDefault(); go(-1) } }} onTouchStart={event => { startX.current = event.touches[0].clientX }} onTouchEnd={event => { if (startX.current === null) return; const delta = event.changedTouches[0].clientX - startX.current; if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1); startX.current = null }}><div className="lightbox-top"><span aria-live="polite">{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span><button onClick={onClose} className="icon-button" aria-label="Close image preview" autoFocus><X /></button></div><button onClick={() => go(-1)} className="lightbox-prev icon-button" aria-label="Previous image"><ChevronLeft /></button><figure><Img key={item.id} src={item.coverImage} alt={item.title} eager /><figcaption><span>{item.title}</span><Link to={`/portfolio/${item.slug}`} onClick={onClose}>Explore this look <ArrowUpRight size={16} /></Link></figcaption></figure><button onClick={() => go(1)} className="lightbox-next icon-button" aria-label="Next image"><ChevronRight /></button></dialog>
}

