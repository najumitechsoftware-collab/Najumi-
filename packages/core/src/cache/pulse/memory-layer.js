// packages/core/src/cache/pulse/memory-layer.js

class MemoryLayer {

  constructor(options = {}) {

    this.store = new Map()

    this.maxSize = options.maxSize || 10000

  }

  /**
   * Set value
   */
  set(key, value, ttl = null) {

    if (this.store.size >= this.maxSize) {
      this.evict()
    }

    const expires = ttl
      ? Date.now() + (ttl * 1000)
      : null

    this.store.set(key, {
      value,
      expires
    })

  }

  /**
   * Get value
   */
  get(key) {

    const entry = this.store.get(key)

    if (!entry) {
      return null
    }

    if (entry.expires && entry.expires < Date.now()) {

      this.store.delete(key)

      return null

    }

    return entry.value

  }

  /**
   * Delete key
   */
  delete(key) {

    this.store.delete(key)

  }

  /**
   * Evict oldest entry
   */
  evict() {

    const firstKey = this.store.keys().next().value

    if (firstKey) {
      this.store.delete(firstKey)
    }

  }

  /**
   * Clear memory cache
   */
  clear() {

    this.store.clear()

  }

  /**
   * Cache size
   */
  size() {

    return this.store.size

  }

}

let memoryLayerInstance = null

export function initMemoryLayer(options = {}) {

  if (!memoryLayerInstance) {
    memoryLayerInstance = new MemoryLayer(options)
  }

  return memoryLayerInstance

}

export function getMemoryLayer() {

  if (!memoryLayerInstance) {
    throw new Error("Memory layer not initialized")
  }

  return memoryLayerInstance

}