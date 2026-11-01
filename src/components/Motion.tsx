import { Children, isValidElement, useEffect, useRef, type ReactNode } from 'react'
import { motion, useAnimate, useInView, useReducedMotion } from 'motion/react'
import { useLocation } from 'react-router-dom'
export const ease = [0.22, 1, 0.36, 1] as const

/** SSR stays visible. The curtain is played only when it enters the viewport. */
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion()
  return <motion.div className={`image-reveal ${className}`} initial={false} whileInView={reduced ? undefined : { clipPath: ['inset(0% 0% 18% 0%)','inset(0% 0% 0% 0%)'], y: [34, 0] }} viewport={{ once: true, amount: .12 }} transition={{ duration: 1, ease, delay }}>{children}</motion.div>
}

export function Heading({ children, as = 'h2', className = '' }: { children: ReactNode; as?: 'h1'|'h2'; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, {once:true, amount:.25})
  const reduced = useReducedMotion()
  const [scope, animate] = useAnimate()
  const lines: ReactNode[][] = [[]]
  Children.toArray(children).forEach(child => {
    if (isValidElement(child) && child.type === 'br') lines.push([])
    else lines[lines.length-1].push(child)
  })
  useEffect(()=>{
    if (!inView || reduced || !scope.current) return
    const controls = animate('.heading-line-inner', { y: ['105%','0%'], rotate: [1.5,0] }, {duration:.85,ease,delay:index=>index*.09})
    return ()=>controls.stop()
  },[inView,reduced,animate,scope])
  const Tag = as
  return <div ref={scope} className="heading-reveal"><Tag ref={ref} className={`motion-heading ${className}`}>{lines.map((line,index)=><span className="heading-line" key={index}><span className="heading-line-inner">{line}</span></span>)}</Tag></div>
}

export function Page({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const reduced = useReducedMotion()
  const [scope, animate] = useAnimate()
  useEffect(()=>{
    if (reduced || !scope.current || pathname === '/') return
    const controls=animate(scope.current, {opacity:[.75,1], y:[18,0]}, {duration:.55,ease})
    return ()=>controls.stop()
  },[pathname,reduced,animate,scope])
  return <main ref={scope} id="main" tabIndex={-1}>{children}</main>
}
