// packages/core/src/server/dev-server.js

import http from "http"

import { createRouterEngine } from "../router/router-engine.js"
import { loadRoutes } from "../router/route-loader.js"

import { createMiddlewareEngine } from "../middleware/middleware-engine.js"
import { securityMiddleware } from "../middleware/security-middleware.js"

import { applySecurity } from "./security-layer.js"
import { serveStatic } from "./static-server.js"

import { initHotReload } from "../dev/hot-reload.js"

import { loadApplication } from "../app/application-loader.js"

export async function startDevServer(config = {}) {

  const router = createRouterEngine()
  const middleware = createMiddlewareEngine()

  /*
  Built-in security middleware
  */
  middleware.use(securityMiddleware)

  /*
  Load framework routes
  */
  await loadRoutes(router)

  /*
  Load application layer
  (pages, api, services, jobs)
  */
  await loadApplication(router)

  /*
  Create HTTP server
  */
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
      Run middleware stack
      */
      const middlewareOk = await middleware.handle(req, res)

      if (!middlewareOk) {
        return
      }

      /*
      Serve static assets
      */
      const staticHandled = await serveStatic(req, res)

      if (staticHandled) {
        return
      }

      /*
      Router handling (includes API + pages)
      */
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

  /*
  Initialize secure hot reload
  */
  initHotReload(server)

  const port = config.port || 3000

  server.listen(port, () => {

    console.log("")
    console.log("🚀 Najumi Dev Server Started")
    console.log(`🌐 http://localhost:${port}`)
    console.log("🔥 Hot Reload Enabled")
    console.log("📦 Application Loader Active")
    console.log("")

  })

  return server

}