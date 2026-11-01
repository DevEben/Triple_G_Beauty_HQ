import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Detail from './pages/Detail'

export default function App() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) {
      const timer = window.setTimeout(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView(), 60)
      return () => window.clearTimeout(timer)
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])
  return <MotionConfig reducedMotion="user"><a href="#main" className="skip-link">Skip to content</a><Nav /><Routes><Route path="/" element={<Home />} /><Route path="/portfolio" element={<Portfolio />} /><Route path="/portfolio/:slug" element={<Detail />} /><Route path="*" element={<Detail />} /></Routes><Footer /></MotionConfig>
}
