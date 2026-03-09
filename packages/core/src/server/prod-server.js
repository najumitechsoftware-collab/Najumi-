// packages/core/src/server/prod-server.js

import http from "http"

import { createRouterEngine } from "../router/router-engine.js"
import { loadRoutes } from "../router/route-loader.js"

import { createMiddlewareEngine } from "../middleware/middleware-engine.js"
import { securityMiddleware } from "../middleware/security-middleware.js"

import { applySecurity } from "./security-layer.js"
import { serveStatic } from "./static-server.js"

export async function startProductionServer(config = {}) {

  const router = createRouterEngine()
  const middleware = createMiddlewareEngine()

  // register security middleware
  middleware.use(securityMiddleware)

  // load routes
  await loadRoutes(router)

  const server = http.createServer(async (req, res) => {

    try {

      // base server security
      const securityOk = applySecurity(req, res)

      if (securityOk === false) {
        return
      }

      // middleware pipeline
      const middlewareOk = await middleware.handle(req, res)

      if (!middlewareOk) {
        return
      }

      // static assets
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

      console.error("Production server error:", error)

      res.statusCode = 500
      res.setHeader("Content-Type", "text/plain")
      res.end("Internal server error")

    }

  })

  const port = config.port || process.env.PORT || 3000
  const host = config.host || "0.0.0.0"

  server.listen(port, host, () => {

    console.log("")
    console.log("🚀 Najumi Production Server Started")
    console.log(`🌐 http://${host}:${port}`)
    console.log("")

  })

  return server

}