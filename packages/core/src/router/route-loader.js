// packages/core/src/router/route-loader.js

import fs from "fs"
import path from "path"

export async function loadRoutes(router) {

  const projectRoot = process.cwd()

  const routeDirs = [
    "routes",
    "modules"
  ]

  for (const dir of routeDirs) {

    const fullDir = path.join(projectRoot, dir)

    if (!fs.existsSync(fullDir)) {
      continue
    }

    const files = fs.readdirSync(fullDir)

    for (const file of files) {

      const filePath = path.join(fullDir, file)

      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {

        const moduleRouteFile = path.join(filePath, "routes.js")

        if (fs.existsSync(moduleRouteFile)) {

          const moduleRoutes = await import(moduleRouteFile)

          if (moduleRoutes.default) {
            moduleRoutes.default(router)
          }

        }

        continue
      }

      if (!file.endsWith(".js")) {
        continue
      }

      const routeFile = path.join(fullDir, file)

      const routeModule = await import(routeFile)

      if (routeModule.default) {
        routeModule.default(router)
      }

    }

  }

}