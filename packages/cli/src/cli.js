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
Load package.json for version
*/
function getVersion() {

  try {

    const pkgPath = path.resolve(__dirname, "../package.json")
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"))

    return pkg.version

  } catch {

    return "unknown"

  }

}

/*
Show help
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
  console.log("Examples:")
  console.log("")
  console.log("  najumi create app my-app")
  console.log("  najumi dev")
  console.log("")
  console.log("Options:")
  console.log("")
  console.log("  --help     Show help")
  console.log("  --version  Show version")
  console.log("")

}

/*
Main CLI runner
*/
async function main() {

  try {

    const argv = process.argv.slice(2)

    /*
    Global options
    */

    if (argv.includes("--help") || argv.length === 0) {

      showHelp()
      return

    }

    if (argv.includes("--version")) {

      console.log(`Najumi CLI v${getVersion()}`)
      return

    }

    /*
    Parse command
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

      console.error(`Unknown command: ${command}`)
      console.log("")
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
    console.error("Najumi CLI Error:")
    console.error(error.message)
    console.error("")

    process.exit(1)

  }

}

main()