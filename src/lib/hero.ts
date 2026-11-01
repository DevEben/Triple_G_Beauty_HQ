/** Caption changes coincide with the midpoint of each scroll crossfade. */
export function heroChapter(progress: number): number {
  return progress < 0.28 ? 0 : progress < 0.68 ? 1 : 2
}

export const HERO_AUTOPLAY_DURATION = 17100
const clamp = (value: number) => Math.min(1, Math.max(0, value))
/** Reverse through the same choreography so each loop has no hard visual reset. */
export function heroAutoplayProgress(elapsed: number): number {
  const cycle = Math.max(0, elapsed) % (HERO_AUTOPLAY_DURATION * 2)
  elapsed = cycle > HERO_AUTOPLAY_DURATION ? HERO_AUTOPLAY_DURATION * 2 - cycle : cycle
  const stops = [[0,0],[4500,.08],[6300,.46],[10800,.52],[12600,.88],[HERO_AUTOPLAY_DURATION,1]]
  if (elapsed <= 0) return 0
  for (let index=1;index<stops.length;index++) {
    const [end,value]=stops[index]
    const [start,previous]=stops[index-1]
    if(elapsed<=end){
      const fraction=clamp((elapsed-start)/(end-start))
      const eased=index===2||index===4 ? fraction*fraction*(3-2*fraction) : fraction
      return previous+(value-previous)*eased
    }
  }
  return 1
}
/** Keep the current frame when scrolling takes over instead of snapping to Craft. */
export function heroScrollProgress(scroll: number, anchorScroll: number, anchorStory: number): number {
  const position=clamp(scroll), anchor=clamp(anchorScroll), story=clamp(anchorStory)
  if(position>=anchor) return anchor===1 ? story : clamp(story+(1-story)*(position-anchor)/(1-anchor))
  return anchor===0 ? story : clamp(story*position/anchor)
}
