// packages/cli/src/registry.js

const commandMap = {
  create: () => import("./commands/create.js"),
  dev: () => import("./commands/dev.js"),
  build: () => import("./commands/build.js"),
  start: () => import("./commands/start.js")
}

export async function getCommand(command) {
  if (!commandMap[command]) {
    return null
  }

  const module = await commandMap[command]()

  return module.default
}