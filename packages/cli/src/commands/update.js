// packages/cli/src/commands/update.js

import { updatePackages } from "../../../core/src/package-manager/update.js"

export default async function handler() {

  try {

    console.log("")
    console.log("🔄 Checking for Najumi package updates...")
    console.log("")

    await updatePackages()

    console.log("")
    console.log("✅ Update process finished")
    console.log("")

  } catch (error) {

    console.error("")
    console.error("❌ Package update failed")
    console.error(error.message)
    console.error("")

    process.exit(1)

  }

}