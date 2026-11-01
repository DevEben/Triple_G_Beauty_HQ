import test from 'node:test'
import assert from 'node:assert/strict'
import { heroAutoplayProgress, heroScrollProgress, HERO_AUTOPLAY_DURATION } from '../src/lib/hero.ts'

test('automatic story holds each readable chapter before its transition',()=>{
 assert.equal(HERO_AUTOPLAY_DURATION,17100)
 for(const [time,expected] of [[0,0],[4500,.08],[6300,.46],[10800,.52],[12600,.88],[17100,1]]) assert.ok(Math.abs(heroAutoplayProgress(time)-expected)<1e-9)
})
test('automatic story loops smoothly through detail and back to craft',()=>{
 assert.equal(heroAutoplayProgress(-100),0)
 assert.equal(heroAutoplayProgress(HERO_AUTOPLAY_DURATION*2),0)
 assert.equal(heroAutoplayProgress(HERO_AUTOPLAY_DURATION+6300),heroAutoplayProgress(HERO_AUTOPLAY_DURATION-6300))
 for(const boundary of [HERO_AUTOPLAY_DURATION,HERO_AUTOPLAY_DURATION*2]) assert.ok(Math.abs(heroAutoplayProgress(boundary-1)-heroAutoplayProgress(boundary+1))<.001)
 let previous=0
 for(let time=0;time<=HERO_AUTOPLAY_DURATION;time+=50){const progress=heroAutoplayProgress(time);assert.ok(progress>=previous&&progress<=1);previous=progress}
})
test('scroll takeover preserves the current story frame then moves in either direction',()=>{
 assert.equal(heroScrollProgress(.2,.2,.46),.46)
 assert.ok(Math.abs(heroScrollProgress(.6,.2,.46)-.73)<1e-9)
 assert.equal(heroScrollProgress(.1,.2,.46),.23)
 assert.equal(heroScrollProgress(1,.2,.46),1)
 assert.equal(heroScrollProgress(0,.2,.46),0)
})
test('takeover at the page boundaries stays finite and clamped',()=>{
 assert.equal(heroScrollProgress(0,0,.46),.46)
 assert.equal(heroScrollProgress(1,1,.94),.94)
 for(const progress of [-1,0,.5,1,2]) assert.ok(Number.isFinite(heroScrollProgress(progress,0,.94)))
})

