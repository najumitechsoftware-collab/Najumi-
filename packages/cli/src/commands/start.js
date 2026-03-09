// packages/cli/src/commands/start.js

import fs from "fs"
import path from "path"

import { startProductionServer } from "../../../core/src/server/prod-server.js"
import { loadConfig } from "../../../core/src/config/load-config.js"

export default async function handler() {

  try {

    const projectRoot = process.cwd()

    const distDir = path.join(projectRoot, "dist")

    // check if build exists
    if (!fs.existsSync(distDir)) {

      console.error("")
      console.error("❌ Production build not found.")
      console.error("Run 'najumi build' first.")
      console.error("")

      process.exit(1)

    }

    console.log("")
    console.log("🚀 Starting Najumi production server...")
    console.log("")

    // load configuration
    const config = await loadConfig()

    // start production server
    await startProductionServer(config)

  } catch (error) {

    console.error("")
    console.error("❌ Failed to start production server")
    console.error(error)
    console.error("")

    process.exit(1)

  }

}