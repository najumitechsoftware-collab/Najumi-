// packages/cli/src/commands/dev.js

import path from "path"

import { startDevServer } from "../../../core/src/server/dev-server.js"
import { startFileWatcher } from "../../../core/src/dev/file-watcher.js"
import { loadConfig } from "../../../core/src/config/load-config.js"
import { log } from "../../../core/src/utils/logger.js"

import { runViewCompiler } from "../../../frontend/src/view/compiler/compiler-runner.js"

let serverInstance = null

async function restartServer(config) {

  try {

    log("Restarting Najumi dev server...")

    if (serverInstance && serverInstance.close) {

      await serverInstance.close()

    }

    serverInstance = await startDevServer(config)

  } catch (err) {

    console.error("Server restart failed:", err)

  }

}

export default async function handler() {

  try {

    log("Starting Najumi development environment...")

    const config = await loadConfig()

    const projectRoot = process.cwd()

    /*
    Step 1: Compile frontend templates
    */
    log("Running Najumi Forge compiler...")

    await runViewCompiler(projectRoot)

    /*
    Step 2: Start dev server
    */
    serverInstance = await startDevServer(config)

    /*
    Step 3: Start file watcher
    */
    startFileWatcher({

      onChange: async (filePath) => {

        log(`File change detected: ${filePath}`)

        /*
        Recompile view templates
        */
        if (filePath.endsWith(".view")) {

          log("Recompiling view templates...")

          await runViewCompiler(projectRoot)

        }

        /*
        Restart server
        */
        await restartServer(config)

      }

    })

    log("Najumi dev environment ready 🚀")

  } catch (error) {

    console.error("Failed to start dev server:", error)

    process.exit(1)

  }

}