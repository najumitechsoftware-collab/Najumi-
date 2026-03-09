// packages/core/src/plugins/plugin-engine.js

import { createPluginRegistry } from "./plugin-registry.js"

export function createPluginEngine(context = {}) {

  const registry = createPluginRegistry()

  function register(plugin) {

    if (typeof plugin !== "function") {
      throw new Error("Plugin must be a function")
    }

    registry.add(plugin)

  }

  async function run() {

    const plugins = registry.getAll()

    for (const plugin of plugins) {

      try {

        await plugin(context)

      } catch (error) {

        console.error("Plugin execution error:", error)

      }

    }

  }

  function clear() {
    registry.clear()
  }

  return {

    register,
    run,
    clear,

    plugins: registry.plugins

  }

}