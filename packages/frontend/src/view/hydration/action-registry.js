// packages/frontend/src/view/hydration/action-registry.js

const actionRegistry = new Map()

function validateActionName(name) {

  if (!name || typeof name !== "string") {
    throw new Error("Invalid action name")
  }

  if (name.length > 100) {
    throw new Error("Action name too long")
  }

  if (!/^[a-zA-Z0-9_\-]+$/.test(name)) {
    throw new Error("Invalid action name format")
  }

  return name

}

function validateHandler(handler) {

  if (typeof handler !== "function") {
    throw new Error("Action handler must be a function")
  }

  return handler

}

/*
Register new action
*/
export function registerAction(name, handler) {

  const actionName = validateActionName(name)

  const actionHandler = validateHandler(handler)

  if (actionRegistry.has(actionName)) {
    console.warn(`Najumi action already registered: ${actionName}`)
    return
  }

  actionRegistry.set(actionName, actionHandler)

}

/*
Get action handler
*/
export function getActionHandler(name) {

  if (!name) return null

  return actionRegistry.get(name) || null

}

/*
Remove action
*/
export function removeAction(name) {

  const actionName = validateActionName(name)

  actionRegistry.delete(actionName)

}

/*
List all registered actions
*/
export function listActions() {

  return Array.from(actionRegistry.keys())

}

/*
Clear registry (dev mode)
*/
export function clearActions() {

  actionRegistry.clear()

}