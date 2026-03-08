// packages/core/src/modules/loader.js

import fs from "fs/promises"
import path from "path"
import { log, warn, error } from "../utils/logger.js"

const MODULE_SOURCES = [
  "node_modules",
  "najumi_modules",
  "modules",
  "plugins"
]

// module registry
const loadedModules = new Map()

// discover modules from different sources
async function discoverModules(rootDir) {
  const discovered = []

  for (const source of MODULE_SOURCES) {
    const sourcePath = path.join(rootDir, source)

    try {
      const entries = await fs.readdir(sourcePath)

      for (const entry of entries) {
        const modulePath = path.join(sourcePath, entry)
        discovered.push(modulePath)
      }
    } catch {
      // directory might not exist
    }
  }

  return discovered
}

// validate module metadata
async function validateModule(modulePath) {
  const metadataPath = path.join(modulePath, "module.json")

  try {
    const content = await fs.readFile(metadataPath, "utf-8")
    const metadata = JSON.parse(content)

    if (!metadata.name) {
      throw new Error("Module missing name")
    }

    return metadata
  } catch {
    throw new Error(`Invalid module at ${modulePath}`)
  }
}

// import module
async function importModule(modulePath) {
  try {
    const moduleEntry = path.join(modulePath, "index.js")
    const module = await import(moduleEntry)

    return module.default || module
  } catch (err) {
    throw new Error(`Failed to import module ${modulePath}: ${err.message}`)
  }
}

// initialize module
async function initializeModule(moduleInstance, metadata, context) {
  try {
    if (typeof moduleInstance.init === "function") {
      await moduleInstance.init(context)
    }

    log(`Module initialized: ${metadata.name}`)
  } catch (err) {
    error(`Module failed during init: ${metadata.name}`, {
      error: err.message
    })
  }
}

// main loader
export async function loadModules(config) {
  const rootDir = process.cwd()

  log("Discovering Najumi modules...")

  const discovered = await discoverModules(rootDir)

  for (const modulePath of discovered) {
    try {
      const metadata = await validateModule(modulePath)

      const moduleInstance = await importModule(modulePath)

      await initializeModule(moduleInstance, metadata, { config })

      loadedModules.set(metadata.name, moduleInstance)

    } catch (err) {
      warn(`Skipping module: ${err.message}`)
    }
  }

  log(`Modules loaded: ${loadedModules.size}`)

  return loadedModules
}