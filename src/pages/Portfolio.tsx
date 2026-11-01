import { forwardRef, useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { categories, portfolio, type CategoryId, type PortfolioItem } from '../config'
import { portfolioCategory } from '../lib/portfolio'
import { useHydrated, useSeo } from '../lib/hooks'
import { Img } from '../components/Img'
import { Lightbox } from '../components/Lightbox'
import { ease, Heading, Page, Reveal } from '../components/Motion'
import { Booking } from './Home'

const GalleryItem=forwardRef<HTMLLIElement,{item:PortfolioItem;index:number;onOpen:()=>void}>(function GalleryItem({item,index,onOpen},ref) {
 const reduced=useReducedMotion()
 const order=portfolio.findIndex(look=>look.id===item.id)
 return <motion.li ref={ref} layout={reduced ? false : 'position'} data-crop={order%4===3?'square':order%3===1?'tall':'portrait'} className="portfolio-piece" initial={reduced ? false : {opacity:0,scale:.96,y:20}} animate={{opacity:1,scale:1,y:0}} exit={reduced ? undefined : {opacity:0,scale:.95,transition:{duration:.18}}} transition={{duration:.5,ease,delay:Math.min(index%3*.05,.1),layout:{duration:.55,ease}}}><Reveal delay={Math.min(index%3*.05,.1)}><button onClick={onOpen} className="gallery-image" aria-label={`Open ${item.title}`}><Img src={item.coverImage} alt={item.title} eager={index<3}/><span className="image-action"><ArrowUpRight size={20}/></span></button></Reveal><div className="gallery-caption"><div><span>{categories.find(category=>category.id===item.category)?.label}</span><Link to={`/portfolio/${item.slug}`}>{item.title}</Link></div><Link to={`/portfolio/${item.slug}`} className="gallery-detail-link" aria-label={`View details for ${item.title}`}><ArrowUpRight size={21}/></Link></div></motion.li>
})
export default function Portfolio() {
 useSeo()
 const [params,setParams]=useSearchParams()
 const hydrated=useHydrated()
 const reduced=useReducedMotion()
 const cat=portfolioCategory(hydrated?params.get('category'):null)
 const [open,setOpen]=useState<number|null>(null)
 const previousCategory=useRef(cat)
 useEffect(()=>{if(previousCategory.current!==cat){setOpen(null);previousCategory.current=cat}},[cat])
 const list=cat?portfolio.filter(item=>item.category===cat):portfolio
 const filters:{id:CategoryId|null;label:string}[]=[{id:null,label:'All looks'},...categories]
 return <Page><section className="portfolio-section shell"><div className="portfolio-intro"><div><Link to="/" className="breadcrumb">Triple G / The collection</Link><Heading as="h1">A look.<br/><em>A feeling. You.</em></Heading></div><p>Real people. Beautiful braids.<br/>Find a little inspiration for your next chapter.</p></div><div className="gallery-toolbar"><div role="group" aria-label="Filter by style" className="gallery-filters">{filters.map(filter=><button type="button" key={filter.label} aria-pressed={cat===filter.id} onClick={()=>{setOpen(null);setParams(filter.id?{category:filter.id}:{})}}>{cat===filter.id&&<motion.span className="filter-indicator" layoutId="active-style" transition={reduced?{duration:0}:{duration:.35,ease}}/>}<span className="filter-label">{filter.label}</span></button>)}</div><p aria-live="polite" aria-atomic="true" className="gallery-count">{list.length} looks</p></div><ul className="portfolio-grid"><AnimatePresence initial={false} mode="popLayout">{list.map((item,index)=><GalleryItem key={item.id} item={item} index={index} onOpen={()=>setOpen(index)}/>)}</AnimatePresence></ul></section><Booking/>{open!==null&&list[open]&&<Lightbox items={list} index={open} onClose={()=>setOpen(null)} onChange={setOpen}/>}</Page>
}
