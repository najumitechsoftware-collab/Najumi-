// packages/core/src/router/route-matcher.js

function extractParams(routePath, urlPath) {

  const routeParts = routePath.split("/")
  const urlParts = urlPath.split("/")

  const params = {}

  for (let i = 0; i < routeParts.length; i++) {

    const routePart = routeParts[i]
    const urlPart = urlParts[i]

    if (routePart.startsWith(":")) {

      const key = routePart.slice(1)

      params[key] = urlPart

    }

  }

  return params

}

function matchPath(routePath, urlPath) {

  const routeParts = routePath.split("/")
  const urlParts = urlPath.split("/")

  if (routeParts.length !== urlParts.length) {
    return false
  }

  for (let i = 0; i < routeParts.length; i++) {

    const routePart = routeParts[i]
    const urlPart = urlParts[i]

    if (routePart.startsWith(":")) {
      continue
    }

    if (routePart !== urlPart) {
      return false
    }

  }

  return true

}

export function matchRoute(routes, method, url) {

  const urlPath = url.split("?")[0]

  for (const route of routes) {

    if (route.method !== method) {
      continue
    }

    const matched = matchPath(route.path, urlPath)

    if (!matched) {
      continue
    }

    const params = extractParams(route.path, urlPath)

    return {
      handler: route.handler,
      params
    }

  }

  return null

}