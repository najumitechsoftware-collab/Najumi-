// packages/core/src/router/router-engine.js

import { createRouteRegistry } from "./route-registry.js"
import { matchRoute } from "./route-matcher.js"

export function createRouterEngine() {

  const registry = createRouteRegistry()

  async function handle(req, res) {

    const { url, method } = req

    const match = matchRoute(registry.routes, method, url)

    if (!match) {
      return false
    }

    const { handler, params } = match

    req.params = params || {}

    await handler(req, res)

    return true

  }

  function get(path, handler) {
    registry.add("GET", path, handler)
  }

  function post(path, handler) {
    registry.add("POST", path, handler)
  }

  function put(path, handler) {
    registry.add("PUT", path, handler)
  }

  function del(path, handler) {
    registry.add("DELETE", path, handler)
  }

  return {

    handle,

    get,
    post,
    put,
    delete: del,

    routes: registry.routes

  }

}