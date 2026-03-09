// packages/core/src/server/dev-server.js

import http from "http"
import { createRouter } from "./router.js"
import { applySecurity } from "./security-layer.js"
import { serveStatic } from "./static-server.js"

export async function startDevServer(config) {

  const router = createRouter()

  const server = http.createServer(async (req, res) => {

    try {

      // security layer
      applySecurity(req, res)

      // static files
      const staticHandled = await serveStatic(req, res)

      if (staticHandled) return

      // routing
      const handled = await router.handle(req, res)

      if (!handled) {
        res.statusCode = 404
        res.end("Route not found")
      }

    } catch (error) {

      console.error("Server error:", error)

      res.statusCode = 500
      res.end("Internal server error")

    }

  })

  const port = config.port || 3000

  server.listen(port, () => {
    console.log(`Najumi Dev Server running on http://localhost:${port}`)
  })

}