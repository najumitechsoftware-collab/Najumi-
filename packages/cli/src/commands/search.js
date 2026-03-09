// packages/cli/src/commands/search.js

import { RegistryClient } from "../../../core/src/package-manager/registry-client.js"

export default async function handler(args = []) {

  try {

    const query = args[0]

    if (!query) {

      console.log("")
      console.log("Usage:")
      console.log("  najumi search <package-name>")
      console.log("")
      console.log("Example:")
      console.log("  najumi search auth")
      console.log("")

      return

    }

    console.log("")
    console.log(`🔍 Searching for packages: ${query}`)
    console.log("")

    const registry = new RegistryClient()

    const results = await registry.search(query)

    if (!results || results.length === 0) {

      console.log("No packages found.")
      console.log("")
      return

    }

    console.log("Available packages:")
    console.log("")

    for (const pkg of results) {

      const name = pkg.name || "unknown"
      const version = pkg.version || "?"
      const description = pkg.description || ""

      console.log(`📦 ${name}@${version}`)
      console.log(`   ${description}`)
      console.log("")

    }

  } catch (error) {

    console.error("")
    console.error("❌ Package search failed")
    console.error(error.message)
    console.error("")

    process.exit(1)

  }

}