// packages/core/src/backend/api/api-router.js

import { log } from "../../utils/logger.js"

class ApiRouter {

  constructor() {

    // store routes
    this.routes = new Map()

  }

  /**
   * register route
   */
  register(method, path, handler) {

    const upperMethod = method.toUpperCase()

    const key = `${upperMethod}:${this.sanitizePath(path)}`

    this.routes.set(key, handler)

    log(`API Router registered: ${upperMethod} ${path}`)

  }

  /**
   * sanitize path for security
   */
  sanitizePath(path) {

    if (!path || typeof path !== "string") {
      throw new Error("Invalid API path")
    }

    // remove trailing slash
    if (path.length > 1 && path.endsWith("/")) {
      path = path.slice(0, -1)
    }

    return path

  }

  /**
   * match route
   */
  match(method, path) {

    const key = `${method.toUpperCase()}:${this.sanitizePath(path)}`

    return this.routes.get(key)

  }

  /**
   * handle incoming request
   */
  async handle(req, res) {

    try {

      const method = req.method
      const url = new URL(req.url, `http://${req.headers.host}`)
      const path = url.pathname

      const handler = this.match(method, path)

      if (!handler) {
        return false
      }

      await handler(req, res)

      return true

    } catch (error) {

      console.error("API Router error:", error)

      res.statusCode = 500
      res.end("Internal server error")

      return true

    }

  }

  /**
   * list all routes
   */
  listRoutes() {

    return Array.from(this.routes.keys())

  }

}

export function createApiRouter() {

  return new ApiRouter()

}