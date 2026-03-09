// packages/core/src/router/route-registry.js

export function createRouteRegistry() {

  const routes = []

  function add(method, path, handler) {

    routes.push({
      method,
      path,
      handler
    })

  }

  function getAll() {
    return routes
  }

  function clear() {
    routes.length = 0
  }

  return {

    routes,

    add,
    getAll,
    clear

  }

}