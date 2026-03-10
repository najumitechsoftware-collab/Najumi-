// packages/core/src/cache/pulse/pulse-engine.js

class PulseEngine {

  constructor() {

    this.store = new Map()
    this.tags = new Map()
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0
    }

  }

  /**
   * Generate cache key
   */
  createKey(key) {

    if (typeof key !== "string") {
      throw new Error("Cache key must be a string")
    }

    return key

  }

  /**
   * Set cache value
   */
  set(key, value, options = {}) {

    const cacheKey = this.createKey(key)

    const ttl = options.ttl
      ? Date.now() + (options.ttl * 1000)
      : null

    const entry = {
      value,
      expires: ttl,
      tags: options.tags || []
    }

    this.store.set(cacheKey, entry)

    // register tags
    for (const tag of entry.tags) {

      if (!this.tags.has(tag)) {
        this.tags.set(tag, new Set())
      }

      this.tags.get(tag).add(cacheKey)

    }

    this.stats.sets++

  }

  /**
   * Get cache value
   */
  get(key) {

    const cacheKey = this.createKey(key)

    const entry = this.store.get(cacheKey)

    if (!entry) {

      this.stats.misses++
      return null

    }

    // check expiration
    if (entry.expires && entry.expires < Date.now()) {

      this.delete(cacheKey)

      this.stats.misses++

      return null

    }

    this.stats.hits++

    return entry.value

  }

  /**
   * Delete cache entry
   */
  delete(key) {

    const cacheKey = this.createKey(key)

    const entry = this.store.get(cacheKey)

    if (!entry) return

    // remove tag references
    for (const tag of entry.tags) {

      const set = this.tags.get(tag)

      if (set) {

        set.delete(cacheKey)

        if (set.size === 0) {
          this.tags.delete(tag)
        }

      }

    }

    this.store.delete(cacheKey)

    this.stats.deletes++

  }

  /**
   * Invalidate by tag
   */
  invalidate(tag) {

    const keys = this.tags.get(tag)

    if (!keys) return

    for (const key of keys) {
      this.store.delete(key)
    }

    this.tags.delete(tag)

  }

  /**
   * Clear all cache
   */
  clear() {

    this.store.clear()
    this.tags.clear()

  }

  /**
   * Cache statistics
   */
  getStats() {

    return {
      ...this.stats,
      size: this.store.size
    }

  }

}

let pulseInstance = null

export function initPulse() {

  if (!pulseInstance) {
    pulseInstance = new PulseEngine()
  }

  return pulseInstance

}

export function getPulse() {

  if (!pulseInstance) {
    throw new Error("Pulse cache not initialized")
  }

  return pulseInstance

}