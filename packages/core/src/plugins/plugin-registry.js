// packages/core/src/plugins/plugin-registry.js

export function createPluginRegistry() {

  const plugins = []

  function add(plugin) {

    if (typeof plugin !== "function") {
      throw new Error("Plugin must be a function")
    }

    plugins.push(plugin)

  }

  function getAll() {
    return plugins
  }

  function clear() {
    plugins.length = 0
  }

  function count() {
    return plugins.length
  }

  return {

    plugins,

    add,
    getAll,
    clear,
    count

  }

}