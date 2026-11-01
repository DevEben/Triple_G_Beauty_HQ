import test from 'node:test'
import assert from 'node:assert/strict'
import { heroChapter } from '../src/lib/hero.ts'

test('scroll selects the craft, finished look and detail scenes', () => {
  assert.equal(heroChapter(0), 0)
  assert.equal(heroChapter(0.45), 1)
  assert.equal(heroChapter(0.9), 2)
})
test('scroll outside the journey stays at the first or final chapter', () => {
  assert.equal(heroChapter(-1), 0)
  assert.equal(heroChapter(2), 2)
})

