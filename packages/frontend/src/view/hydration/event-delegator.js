// packages/frontend/src/view/hydration/event-delegator.js

const delegatedEvents = new Map()

function validateEventType(eventType) {

  if (!eventType || typeof eventType !== "string") {
    throw new Error("Invalid event type")
  }

  if (!/^[a-zA-Z]+$/.test(eventType)) {
    throw new Error("Unsafe event type")
  }

  return eventType

}

function validateHandler(handler) {

  if (typeof handler !== "function") {
    throw new Error("Event handler must be a function")
  }

}

/*
Attach delegated event to root
*/
function ensureDelegated(eventType) {

  const type = validateEventType(eventType)

  if (delegatedEvents.has(type)) {
    return
  }

  const listener = (event) => {

    let target = event.target

    while (target && target !== document) {

      const action = target.dataset?.action

      if (action && target.__najumiHandler) {

        try {

          target.__najumiHandler(event)

        } catch (err) {

          console.error("Najumi event handler error:", err)

        }

        return
      }

      target = target.parentElement

    }

  }

  document.addEventListener(type, listener, true)

  delegatedEvents.set(type, listener)

}

/*
Delegate event for element
*/
export function delegateEvent(element, eventType, handler) {

  validateHandler(handler)

  const type = validateEventType(eventType)

  ensureDelegated(type)

  element.__najumiHandler = handler

}

/*
Remove delegated handler
*/
export function removeDelegatedEvent(element) {

  if (!element) return

  delete element.__najumiHandler

}

/*
List delegated events
*/
export function listDelegatedEvents() {

  return Array.from(delegatedEvents.keys())

}

/*
Clear all events (dev mode)
*/
export function clearDelegatedEvents() {

  for (const [type, listener] of delegatedEvents) {

    document.removeEventListener(type, listener, true)

  }

  delegatedEvents.clear()

}