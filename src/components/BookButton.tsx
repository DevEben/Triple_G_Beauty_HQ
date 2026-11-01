import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
export function BookButton({ href, children, variant = 'dark', large = false, tabIndex }: { href: string; children: string; variant?: 'dark' | 'light' | 'ghost'; large?: boolean; tabIndex?: number }) {
  const cls = `book-button button-${variant}${large ? ' button-large' : ''}`
  const content = <>{children}<span className="button-arrow"><ArrowUpRight size={18} aria-hidden /></span></>
  return href.startsWith('/') ? <Link to={href} className={cls} tabIndex={tabIndex}>{content}</Link> : <a href={href} target="_blank" rel="noopener noreferrer" className={cls} tabIndex={tabIndex}>{content}</a>
}

