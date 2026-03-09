// packages/core/src/backend/services/service-engine.js

import { log } from "../../utils/logger.js"

class ServiceEngine {

  constructor() {

    this.services = new Map()

  }

  /**
   * register a service
   */
  register(name, service) {

    if (!name || typeof name !== "string") {
      throw new Error("Service name must be a string")
    }

    if (typeof service !== "object") {
      throw new Error(`Service "${name}" must be an object`)
    }

    if (this.services.has(name)) {
      throw new Error(`Service already registered: ${name}`)
    }

    this.services.set(name, service)

    log(`Service registered: ${name}`)

  }

  /**
   * get service
   */
  get(name) {

    const service = this.services.get(name)

    if (!service) {
      throw new Error(`Service not found: ${name}`)
    }

    return service

  }

  /**
   * check if service exists
   */
  has(name) {

    return this.services.has(name)

  }

  /**
   * list all services
   */
  list() {

    return Array.from(this.services.keys())

  }

  /**
   * create service context for handlers
   */
  createContext() {

    const context = {}

    for (const [name, service] of this.services.entries()) {

      context[name] = service

    }

    return context

  }

}

export function createServiceEngine() {

  return new ServiceEngine()

}