// packages/cli/src/commands/install.js

import { installPackage } from "../../../core/src/package-manager/install.js"

export default async function handler(args = []) {

  try {

    const packageName = args[0]

    if (!packageName) {

      console.log("")
      console.log("Usage:")
      console.log("  najumi install <package-name>")
      console.log("")
      console.log("Example:")
      console.log("  najumi install auth")
      console.log("")

      return

    }

    console.log("")
    console.log(`📦 Installing package: ${packageName}`)
    console.log("")

    await installPackage(packageName)

    console.log("")
    console.log(`✅ Package installed successfully: ${packageName}`)
    console.log("")

  } catch (error) {

    console.error("")
    console.error("❌ Package installation failed")
    console.error(error.message)
    console.error("")

    process.exit(1)

  }

}