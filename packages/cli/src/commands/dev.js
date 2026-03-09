// packages/cli/src/commands/dev.js

import { startDevServer } from "../../../core/src/server/dev-server.js"
import { startFileWatcher } from "../../../core/src/dev/file-watcher.js"
import { loadConfig } from "../../../core/src/config/load-config.js"
import { log } from "../../../core/src/utils/logger.js"

let serverInstance = null

export default async function handler() {

  try {

    log("Starting Najumi development environment...")

    const config = await loadConfig()

    // start server
    serverInstance = await startDevServer(config)

    // start watcher
    startFileWatcher({

      onChange: () => {

        log("Changes detected. Restarting server...")

        if (serverInstance && serverInstance.close) {
          serverInstance.close()
        }

        startDevServer(config)

      }

    })

  } catch (error) {

    console.error("Failed to start dev server:", error)
    process.exit(1)

  }

}