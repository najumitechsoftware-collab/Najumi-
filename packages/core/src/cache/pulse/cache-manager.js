// packages/core/src/cache/pulse/cache-manager.js

import { getPulse } from "./pulse-engine.js"

class CacheManager {

  constructor() {

    this.pulse = getPulse()

  }

  /**
   * Generate safe cache key
   */
  createKey(prefix, input) {

    if (!input) return prefix

    if (typeof input === "string") {
      return `${prefix}:${input}`
    }

    return `${prefix}:${JSON.stringify(input)}`

  }

  /**
   * Wrap async function with cache
   */
  async remember(key, fn, options = {}) {

    const cacheKey = this.createKey("cache", key)

    const cached = this.pulse.get(cacheKey)

    if (cached !== null) {
      return cached
    }

    const result = await fn()

    this.pulse.set(cacheKey, result, {
      ttl: options.ttl || 30,
      tags: options.tags || []
    })

    return result

  }

  /**
   * API caching helper
   */
  async cacheApi(route, handler, options = {}) {

    return async (req, res) => {

      const key = this.createKey(
        `api:${route}`,
        req.url
      )

      const cached = this.pulse.get(key)

      if (cached !== null) {

        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(cached))

        return true

      }

      const data = await handler(req, res)

      if (data !== undefined) {

        this.pulse.set(key, data, {
          ttl: options.ttl || 30,
          tags: options.tags || [route]
        })

      }

      return data

    }

  }

  /**
   * Database query caching
   */
  async cacheQuery(model, queryKey, queryFn, options = {}) {

    const key = this.createKey(
      `query:${model}`,
      queryKey
    )

    const cached = this.pulse.get(key)

    if (cached !== null) {
      return cached
    }

    const result = await queryFn()

    this.pulse.set(key, result, {
      ttl: options.ttl || 30,
      tags: options.tags || [model]
    })

    return result

  }

  /**
   * Invalidate by tag
   */
  invalidate(tag) {

    this.pulse.invalidate(tag)

  }

  /**
   * Clear all cache
   */
  clear() {

    this.pulse.clear()

  }

}

let cacheManagerInstance = null

export function initCacheManager() {

  if (!cacheManagerInstance) {
    cacheManagerInstance = new CacheManager()
  }

  return cacheManagerInstance

}

export function getCacheManager() {

  if (!cacheManagerInstance) {
    throw new Error("CacheManager not initialized")
  }

  return cacheManagerInstance

}