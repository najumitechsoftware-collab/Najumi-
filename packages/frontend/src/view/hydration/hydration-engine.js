// packages/frontend/src/view/hydration/hydration-engine.js

import { scanInteractiveElements } from "./dom-scanner.js"
import { getActionHandler } from "./action-registry.js"
import { delegateEvent } from "./event-delegator.js"

const hydrationCache = new WeakSet()

function validateElement(el) {

  if (!el) return false

  if (el.nodeType !== 1) return false

  if (!el.dataset) return false

  return true

}

function hydrateElement(el) {

  if (!validateElement(el)) return

  if (hydrationCache.has(el)) return

  const action = el.dataset.action

  if (!action) return

  const handler = getActionHandler(action)

  if (!handler) {
    console.warn(`Najumi hydration: handler not found for action "${action}"`)
    return
  }

  const eventType = el.dataset.event || "click"

  delegateEvent(el, eventType, handler)

  hydrationCache.add(el)

}

/*
Hydrate DOM subtree
*/
function hydrateElements(elements) {

  for (const el of elements) {

    try {

      hydrateElement(el)

    } catch (err) {

      console.error("Hydration error:", err)

    }

  }

}

/*
Main hydration entry
*/
export function startHydration(root = document) {

  if (!root || typeof root.querySelectorAll !== "function") {
    throw new Error("Invalid hydration root")
  }

  const elements = scanInteractiveElements(root)

  hydrateElements(elements)

}

/*
Rehydrate dynamic content
*/
export function rehydrate(root = document) {

  startHydration(root)

}

/*
Clear hydration cache (dev mode)
*/
export function clearHydrationCache() {

  hydrationCache.clear()

}