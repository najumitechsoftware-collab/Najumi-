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

  // built-in security middleware
  middleware.use(securityMiddleware)

  // load framework routes + API routes
  await loadRoutes(router)

  const server = http.createServer(async (req, res) => {

    try {

      // base security layer
      const securityOk = applySecurity(req, res)

      if (securityOk === false) {
        return
      }

      // run middleware stack
      const middlewareOk = await middleware.handle(req, res)

      if (!middlewareOk) {
        return
      }

      // static assets
      const staticHandled = await serveStatic(req, res)

      if (staticHandled) {
        return
      }

      // router handling (includes API routes)
      const handled = await router.handle(req, res)

      if (!handled) {

        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")

        res.end(JSON.stringify({
          error: "Route not found"
        }))

      }

    } catch (error) {

      console.error("Najumi server error:", error)

      res.statusCode = 500
      res.setHeader("Content-Type", "application/json")

      res.end(JSON.stringify({
        error: "Internal server error"
      }))

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