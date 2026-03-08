// packages/cli/src/commands/start.js

import fs from "fs"
import path from "path"
import { spawn } from "child_process"

export default async function handler() {

  const projectRoot = process.cwd()

  const distEntry = path.join(projectRoot, "dist", "index.js")

  if (!fs.existsSync(distEntry)) {

    console.error("Production build not found.")
    console.error("Run 'najumi build' first.")

    process.exit(1)

  }

  console.log("Starting Najumi production server...")

  const runtime = spawn(
    "node",
    [distEntry],
    {
      stdio: "inherit"
    }
  )

  runtime.on("close", (code) => {

    console.log(`Server stopped with code ${code}`)

  })

}