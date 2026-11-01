import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { animate, useInView, useMotionValue, useMotionValueEvent, type MotionValue } from 'motion/react'
import { heroAutoplayProgress, heroChapter, heroScrollProgress } from './hero'

type PlaybackStatus = 'playing' | 'paused' | 'manual' | 'selecting'
export function useHeroPlayback(journey: RefObject<HTMLElement>, scroll: MotionValue<number>, hydrated: boolean, reduced: boolean | null) {
  const progress=useMotionValue(0)
  const [active,setActive]=useState(0)
  const [status,setStatus]=useState<PlaybackStatus>('playing')
  const [tabVisible,setTabVisible]=useState(true)
  const inView=useInView(journey,{amount:'some'})
  const mode=useRef<PlaybackStatus>('playing')
  const elapsed=useRef(0)
  const initiallyChecked=useRef(false)
  const anchor=useRef({scroll:0,story:0})
  const selection=useRef<{stop:()=>void}|null>(null)
  const changeStatus=useCallback((next:PlaybackStatus)=>{mode.current=next;setStatus(next)},[])

  useMotionValueEvent(progress,'change',value=>setActive(heroChapter(value)))
  useMotionValueEvent(scroll,'change',next=>{
    if(!hydrated||reduced){progress.set(next);return}
    if(mode.current!=='manual'){
      selection.current?.stop()
      anchor.current={scroll:scroll.getPrevious()??next,story:progress.get()}
      changeStatus('manual')
    }
    progress.set(heroScrollProgress(next,anchor.current.scroll,anchor.current.story))
  })

  useEffect(()=>{
    const update=()=>setTabVisible(!document.hidden)
    update();document.addEventListener('visibilitychange',update)
    return ()=>document.removeEventListener('visibilitychange',update)
  },[])
  useEffect(()=>{
    if(!hydrated||reduced||initiallyChecked.current)return
    initiallyChecked.current=true
    if(window.scrollY>8){
      const value=scroll.get()
      anchor.current={scroll:value,story:value};progress.set(value);changeStatus('manual')
    }
  },[hydrated,reduced,scroll,progress,changeStatus])
  useEffect(()=>{
    if(!hydrated||reduced||!inView||!tabVisible||status!=='playing'||mode.current!=='playing')return
    let cancelled=false, frame=0, previous:number|null=null
    const tick=(time:number)=>{
      if(cancelled||mode.current!=='playing'||document.hidden)return
      if(previous!==null)elapsed.current+=time-previous
      previous=time
      progress.set(heroAutoplayProgress(elapsed.current))
      frame=requestAnimationFrame(tick)
    }
    const images=Array.from(journey.current?.querySelectorAll<HTMLImageElement>('.cinema-camera img')??[])
    Promise.allSettled(images.map(image=>image.decode())).then(()=>{
      if(!cancelled&&mode.current==='playing')frame=requestAnimationFrame(tick)
    })
    return ()=>{cancelled=true;cancelAnimationFrame(frame)}
  },[hydrated,reduced,inView,tabVisible,status,journey,progress,changeStatus])
  useEffect(()=>()=>selection.current?.stop(),[])

  const selectScene=(index:number)=>{
    selection.current?.stop();changeStatus('selecting')
    const target=[0,.46,.94][index]??0
    selection.current=animate(progress,target,{duration:1.6,ease:[.22,1,.36,1],onComplete:()=>{
      if(mode.current!=='selecting')return
      anchor.current={scroll:scroll.get(),story:target};changeStatus('manual')
    }})
  }
  const pauseForFocus=()=>{if(mode.current==='playing')changeStatus('paused')}
  const resumeAfterFocus=()=>{if(mode.current==='paused')changeStatus('playing')}
  return {progress,active,status,selectScene,pauseForFocus,resumeAfterFocus}
}


