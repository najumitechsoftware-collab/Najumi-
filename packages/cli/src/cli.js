#!/usr/bin/env node

import { parseCommand } from "./parser.js"
import { getCommand } from "./registry.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

/*
Resolve CLI root
*/
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/*
Resolve package.json path
*/
const packagePath = path.resolve(__dirname, "../package.json")

/*
Get CLI version
*/
function getVersion() {

  try {

    const pkg = JSON.parse(
      fs.readFileSync(packagePath, "utf8")
    )

    return pkg.version || "unknown"

  } catch {

    return "unknown"

  }

}

/*
Show CLI help
*/
function showHelp() {

  console.log("")
  console.log("Najumi CLI")
  console.log("")
  console.log("Usage:")
  console.log("")
  console.log("  najumi <command> [options]")
  console.log("")
  console.log("Commands:")
  console.log("")
  console.log("  create <template> <name>   Create new project")
  console.log("  dev                        Start development server")
  console.log("  build                      Build application")
  console.log("  start                      Start production server")
  console.log("")
  console.log("Templates:")
  console.log("")
  console.log("  app")
  console.log("  api")
  console.log("  blog")
  console.log("  dashboard")
  console.log("  ecommerce")
  console.log("  saas")
  console.log("")
  console.log("Examples:")
  console.log("")
  console.log("  najumi create app my-app")
  console.log("  najumi dev")
  console.log("")
  console.log("Options:")
  console.log("")
  console.log("  --help       Show help")
  console.log("  --version    Show version")
  console.log("")

}

/*
CLI main runner
*/
async function main() {

  try {

    const argv = process.argv.slice(2)

    /*
    If no command show help
    */
    if (argv.length === 0) {

      showHelp()
      return

    }

    /*
    Global flags
    */

    if (argv.includes("--help") || argv.includes("-h")) {

      showHelp()
      return

    }

    if (argv.includes("--version") || argv.includes("-v")) {

      console.log(`Najumi CLI v${getVersion()}`)
      return

    }

    /*
    Parse CLI command
    */

    const { command, args } = parseCommand(process.argv)

    if (!command) {

      showHelp()
      return

    }

    /*
    Load command handler
    */

    const handler = await getCommand(command)

    if (!handler) {

      console.error("")
      console.error(`Unknown command: ${command}`)
      console.error("")
      console.log("Run 'najumi --help' to see available commands.")
      console.log("")

      process.exit(1)

    }

    /*
    Execute command
    */

    await handler(args)

  } catch (error) {

    console.error("")
    console.error("Najumi CLI Error")
    console.error(error.message)
    console.error("")

    process.exit(1)

  }

}

/*
Start CLI
*/
main()