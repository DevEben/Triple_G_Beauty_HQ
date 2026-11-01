import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

import { generalBooking } from '../lib/whatsapp'
import { useHeroPlayback } from '../lib/useHeroPlayback'
import { Img } from './Img'
import { BookButton } from './BookButton'
import { useHydrated } from '../lib/hooks'

const scenes = [
  { name: 'The craft', src: '/media/photos/campaign-craft.webp', alt: 'Hands carefully creating precise black braids', first: 'Every braid.', second: 'A work of art.', copy: 'Precision in the parting. Care in the making. Beauty that feels like you.', action: 'Explore the collection', href: '/portfolio' },
  { name: 'The expression', src: '/media/photos/campaign-expression.webp', alt: 'Campaign portrait of a woman wearing flowing black box braids and burgundy satin', first: 'Made with care.', second: 'Worn your way.', copy: 'The finished feeling. Quiet confidence, effortless movement, and a look entirely your own.', action: 'Find your signature style', href: '/#styles' },
  { name: 'The detail', src: '/media/photos/campaign-detail.webp', alt: 'Campaign close-up revealing precise partings and the woven texture of completed black braids', first: 'Every part.', second: 'Every detail.', copy: 'The clean lines. The even weave. The thoughtful finish. A little closer, and the craft speaks for itself.', action: 'Let’s create your next look', href: generalBooking() },
]

function SceneImage({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const scale = useTransform(progress, index === 0 ? [0, .38] : index === 1 ? [.18, .68] : [.58, 1], index === 0 ? [1, 1.1] : index === 1 ? [1.13, 1] : [1.16, 1])
  const clip = useTransform(progress, index === 1 ? [.18, .4] : [.58, .82], index === 1 ? ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'] : ['inset(22% 14% 22% 14%)', 'inset(0% 0% 0% 0%)'])
  const opacity = useTransform(progress, [.57, .64], [0, 1])
  return <motion.div className={`cinema-image cinema-image-${index}`} style={index === 0 ? undefined : { clipPath: clip, ...(index === 2 ? { opacity } : {}) }} aria-hidden="true"><motion.div className="cinema-camera" style={{ scale }}><Img src={scenes[index].src} alt="" eager priority={index === 0 ? 'high' : 'low'} /></motion.div></motion.div>
}

function StoryCopy({ index, progress, active }: { index: number; progress: MotionValue<number>; active: boolean }) {
  const scene = scenes[index]
  const range = index === 0 ? [0, .1, .32] : index === 1 ? [.25, .4, .56, .71] : [.65, .82, 1]
  const y = useTransform(progress, range, index === 0 ? ['0vh', '0vh', '-85vh'] : index === 1 ? ['48vh', '0vh', '0vh', '-65vh'] : ['45vh', '0vh', '0vh'])
  const opacity = useTransform(progress, range, index === 0 ? [1, 1, 0] : index === 1 ? [0, 1, 1, 0] : [0, 1, 1])
  const Heading = index === 0 ? 'h1' : 'h2'
  return <motion.div className={`cinema-copy cinema-copy-${index}`} style={{ y, opacity, pointerEvents: active ? 'auto' : 'none' }} aria-hidden={!active}>
    <div className="cinema-copy-heading"><p className="cinema-label">Triple G / {scene.name}</p><Heading id={index === 0 ? 'hero-title' : undefined}><span>{scene.first}</span><span>{scene.second}</span></Heading></div>
    <div className="cinema-copy-aside"><p>{scene.copy}</p><BookButton href={scene.href} variant="light" tabIndex={active ? 0 : -1}>{scene.action}</BookButton></div>
    {index === 2 && <div className="cinema-detail-notes"><span>Clean partings</span><span>Considered tension</span><span>A beautiful finish</span></div>}
  </motion.div>
}

export function Hero() {
  const journeyRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const hydrated = useHydrated()
  const reduced = hydrated && prefersReducedMotion
  const { scrollYProgress } = useScroll({ target: journeyRef, offset: ['start start', 'end end'] })
  const { progress, active, status, selectScene, pauseForFocus, resumeAfterFocus } = useHeroPlayback(journeyRef, scrollYProgress, hydrated, reduced)
  return <section ref={journeyRef} className={`hero-journey aurel-journey${reduced ? ' journey-reduced' : ''}`} aria-label="The Triple G story" data-playback={reduced ? 'disabled' : status} onBlurCapture={resumeAfterFocus} onFocusCapture={event => { if (event.target instanceof HTMLElement && event.target.closest('.cinema-copy a')) pauseForFocus() }}>
    <div className="hero hero-stage cinema-stage" aria-label={reduced ? scenes[0].alt : scenes[active].alt}>
      {reduced ? <div className="cinema-image cinema-image-0"><div className="cinema-camera"><Img src={scenes[0].src} alt={scenes[0].alt} eager /></div></div> : scenes.map((_, index) => <SceneImage key={index} index={index} progress={progress} />)}
      <div className="cinema-shade" />
      <div className="cinema-frame" />
      {reduced ? <div className="cinema-copy cinema-static"><div className="cinema-copy-heading"><p className="cinema-label">Triple G / The craft</p><h1 id="hero-title"><span>Every braid.</span><span>A work of art.</span></h1></div><div className="cinema-copy-aside"><p>{scenes[0].copy}</p><BookButton href="/portfolio" variant="light">Explore the collection</BookButton></div></div> : scenes.map((_, index) => <StoryCopy key={index} index={index} progress={progress} active={index === active} />)}
      <div className="cinema-bottom"><div className="cinema-story-actions"><a href="#collection" className="cinema-skip">{reduced ? 'Explore the work' : 'Skip the story'} <ArrowDown size={15} /></a></div>{!reduced && <nav aria-label="Story scenes" className="cinema-scene-nav">{scenes.map((scene, index) => <button key={scene.name} type="button" aria-label={`Scene ${index + 1}: ${scene.name}`} aria-current={active === index ? 'step' : undefined} onClick={() => selectScene(index)}><span className="scene-progress" /><span>{scene.name}</span></button>)}</nav>}<Link to="/portfolio" className="cinema-explore" aria-label="Explore the hairstyle collection"><ArrowUpRight size={22} /></Link></div>
      {!reduced && <motion.span className="hero-story-progress" style={{scaleX:progress}} aria-hidden="true"/>}
    </div>
  </section>
}


