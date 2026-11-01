import type { CategoryId } from '../config'

export function portfolioCategory(value: string | null): CategoryId | null {
  return value === 'knotless' || value === 'cornrows' || value === 'boho' || value === 'kids' ? value : null
}
