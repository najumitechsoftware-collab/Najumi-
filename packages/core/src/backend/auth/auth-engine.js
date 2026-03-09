// packages/core/src/backend/auth/auth-engine.js

import { log } from "../../utils/logger.js"

class AuthEngine {

  constructor() {

    // store authentication strategies
    this.strategies = new Map()

  }

  /**
   * Register authentication strategy
   */
  registerStrategy(name, strategy) {

    if (!name || typeof name !== "string") {
      throw new Error("Auth strategy name must be a string")
    }

    if (typeof strategy !== "object") {
      throw new Error(`Invalid auth strategy: ${name}`)
    }

    if (this.strategies.has(name)) {
      throw new Error(`Auth strategy already registered: ${name}`)
    }

    this.strategies.set(name, strategy)

    log(`Auth strategy registered: ${name}`)

  }

  /**
   * Check if strategy exists
   */
  hasStrategy(name) {

    return this.strategies.has(name)

  }

  /**
   * List strategies
   */
  listStrategies() {

    return Array.from(this.strategies.keys())

  }

  /**
   * Authenticate request
   */
  async authenticate(req) {

    for (const [name, strategy] of this.strategies.entries()) {

      try {

        if (typeof strategy.authenticate !== "function") {
          continue
        }

        const result = await strategy.authenticate(req)

        if (result) {

          return {
            strategy: name,
            user: result
          }

        }

      } catch (error) {

        log(`Auth strategy failed: ${name}`)

      }

    }

    return null

  }

  /**
   * Attach authenticated user to request
   */
  async attachUser(req) {

    const authResult = await this.authenticate(req)

    if (!authResult) {
      return null
    }

    req.user = authResult.user

    return authResult.user

  }

}

export function createAuthEngine() {

  return new AuthEngine()

}