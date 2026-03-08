#!/usr/bin/env node

import { parseCommand } from "./parser.js"
import { getCommand } from "./registry.js"

async function main() {
  try {
    const { command, args } = parseCommand(process.argv)

    const handler = await getCommand(command)

    if (!handler) {
      console.error(`Unknown command: ${command}`)
      process.exit(1)
    }

    await handler(args)

  } catch (error) {
    console.error("CLI Error:", error.message)
    process.exit(1)
  }
}

main()