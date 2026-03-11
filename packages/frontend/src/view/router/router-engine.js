/*
Najumi Advanced Router Engine
Supports:

- static routes
- dynamic routes
- nested routes
- middleware pipeline
- page transitions
  */

class RouterEngine {

constructor() {

this.routes = new Map()
this.dynamicRoutes = []
this.middlewares = []
this.currentPath = null
this.transitionHooks = []

/*
Handle browser navigation
*/

window.addEventListener("popstate", () => {

  this.resolve(location.pathname)

})

}

/*
Register static or dynamic route
*/

add(path, handler) {

if (!path || typeof handler !== "function") {
  throw new Error("Invalid route registration")
}

if (path.includes(":")) {

  const parts = path.split("/").filter(Boolean)

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
Register nested routes
*/

addGroup(basePath, routes) {

for (const route of routes) {

  const fullPath = `${basePath}${route.path}`

  this.add(fullPath, route.handler)

}

}

/*
Register middleware
*/

use(fn) {

if (typeof fn !== "function") {
  throw new Error("Middleware must be a function")
}

this.middlewares.push(fn)

}

/*
Register transition hook
*/

onTransition(fn) {

if (typeof fn === "function") {
  this.transitionHooks.push(fn)
}

}

/*
Navigate programmatically
*/

go(path) {

if (!path || typeof path !== "string") {
  return
}

if (path === this.currentPath) {
  return
}

history.pushState({}, "", path)

this.resolve(path)

}

/*
Execute transition hooks
*/

async runTransitions(path) {

for (const hook of this.transitionHooks) {

  try {

    await hook(path)

  } catch (err) {

    console.error("Router transition error:", err)

  }

}

}

/*
Resolve route
*/

async resolve(path) {

this.currentPath = path

/*
Run middleware pipeline
*/

for (const middleware of this.middlewares) {

  const result = await middleware(path)

  if (result === false) {
    return
  }

}

/*
Run page transitions
*/

await this.runTransitions(path)

/*
Static routes
*/

if (this.routes.has(path)) {

  const handler = this.routes.get(path)

  handler({ path })

  return

}

/*
Dynamic routes
*/

const parts = path.split("/").filter(Boolean)

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

/*
Not found
*/

this.notFound(path)

}

/*
Not found handler
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