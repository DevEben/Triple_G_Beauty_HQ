import { useState } from 'react'
import { ImageOff } from 'lucide-react'
export function Img({ src, alt, className = '', eager = false, priority }: { src: string; alt: string; className?: string; eager?: boolean; priority?: 'high' | 'low' | 'auto' }) {
  const [failed, setFailed] = useState<string | null>(null)
  if (failed === src) return <div role="img" aria-label={alt} className={`image-unavailable ${className}`}><ImageOff size={25} aria-hidden /><span>This look is taking a little longer to load.</span></div>
  return <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} {...{ fetchpriority: priority ?? (eager ? 'high' : 'auto') }} decoding="async" onError={() => setFailed(src)} className={className} />
}
