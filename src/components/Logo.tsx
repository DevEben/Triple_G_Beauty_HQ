export function Logo({ plate = false, className = '' }: { plate?: boolean; className?: string }) {
  return <span role="img" aria-label="Triple G Beauty and Braids" className={`brand-logo${plate ? ' brand-logo-plate' : ''} ${className}`} />
}
