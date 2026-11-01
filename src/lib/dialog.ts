import type { KeyboardEvent } from 'react'

/** Keep keyboard focus cycling through an open modal's interactive controls. */
export function trapDialogFocus(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== 'Tab') return
  const controls = event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]')
  const first = controls[0]
  const last = controls[controls.length - 1]
  const active = event.currentTarget.ownerDocument.activeElement
  if (event.shiftKey && active === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first?.focus()
  }
}
