import { useId } from 'react'
export function Logo({ plate = false, className = '' }: { plate?: boolean; className?: string }) {
  const filterId = `brand-${useId().replace(/:/g,'')}`
  return <span className={`brand-logo original-logo${plate ? ' brand-logo-plate' : ''} ${className}`}>
    <svg width="0" height="0" aria-hidden="true" className="logo-filter"><defs><filter id={filterId} colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%"><feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -.43 -.43 -.43 0 1.18" result="ink"/><feComposite in="ink" in2="SourceGraphic" operator="in" result="cutout"/><feFlood floodColor="currentColor" result="brandColor"/><feComposite in="brandColor" in2="cutout" operator="in"/></filter></defs></svg>
    <img src="/logo.jpg" width="790" height="540" alt="Triple G Beauty and Braids" style={{filter:`url(#${filterId})`}}/>
  </span>
}
