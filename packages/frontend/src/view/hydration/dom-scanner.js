// packages/frontend/src/view/hydration/dom-scanner.js

const SCAN_SELECTOR = "[data-action]"

/*
Validate element safety
*/
function validateInteractiveElement(el) {

  if (!el) return false

  if (el.nodeType !== 1) return false

  if (!el.dataset) return false

  if (!el.dataset.action) return false

  return true

}

/*
Scan DOM for interactive elements
*/
export function scanInteractiveElements(root = document) {

  if (!root || typeof root.querySelectorAll !== "function") {
    throw new Error("Invalid DOM root")
  }

  const nodes = root.querySelectorAll(SCAN_SELECTOR)

  const elements = []

  for (let i = 0; i < nodes.length; i++) {

    const el = nodes[i]

    if (!validateInteractiveElement(el)) {
      continue
    }

    elements.push(el)

  }

  return elements

}

/*
Scan single element subtree
*/
export function scanElementSubtree(element) {

  if (!element) return []

  return scanInteractiveElements(element)

}