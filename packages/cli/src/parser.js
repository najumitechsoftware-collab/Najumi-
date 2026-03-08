// packages/cli/src/parser.js

function sanitizeInput(input) {
  if (typeof input !== "string") return ""

  // remove dangerous characters
  return input.replace(/[;&|`]/g, "")
}

function parseFlags(args) {
  const flags = {}
  const remainingArgs = []

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    if (arg.startsWith("--")) {
      const key = arg.replace(/^--/, "")

      const value = args[i + 1] && !args[i + 1].startsWith("--")
        ? args[++i]
        : true

      flags[key] = sanitizeInput(value)
    } else {
      remainingArgs.push(sanitizeInput(arg))
    }
  }

  return { flags, args: remainingArgs }
}

export function parseCommand(argv) {
  if (!Array.isArray(argv)) {
    throw new Error("Invalid CLI arguments")
  }

  const command = sanitizeInput(argv[2] || "")

  const rawArgs = argv.slice(3)

  const { flags, args } = parseFlags(rawArgs)

  return {
    command,
    args,
    flags
  }
}