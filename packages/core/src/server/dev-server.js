// packages/core/src/server/dev-server.js

import http from "http"

import { createRouterEngine } from "../router/router-engine.js"
import { loadRoutes } from "../router/route-loader.js"

import { createMiddlewareEngine } from "../middleware/middleware-engine.js"
import { securityMiddleware } from "../middleware/security-middleware.js"

import { applySecurity } from "./security-layer.js"
import { serveStatic } from "./static-server.js"

export async function startDevServer(config = {}) {

  const router = createRouterEngine()
  const middleware = createMiddlewareEngine()

  // register built-in security middleware
  middleware.use(securityMiddleware)

  // load routes automatically
  await loadRoutes(router)

  const server = http.createServer(async (req, res) => {

    try {

      // basic server security
      const securityOk = applySecurity(req, res)

      if (securityOk === false) {
        return
      }

      // run middleware stack
      const middlewareOk = await middleware.handle(req, res)

      if (!middlewareOk) {
        return
      }

      // static files
      const staticHandled = await serveStatic(req, res)

      if (staticHandled) {
        return
      }

      // router handling
      const handled = await router.handle(req, res)

      if (!handled) {

        res.statusCode = 404
        res.setHeader("Content-Type", "text/plain")
        res.end("Route not found")

      }

    } catch (error) {

      console.error("Najumi server error:", error)

      res.statusCode = 500
      res.setHeader("Content-Type", "text/plain")
      res.end("Internal server error")

    }

  })

  const port = config.port || 3000

  server.listen(port, () => {

    console.log("")
    console.log("🚀 Najumi Dev Server Started")
    console.log(`🌐 http://localhost:${port}`)
    console.log("")

  })

  return server

}