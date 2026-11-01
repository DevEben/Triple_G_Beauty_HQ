/** Caption changes coincide with the midpoint of each scroll crossfade. */
export function heroChapter(progress: number): number {
  return progress < 0.28 ? 0 : progress < 0.68 ? 1 : 2
}
