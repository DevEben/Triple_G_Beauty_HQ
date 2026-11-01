import { useEffect, useSyncExternalStore } from 'react'
import { useLocation } from 'react-router-dom'
import { pageSeo, renderSeoHead } from './seo'
const subscribe = () => () => {}
export function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false)
}
export function useSeo(_title?: string, _description?: string) {
  const { pathname } = useLocation()
  useEffect(() => {
    const template = document.createElement('template')
    template.innerHTML = renderSeoHead(pageSeo(pathname))
    document.head.querySelectorAll('title, [data-seo]').forEach(node => node.remove())
    document.head.append(template.content)
  }, [pathname])
}
