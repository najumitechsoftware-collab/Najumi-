// packages/frontend/src/view/state/state-engine.js

class StateEngine {

  constructor() {

    this.state = {}

    this.subscribers = new Map()

  }

  /*
  Set state value
  */
  set(key, value) {

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

    return this.state[key]

  }

  /*
  Subscribe to state
  */
  subscribe(key, fn) {

    if (!this.subscribers.has(key)) {

      this.subscribers.set(key, new Set())

    }

    this.subscribers.get(key).add(fn)

  }

  /*
  Unsubscribe
  */
  unsubscribe(key, fn) {

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

    if (!subs) {
      return
    }

    for (const fn of subs) {

      try {

        fn(value)

      } catch (err) {

        console.error("State subscriber error:", err)

      }

    }

  }

  /*
  Batch update
  */
  batch(updates) {

    const keys = Object.keys(updates)

    keys.forEach(key => {

      this.state[key] = updates[key]

    })

    keys.forEach(key => {

      this.notify(key, updates[key])

    })

  }

  /*
  Clear state
  */
  reset() {

    this.state = {}

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