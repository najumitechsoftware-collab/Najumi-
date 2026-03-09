// packages/core/src/middleware/middleware-registry.js

export function createMiddlewareRegistry() {

  const middlewares = []

  function add(middleware) {

    if (typeof middleware !== "function") {
      throw new Error("Middleware must be a function")
    }

    middlewares.push(middleware)

  }

  function getAll() {
    return middlewares
  }

  function clear() {
    middlewares.length = 0
  }

  function count() {
    return middlewares.length
  }

  return {

    middlewares,

    add,
    getAll,
    clear,
    count

  }

}