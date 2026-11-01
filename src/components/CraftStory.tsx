import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { media } from '../config'
import { Img } from './Img'
import { Heading, Reveal } from './Motion'
const chapters = [
  { number: '01', title: 'The parting.', copy: 'The foundation of a beautiful style. Clean sections, carefully considered from the start.', image: media.details, alt: 'Close-up of clean partings as a Triple G stylist braids a client’s hair' },
  { number: '02', title: 'The making.', copy: 'Thoughtful hands. Unhurried attention. Every braid given the care it deserves.', image: media.process, alt: 'An authentic braiding session at Triple G' },
  { number: '03', title: 'The finish.', copy: 'Sculpted lines and a considered finish. The little details make the whole look.', image: media.sculpted, alt: 'Intricate curved cornrows gathered into a braided bun on a Triple G client' },
]
function CraftChapter({chapter}: {chapter: typeof chapters[number]}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({target:ref, offset:['start end','end start']})
  const scale = useTransform(scrollYProgress,[0,1],[1.06,1])
  return <figure ref={ref} className={`craft-chapter chapter-${chapter.number}`}>
    <motion.div className="craft-chapter-image" initial={false} whileInView={reduced ? undefined : {clipPath:['inset(6% 4% 6% 4%)','inset(0% 0% 0% 0%)']}} viewport={{once:true,amount:.2}} transition={{duration:.9,ease:[.22,1,.36,1]}}><motion.div style={reduced ? undefined : {scale}}><Img src={chapter.image} alt={chapter.alt}/></motion.div></motion.div>
    <figcaption><span>{chapter.number}</span><div><h3>{chapter.title}</h3><p>{chapter.copy}</p></div></figcaption>
  </figure>
}
export function CraftStory() {
  return <section className="craft-story shell section-space" id="craft" aria-label="The art of the craft"><div className="craft-story-intro"><p className="section-note">The art of the craft</p><Heading>Beauty begins<br/><em>with the details.</em></Heading><p>Every parting matters. Every movement is intentional. Every detail contributes to a beautiful finish.</p><a href="#transformation" className="text-link">Follow the story <span aria-hidden>↓</span></a></div><div className="craft-chapters">{chapters.map(chapter=><CraftChapter key={chapter.number} chapter={chapter}/>)}</div></section>
}
export function Transformation() {
  return <section className="transformation" id="transformation" aria-label="The transformation"><div className="shell"><div className="transformation-heading"><Reveal><p className="section-note">The transformation</p><Heading>From the first braid<br/><em>to the final look.</em></Heading></Reveal><p>A glimpse of the process.<br/>A celebration of the finish.</p></div><div className="transformation-images"><Reveal className="transformation-process"><Img src={media.process} alt="A stylist working on a Triple G client's braids"/><p>In the making / A moment in the studio</p></Reveal><Reveal className="transformation-finish" delay={.12}><Img src={media.finished} alt="Finished honey-brown boho braids on a Triple G client"/><p>Out in the world / A finished look from our collection</p></Reveal><span className="transformation-word" aria-hidden="true">Beautifully you.</span></div><p className="transformation-note">Different moments. Different clients. The same attention to detail.</p></div></section>
}

