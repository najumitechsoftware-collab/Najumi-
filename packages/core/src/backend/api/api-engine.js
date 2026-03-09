// packages/core/src/backend/api/api-engine.js

import { registerRoute } from "../../router/route-registry.js"
import { log } from "../../utils/logger.js"

class ApiEngine {

  constructor() {

    this.routes = new Map()

  }

  api(path, handlers) {

    if (!path || typeof path !== "string") {
      throw new Error("API path must be a string")
    }

    if (!handlers || typeof handlers !== "object") {
      throw new Error("Handlers must be an object")
    }

    const supportedMethods = [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE"
    ]

    for (const method of Object.keys(handlers)) {

      const upperMethod = method.toUpperCase()

      if (!supportedMethods.includes(upperMethod)) {

        throw new Error(`Unsupported HTTP method: ${method}`)

      }

      const handler = handlers[method]

      if (typeof handler !== "function") {

        throw new Error(`Handler for ${method} must be a function`)

      }

      const routeKey = `${upperMethod}:${path}`

      this.routes.set(routeKey, handler)

      registerRoute({
        method: upperMethod,
        path,
        handler
      })

      log(`API route registered: ${upperMethod} ${path}`)

    }

  }

  listRoutes() {

    return Array.from(this.routes.keys())

  }

}

export function createApiEngine() {

  return new ApiEngine()

}