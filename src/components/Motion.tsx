import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
export const ease = [0.22, 1, 0.36, 1] as const
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={false} whileInView={reduced ? undefined : { y: [12, 0] }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay }}>{children}</motion.div>
}
export function Page({ children }: { children: ReactNode }) {
  return <main id="main" tabIndex={-1}>{children}</main>
}
