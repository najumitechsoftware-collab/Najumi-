// packages/frontend/src/view/router/router-engine.js

class RouterEngine {

  constructor() {

    this.routes = new Map()
    this.dynamicRoutes = []
    this.middlewares = []

    window.addEventListener("popstate", () => {
      this.resolve(location.pathname)
    })

  }

  /*
  Register route
  */
  add(path, handler) {

    if (path.includes(":")) {

      const parts = path.split("/")

      this.dynamicRoutes.push({
        path,
        parts,
        handler
      })

    } else {

      this.routes.set(path, handler)

    }

  }

  /*
  Middleware
  */
  use(fn) {

    this.middlewares.push(fn)

  }

  /*
  Navigate
  */
  go(path) {

    history.pushState({}, "", path)

    this.resolve(path)

  }

  /*
  Resolve route
  */
  async resolve(path) {

    for (const middleware of this.middlewares) {

      const result = await middleware(path)

      if (result === false) {
        return
      }

    }

    if (this.routes.has(path)) {

      const handler = this.routes.get(path)

      handler({ path })

      return

    }

    const parts = path.split("/")

    for (const route of this.dynamicRoutes) {

      if (route.parts.length !== parts.length) {
        continue
      }

      const params = {}

      let matched = true

      for (let i = 0; i < parts.length; i++) {

        const routePart = route.parts[i]

        const pathPart = parts[i]

        if (routePart.startsWith(":")) {

          const key = routePart.slice(1)

          params[key] = decodeURIComponent(pathPart)

        } else if (routePart !== pathPart) {

          matched = false
          break

        }

      }

      if (matched) {

        route.handler({
          path,
          params
        })

        return

      }

    }

    this.notFound(path)

  }

  /*
  Not found
  */
  notFound(path) {

    console.warn(`Route not found: ${path}`)

  }

}

let routerInstance = null

export function initRouter() {

  if (!routerInstance) {

    routerInstance = new RouterEngine()

  }

  return routerInstance

}

export function getRouter() {

  if (!routerInstance) {
    throw new Error("Router not initialized")
  }

  return routerInstance

}