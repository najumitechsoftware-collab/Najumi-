// packages/core/src/index.js

import { validateEnvironment } from "./utils/validate-env.js"
import { loadConfig } from "./config/load-config.js"
import { initLifecycle } from "./lifecycle/init.js"
import { loadModules } from "./modules/loader.js"
import { startRuntime } from "./runtime/start.js"
import { loadSystems } from "./integration/system-loader.js"
import { log } from "./utils/logger.js"

/*
 Simple dependency container
*/
class Container {

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

let containerInstance = null

export function getContainer() {

  if (!containerInstance) {
    throw new Error("Najumi not initialized yet")
  }

  return containerInstance

}

/*
 Boot Najumi Core
*/
export async function bootNajumi() {

  try {

    log("Starting Najumi Core Engine...")

    /*
    Validate environment
    */
    validateEnvironment()

    /*
    Load configuration
    */
    const config = await loadConfig()

    /*
    Create dependency container
    */
    const container = new Container()

    containerInstance = container

    /*
    Lifecycle init
    */
    await initLifecycle(config)

    /*
    Load core systems
    */
    const systems = await loadSystems(config, container)

    /*
    Load application modules
    */
    const modules = await loadModules(config)

    /*
    Start runtime
    */
    await startRuntime(config, modules)

    log("Najumi systems initialized")

    log("Najumi is ready 🚀")

    return {
      container,
      systems
    }

  } catch (error) {

    console.error("Najumi boot failed:", error)

    process.exit(1)

  }

}

/*
 Public system access helpers
*/

export function atlas() {

  return getContainer().resolve("atlas")

}

export function harbor() {

  return getContainer().resolve("harbor")

}

export function orbit() {

  return getContainer().resolve("orbit")

}

export function pulse() {

  return getContainer().resolve("pulse")

}

export function vault() {

  return getContainer().resolve("vault")

}