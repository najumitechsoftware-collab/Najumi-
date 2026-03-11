/*
Najumi SSR Engine
*/

import { renderToString } from "./ssr-renderer.js"
import { createSSRContext } from "./ssr-context.js"

class SSREngine {

constructor() {

this.routes = new Map()

}

/*
Register SSR route
*/

route(path, component) {

this.routes.set(path, component)

}

/*
Handle request
*/

async render(path, req = {}, res = {}) {

const component = this.routes.get(path)

if (!component) {

  return {
    status: 404,
    html: "<h1>Page Not Found</h1>"
  }

}

const context = createSSRContext({

  path,
  req,
  res

})

const html = await renderToString(component, context)

return {

  status: 200,
  html

}

}

}

let ssrInstance = null

export function initSSR() {

if (!ssrInstance) {

ssrInstance = new SSREngine()

}

return ssrInstance

}

export function getSSR() {

if (!ssrInstance) {

throw new Error("SSR not initialized")

}

return ssrInstance

}