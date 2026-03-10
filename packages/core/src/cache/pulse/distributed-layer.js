// packages/core/src/cache/pulse/distributed-layer.js

import { getPulse } from "./pulse-engine.js"
import { EventEmitter } from "events"

class DistributedLayer {

  constructor() {

    this.pulse = getPulse()
    this.nodes = new Map()
    this.events = new EventEmitter()

  }

  /**
   * Register node
   */
  registerNode(nodeId, connection) {

    this.nodes.set(nodeId, connection)

  }

  /**
   * Broadcast message to nodes
   */
  broadcast(event, payload) {

    for (const [id, node] of this.nodes.entries()) {

      try {

        if (typeof node.send === "function") {
          node.send({
            event,
            payload
          })
        }

      } catch (err) {
        // ignore network errors
      }

    }

  }

  /**
   * Handle incoming message
   */
  handleMessage(message) {

    const { event, payload } = message

    if (!event) return

    switch (event) {

      case "cache:set":
        this.pulse.set(
          payload.key,
          payload.value,
          payload.options
        )
        break

      case "cache:delete":
        this.pulse.delete(payload.key)
        break

      case "cache:invalidate":
        this.pulse.invalidate(payload.tag)
        break

      default:
        break

    }

  }

  /**
   * Distributed set
   */
  set(key, value, options = {}) {

    this.pulse.set(key, value, options)

    this.broadcast("cache:set", {
      key,
      value,
      options
    })

  }

  /**
   * Distributed delete
   */
  delete(key) {

    this.pulse.delete(key)

    this.broadcast("cache:delete", {
      key
    })

  }

  /**
   * Distributed invalidation
   */
  invalidate(tag) {

    this.pulse.invalidate(tag)

    this.broadcast("cache:invalidate", {
      tag
    })

  }

}

let distributedInstance = null

export function initDistributedLayer() {

  if (!distributedInstance) {
    distributedInstance = new DistributedLayer()
  }

  return distributedInstance

}

export function getDistributedLayer() {

  if (!distributedInstance) {
    throw new Error("Distributed layer not initialized")
  }

  return distributedInstance

}