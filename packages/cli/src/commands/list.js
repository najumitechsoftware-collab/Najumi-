// packages/cli/src/commands/list.js

import fs from "fs/promises"
import path from "path"

export default async function handler() {

  try {

    const projectRoot = process.cwd()

    const configPath = path.join(projectRoot, "najumi.packages.json")

    let config

    try {

      const content = await fs.readFile(configPath, "utf8")

      config = JSON.parse(content)

    } catch {

      console.log("")
      console.log("No packages installed.")
      console.log("")

      return

    }

    const dependencies = config.dependencies || {}

    const packageNames = Object.keys(dependencies)

    if (packageNames.length === 0) {

      console.log("")
      console.log("No packages installed.")
      console.log("")

      return

    }

    console.log("")
    console.log("📦 Installed Najumi packages:")
    console.log("")

    for (const name of packageNames) {

      const version = dependencies[name]

      console.log(`• ${name}@${version}`)

    }

    console.log("")

  } catch (error) {

    console.error("")
    console.error("❌ Failed to list packages")
    console.error(error.message)
    console.error("")

    process.exit(1)

  }

}