// packages/core/src/runtime/start.js

import { log, error } from "../utils/logger.js"
import { initAtlas } from "../backend/atlas/index.js"

// Dependency Injection Container
class ServiceContainer {
  constructor() {
    this.services = new Map()
  }

  register(name, service) {
    if (this.services.has(name)) {
      throw new Error(`Service already registered: ${name}`)
    }

    this.services.set(name, service)
  }

  resolve(name) {
    if (!this.services.has(name)) {
      throw new Error(`Service not found: ${name}`)
    }

    return this.services.get(name)
  }

  has(name) {
    return this.services.has(name)
  }

  list() {
    return Array.from(this.services.keys())
  }
}

// create runtime context
function createRuntimeContext(config, modules) {
  return {
    config,
    modules,
    environment: process.env.NODE_ENV || "development",
    startedAt: Date.now()
  }
}

// initialize services
async function initializeServices(container, context) {

  log("Initializing runtime services...")

  // register core services
  container.register("config", context.config)
  container.register("environment", context.environment)
  container.register("modules", context.modules)

  // initialize Atlas database engine
  if (context.config?.database) {

    log("Initializing Najumi Atlas...")

    const atlas = await initAtlas(context.config)

    container.register("atlas", atlas)

    log("Najumi Atlas ready")

  }

  log("Core services registered")

}

// activate modules
async function activateModules(modules, context, container) {

  log("Activating modules...")

  for (const [name, moduleInstance] of modules.entries()) {

    try {

      if (typeof moduleInstance.start === "function") {

        await moduleInstance.start({
          context,
          container
        })

      }

      log(`Module started: ${name}`)

    } catch (err) {

      error(`Module failed to start: ${name}`, {
        error: err.message
      })

    }

  }

}

// start runtime
export async function startRuntime(config, modules = new Map()) {

  log("Starting Najumi runtime engine...")

  const container = new ServiceContainer()

  const context = createRuntimeContext(config, modules)

  await initializeServices(container, context)

  await activateModules(modules, context, container)

  log("Runtime engine started")

  return {
    container,
    context
  }

}