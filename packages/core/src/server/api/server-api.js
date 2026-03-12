/*
Najumi Public Server API
*/

import http from "http"

import { createRouterEngine } from "../../router/router-engine.js"
import { createMiddlewareEngine } from "../../middleware/middleware-engine.js"
import { securityMiddleware } from "../../middleware/security-middleware.js"

import { applySecurity } from "../security-layer.js"

import { createRequest } from "./request-api.js"
import { createResponse } from "./response-api.js"

class NajumiServer {

constructor(options = {}) {

this.options = options

this.router = createRouterEngine()

this.middleware = createMiddlewareEngine()

/*
Built-in security middleware
*/
this.middleware.use(securityMiddleware)

}

/*
Register middleware
*/
use(fn) {

this.middleware.use(fn)

}

/*
Register routes
*/

get(path, handler) {

this.router.register("GET", path, handler)

}

post(path, handler) {

this.router.register("POST", path, handler)

}

put(path, handler) {

this.router.register("PUT", path, handler)

}

patch(path, handler) {

this.router.register("PATCH", path, handler)

}

delete(path, handler) {

this.router.register("DELETE", path, handler)

}

/*
Create HTTP server
*/

createHttpServer() {

const server = http.createServer(async (req, res) => {

  try {

    /*
    Base security layer
    */

    const securityOk = applySecurity(req, res)

    if (securityOk === false) {
      return
    }

    /*
    Create request / response wrappers
    */

    const request = createRequest(req)
    const response = createResponse(res)

    /*
    Run middleware pipeline
    */

    const middlewareOk = await this.middleware.handle(request, response)

    if (!middlewareOk) {
      return
    }

    /*
    Route matching
    */

    const route = this.router.match(request.method, request.path)

    if (!route) {

      response.status(404).json({
        error: "Route not found"
      })

      return

    }

    request.params = route.params

    /*
    Execute handler
    */

    await route.handler(request, response)

  } catch (error) {

    console.error("Najumi Server Error:", error)

    res.statusCode = 500

    res.setHeader("Content-Type", "application/json")

    res.end(JSON.stringify({
      error: "Internal server error"
    }))

  }

})

return server

}

/*
Start server
*/

listen(port = 3000, callback) {

const server = this.createHttpServer()

server.listen(port, () => {

  console.log("")
  console.log("🚀 Najumi Server Started")
  console.log(`🌐 http://localhost:${port}`)
  console.log("")

  if (callback) callback()

})

}

}

/*
Public API
*/

export function createServer(options = {}) {

return new NajumiServer(options)

}