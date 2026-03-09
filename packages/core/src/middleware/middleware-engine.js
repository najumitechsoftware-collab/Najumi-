// packages/core/src/middleware/middleware-engine.js

import { createMiddlewareRegistry } from "./middleware-registry.js"
import { runMiddlewareStack } from "./middleware-runner.js"

export function createMiddlewareEngine() {

  const registry = createMiddlewareRegistry()

  async function handle(req, res) {

    const stack = registry.getAll()

    if (!stack.length) {
      return true
    }

    const result = await runMiddlewareStack(stack, req, res)

    return result !== false

  }

  function use(middleware) {

    if (typeof middleware !== "function") {
      throw new Error("Middleware must be a function")
    }

    registry.add(middleware)

  }

  function clear() {
    registry.clear()
  }

  return {

    use,
    handle,
    clear,

    middlewares: registry.middlewares

  }

}