// packages/core/src/backend/services/service-registry.js

import fs from "fs/promises"
import path from "path"
import { log } from "../../utils/logger.js"

/**
 * Load services from project directory
 */
export async function loadServices(serviceEngine, rootDir = process.cwd()) {

  const servicesDir = path.join(rootDir, "services")

  try {

    const exists = await fs.stat(servicesDir).then(() => true).catch(() => false)

    if (!exists) {

      log("No services directory found")

      return

    }

    const files = await fs.readdir(servicesDir)

    for (const file of files) {

      if (!file.endsWith(".js")) {
        continue
      }

      const filePath = path.join(servicesDir, file)

      try {

        const module = await import(filePath)

        const service = module.default || module

        const serviceName = file
          .replace(".js", "")
          .replace("-service", "")

        serviceEngine.register(serviceName, service)

      } catch (error) {

        console.error(`Failed to load service: ${file}`, error)

      }

    }

  } catch (error) {

    console.error("Service registry error:", error)

  }

}