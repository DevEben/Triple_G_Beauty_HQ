import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import App from './App'
import './index.css'
import './experience.css'
import './motion.css'
const tree = (
  <StrictMode><MotionConfig reducedMotion="user"><BrowserRouter><App /></BrowserRouter></MotionConfig></StrictMode>)

const root = document.getElementById('root')!
if (root.hasChildNodes()) hydrateRoot(root, tree)
else createRoot(root).render(tree)
