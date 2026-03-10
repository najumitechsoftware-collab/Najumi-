// packages/core/src/cache/pulse/invalidation-system.js

import { getPulse } from "./pulse-engine.js"

class InvalidationSystem {

  constructor() {

    this.pulse = getPulse()
    this.listeners = new Map()

  }

  /**
   * Register listener for a data source
   */
  on(event, handler) {

    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }

    this.listeners.get(event).add(handler)

  }

  /**
   * Emit event
   */
  emit(event, payload) {

    const handlers = this.listeners.get(event)

    if (!handlers) return

    for (const handler of handlers) {

      try {
        handler(payload)
      } catch (err) {
        // fail silently to avoid breaking runtime
      }

    }

  }

  /**
   * Database change event
   */
  onDatabaseChange(model) {

    this.pulse.invalidate(model)

  }

  /**
   * Register database hooks
   */
  watchDatabase(atlas) {

    if (!atlas || typeof atlas.on !== "function") {
      return
    }

    atlas.on("create", ({ model }) => {
      this.onDatabaseChange(model)
    })

    atlas.on("update", ({ model }) => {
      this.onDatabaseChange(model)
    })

    atlas.on("delete", ({ model }) => {
      this.onDatabaseChange(model)
    })

  }

  /**
   * Manual invalidation
   */
  invalidate(tag) {

    this.pulse.invalidate(tag)

  }

}

let invalidationInstance = null

export function initInvalidationSystem() {

  if (!invalidationInstance) {
    invalidationInstance = new InvalidationSystem()
  }

  return invalidationInstance

}

export function getInvalidationSystem() {

  if (!invalidationInstance) {
    throw new Error("Invalidation system not initialized")
  }

  return invalidationInstance

}