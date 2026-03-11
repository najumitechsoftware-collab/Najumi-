// packages/core/src/app/router/application-router.js

class RouteNode {

  constructor() {
    this.children = new Map()
    this.handler = null
    this.paramName = null
  }

}

class ApplicationRouter {

  constructor() {

    this.root = new RouteNode()

  }

  /*
  Normalize path for security
  */
  normalizePath(path) {

    if (!path || typeof path !== "string") {
      throw new Error("Invalid route path")
    }

    if (path.includes("..")) {
      throw new Error("Invalid route path")
    }

    path = path.trim()

    if (!path.startsWith("/")) {
      path = "/" + path
    }

    return path.replace(/\/+/g, "/")

  }

  /*
  Register route
  */
  add(path, handler) {

    path = this.normalizePath(path)

    const segments = path.split("/").filter(Boolean)

    let node = this.root

    for (const segment of segments) {

      let key = segment

      let paramName = null

      if (segment.startsWith(":")) {
        key = ":param"
        paramName = segment.slice(1)
      }

      if (!node.children.has(key)) {
        node.children.set(key, new RouteNode())
      }

      node = node.children.get(key)

      if (paramName) {
        node.paramName = paramName
      }

    }

    node.handler = handler

  }

  /*
  Match route
  */
  match(path) {

    path = this.normalizePath(path)

    const segments = path.split("/").filter(Boolean)

    let node = this.root

    const params = {}

    for (const segment of segments) {

      if (node.children.has(segment)) {

        node = node.children.get(segment)

      } else if (node.children.has(":param")) {

        node = node.children.get(":param")

        params[node.paramName] = segment

      } else {

        return null

      }

    }

    if (!node.handler) return null

    return {
      handler: node.handler,
      params
    }

  }

  /*
  Handle HTTP request
  */
  async handle(req, res) {

    const url = new URL(req.url, "http://localhost")

    const route = this.match(url.pathname)

    if (!route) {
      return false
    }

    try {

      req.params = route.params

      await route.handler(req, res)

      return true

    } catch (error) {

      console.error("Router handler error:", error)

      res.statusCode = 500
      res.setHeader("Content-Type", "application/json")

      res.end(JSON.stringify({
        error: "Router execution failed"
      }))

      return true

    }

  }

}

export function createApplicationRouter() {
  return new ApplicationRouter()
}