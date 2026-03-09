// packages/cli/src/commands/remove.js

import { removePackage } from "../../../core/src/package-manager/remove.js"

export default async function handler(args = []) {

  try {

    const packageName = args[0]

    if (!packageName) {

      console.log("")
      console.log("Usage:")
      console.log("  najumi remove <package-name>")
      console.log("")
      console.log("Example:")
      console.log("  najumi remove auth")
      console.log("")

      return

    }

    console.log("")
    console.log(`🗑 Removing package: ${packageName}`)
    console.log("")

    await removePackage(packageName)

    console.log("")
    console.log(`✅ Package removed successfully: ${packageName}`)
    console.log("")

  } catch (error) {

    console.error("")
    console.error("❌ Package removal failed")
    console.error(error.message)
    console.error("")

    process.exit(1)

  }

}