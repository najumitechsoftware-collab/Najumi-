// packages/cli/src/commands/dev.js

import { startDevServer } from "../../../core/src/server/dev-server.js"
import { loadConfig } from "../../../core/src/config/load-config.js"
import { log } from "../../../core/src/utils/logger.js"

export default async function handler() {

  try {

    log("Starting Najumi development server...")

    const config = await loadConfig()

    await startDevServer(config)

  } catch (error) {

    console.error("Failed to start dev server:", error)
    process.exit(1)

  }

}