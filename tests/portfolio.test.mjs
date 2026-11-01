import test from 'node:test'
import assert from 'node:assert/strict'
import { portfolioCategory } from '../src/lib/portfolio.ts'

test('unknown or absent category parameters show the complete portfolio', () => {
  for (const value of [null, '', 'unknown', 'Knotless', '<script>']) {
    assert.equal(portfolioCategory(value), null)
  }
})

test('existing category deep links remain selected', () => {
  for (const category of ['knotless', 'cornrows', 'boho', 'kids']) {
    assert.equal(portfolioCategory(category), category)
  }
})
