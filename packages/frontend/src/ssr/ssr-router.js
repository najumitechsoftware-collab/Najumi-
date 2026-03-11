/*
Najumi SSR Router
*/

class SSRRouter {

constructor() {

this.routes = []
this.dynamicRoutes = []

}

/*
Register route
*/

add(path, component) {

if (path.includes(":")) {

  const parts = path.split("/").filter(Boolean)

  this.dynamicRoutes.push({
    path,
    parts,
    component
  })

} else {

  this.routes.push({
    path,
    component
  })

}

}

/*
Match route
*/

match(path) {

/*
Static routes
*/

for (const route of this.routes) {

  if (route.path === path) {

    return {
      component: route.component,
      params: {}
    }

  }

}

/*
Dynamic routes
*/

const parts = path.split("/").filter(Boolean)

for (const route of this.dynamicRoutes) {

  if (route.parts.length !== parts.length) continue

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

    return {
      component: route.component,
      params
    }

  }

}

return null

}

}

let routerInstance = null

export function initSSRRouter() {

if (!routerInstance) {

routerInstance = new SSRRouter()

}

return routerInstance

}

export function getSSRRouter() {

if (!routerInstance) {

throw new Error("SSR Router not initialized")

}

return routerInstance

}