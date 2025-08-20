import { EVENTS } from './consts.js'

function navigate(href) {
  window.history.pushState({}, '', href)
  // Crear un evento personalizado para avisar
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function Link({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === 0 // primary click
    const isModifiedEvent =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    const isManageableEvent = target === undefined || target === '_self'

    if (isMainEvent && isModifiedEvent && !isManageableEvent) {
      event.preventDefault()
      navigate(to) // Navegacion con spa
    }
  }

  return <a onClick={handleClick} href={to} target={target} {...props}></a>
}
