// packages/cli/src/commands/dev.js

import fs from "fs"
import path from "path"
import { spawn } from "child_process"

let runtimeProcess = null

function startRuntime() {

  if (runtimeProcess) {
    runtimeProcess.kill()
  }

  runtimeProcess = spawn(
    "node",
    ["./src/index.js"],
    {
      stdio: "inherit"
    }
  )

}

function watchFiles() {

  const watchDirs = [
    "src",
    "modules"
  ]

  watchDirs.forEach(dir => {

    const fullPath = path.join(process.cwd(), dir)

    if (!fs.existsSync(fullPath)) return

    fs.watch(fullPath, { recursive: true }, () => {

      console.log("File change detected. Restarting...")

      startRuntime()

    })

  })

}

export default async function handler() {

  console.log("Starting Najumi development server...")

  startRuntime()

  watchFiles()

}