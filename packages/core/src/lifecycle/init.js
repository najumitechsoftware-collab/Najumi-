// packages/core/src/lifecycle/init.js

import { log, error } from "../utils/logger.js"

// lifecycle stages
const STAGES = ["init", "boot", "ready", "shutdown"]

// event registry
const lifecycleEvents = new Map()

// current stage
let currentStage = null

// register event listener
export function on(stage, handler) {
  if (!STAGES.includes(stage)) {
    throw new Error(`Invalid lifecycle stage: ${stage}`)
  }

  if (!lifecycleEvents.has(stage)) {
    lifecycleEvents.set(stage, [])
  }

  lifecycleEvents.get(stage).push(handler)
}

// emit lifecycle event
async function emit(stage, context = {}) {
  const handlers = lifecycleEvents.get(stage) || []

  for (const handler of handlers) {
    try {
      await handler(context)
    } catch (err) {
      error(`Lifecycle handler failed during ${stage}`, { error: err.message })
    }
  }
}

// change lifecycle stage
async function setStage(stage, context = {}) {
  if (!STAGES.includes(stage)) {
    throw new Error(`Invalid lifecycle stage transition: ${stage}`)
  }

  currentStage = stage

  log(`Lifecycle stage: ${stage}`)

  await emit(stage, context)
}

// initialize lifecycle system
export async function initLifecycle(config) {
  log("Initializing Najumi lifecycle system...")

  const context = { config }

  // init stage
  await setStage("init", context)

  // boot stage
  await setStage("boot", context)

  // ready stage
  await setStage("ready", context)

  log("Lifecycle system ready")

  return {
    getStage: () => currentStage,
    on
  }
}

// shutdown lifecycle
export async function shutdownLifecycle() {
  await setStage("shutdown")
}