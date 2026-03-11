// packages/frontend/src/view/state/state-engine.js

class StateEngine {

  constructor() {

    this.state = Object.create(null)

    this.subscribers = new Map()

  }

  /*
  Validate state key
  */
  validateKey(key) {

    if (!key || typeof key !== "string") {
      throw new Error("Invalid state key")
    }

    if (key.length > 100) {
      throw new Error("State key too long")
    }

    if (key.includes("__proto__")) {
      throw new Error("Unsafe state key")
    }

    return key

  }

  /*
  Set state value
  */
  set(key, value) {

    key = this.validateKey(key)

    const oldValue = this.state[key]

    if (oldValue === value) {
      return
    }

    this.state[key] = value

    this.notify(key, value)

  }

  /*
  Get state
  */
  get(key) {

    key = this.validateKey(key)

    return this.state[key]

  }

  /*
  Subscribe to state
  */
  subscribe(key, fn) {

    key = this.validateKey(key)

    if (typeof fn !== "function") {
      throw new Error("Subscriber must be a function")
    }

    if (!this.subscribers.has(key)) {

      this.subscribers.set(key, new Set())

    }

    this.subscribers.get(key).add(fn)

  }

  /*
  Unsubscribe
  */
  unsubscribe(key, fn) {

    key = this.validateKey(key)

    if (!this.subscribers.has(key)) {
      return
    }

    this.subscribers.get(key).delete(fn)

  }

  /*
  Notify subscribers
  */
  notify(key, value) {

    const subs = this.subscribers.get(key)

    if (!subs || subs.size === 0) {
      return
    }

    for (const fn of subs) {

      try {

        fn(value)

      } catch (err) {

        console.error("Najumi state subscriber error:", err)

      }

    }

  }

  /*
  Batch update
  */
  batch(updates) {

    if (!updates || typeof updates !== "object") {
      throw new Error("Batch updates must be an object")
    }

    const keys = Object.keys(updates)

    for (const key of keys) {

      const safeKey = this.validateKey(key)

      this.state[safeKey] = updates[key]

    }

    for (const key of keys) {

      this.notify(key, updates[key])

    }

  }

  /*
  Get full state snapshot
  */
  snapshot() {

    return { ...this.state }

  }

  /*
  Clear state
  */
  reset() {

    this.state = Object.create(null)

    this.subscribers.clear()

  }

}

let stateInstance = null

export function initState() {

  if (!stateInstance) {

    stateInstance = new StateEngine()

  }

  return stateInstance

}

export function getState() {

  if (!stateInstance) {

    throw new Error("State engine not initialized")

  }

  return stateInstance

}