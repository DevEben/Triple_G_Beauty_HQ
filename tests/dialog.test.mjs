import test from 'node:test'
import assert from 'node:assert/strict'
import { trapDialogFocus } from '../src/lib/dialog.ts'

function keyEvent(active, shiftKey = false, key = 'Tab') {
  const nodes = Array.from({ length: 3 }, (_, index) => ({ focus() { event.focused = index } }))
  const event = {
    key, shiftKey, focused: null, prevented: false,
    currentTarget: { querySelectorAll: () => nodes, ownerDocument: { activeElement: nodes[active] } },
    preventDefault() { event.prevented = true },
  }
  return event
}

test('Shift Tab on the first dialog control wraps to the last', () => {
  const event = keyEvent(0, true)
  trapDialogFocus(event)
  assert.equal(event.focused, 2)
  assert.equal(event.prevented, true)
})
test('Tab on the last dialog control wraps to the first', () => {
  const event = keyEvent(2)
  trapDialogFocus(event)
  assert.equal(event.focused, 0)
  assert.equal(event.prevented, true)
})
test('ordinary tabbing and other keys keep their native behavior', () => {
  for (const event of [keyEvent(1), keyEvent(0, false, 'Escape')]) {
    trapDialogFocus(event)
    assert.equal(event.prevented, false)
  }
})
