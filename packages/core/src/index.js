// packages/core/src/index.js

import { validateEnvironment } from "./utils/validate-env.js"
import { loadConfig } from "./config/load-config.js"
import { initLifecycle } from "./lifecycle/init.js"
import { loadModules } from "./modules/loader.js"
import { startRuntime } from "./runtime/start.js"
import { log } from "./utils/logger.js"

export async function bootNajumi() {
  try {
    log("Starting Najumi Core Engine...")

    validateEnvironment()

    const config = await loadConfig()

    await initLifecycle(config)

    await loadModules(config)

    await startRuntime(config)

    log("Najumi is ready 🚀")
  } catch (error) {
    console.error("Najumi boot failed:", error)
    process.exit(1)
  }
}