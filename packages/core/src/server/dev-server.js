// packages/core/src/server/dev-server.js

import http from "http"
import { createRouterEngine } from "../router/router-engine.js"
import { loadRoutes } from "../router/route-loader.js"
import { applySecurity } from "./security-layer.js"
import { serveStatic } from "./static-server.js"

export async function startDevServer(config = {}) {

  const router = createRouterEngine()

  // load project routes automatically
  await loadRoutes(router)

  const server = http.createServer(async (req, res) => {

    try {

      // Security layer
      const securityOk = applySecurity(req, res)

      if (securityOk === false) {
        return
      }

      // Static files
      const staticHandled = await serveStatic(req, res)

      if (staticHandled) {
        return
      }

      // Router handling
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