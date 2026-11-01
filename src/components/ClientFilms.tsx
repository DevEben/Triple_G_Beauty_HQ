import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { videos } from '../config'
import { Heading } from './Motion'
function ClientFilm({film,index,onPlay}: {film:typeof videos[number];index:number;onPlay:(video:HTMLVideoElement)=>void}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [failed,setFailed] = useState(false)
  useEffect(()=>{
    const video = ref.current
    if (!video) return
    const observer = new IntersectionObserver(([entry])=>{if (!entry.isIntersecting) video.pause()}, {threshold:0})
    observer.observe(video)
    const pause = ()=>{if(document.hidden) video.pause()}
    document.addEventListener('visibilitychange',pause)
    return ()=>{observer.disconnect(); document.removeEventListener('visibilitychange',pause); video.pause()}
  },[])
  return <figure className="client-film"><div className="client-film-frame"><video ref={ref} controls playsInline preload="none" poster={film.poster} src={film.src} aria-label={film.label} onPlay={event=>onPlay(event.currentTarget)} onError={()=>setFailed(true)}/></div><figcaption><span>0{index+1}</span><div><h3>{film.label}</h3><p>Real clients. Real Triple G work.</p></div></figcaption>{failed && <p role="status">This film couldn’t load. <a href={film.src} className="text-link">Open the film <ArrowUpRight size={15}/></a></p>}</figure>
}
export function ClientFilms() {
  const rail = useRef<HTMLDivElement>(null)
  const onPlay = (current:HTMLVideoElement)=>{rail.current?.querySelectorAll('video').forEach(video=>{if(video!==current) video.pause()})}
  const move = (direction:number)=>{const el=rail.current; if(el) el.scrollBy({left:direction*el.clientWidth*.8,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
  return <section className="client-films section-space" id="films" aria-label="Client films"><div className="shell"><div className="section-heading"><div><p className="section-note">The looks, in motion</p><Heading>A little movement.<br/><em>A lot of personality.</em></Heading></div><div className="film-controls"><p>Five moments from the Triple G chair.<br/>Swipe to explore. Press play to watch.</p><div><button type="button" onClick={()=>move(-1)} aria-label="Previous client films"><ArrowLeft size={20}/></button><button type="button" onClick={()=>move(1)} aria-label="Next client films"><ArrowRight size={20}/></button></div></div></div><div ref={rail} className="client-film-rail" role="region" aria-label="Client films, scroll horizontally for more" tabIndex={0}>{videos.map((film,index)=><ClientFilm key={film.src} film={film} index={index} onPlay={onPlay}/>)}</div><p className="film-footnote">Sound and playback are yours to control.</p></div></section>
}

