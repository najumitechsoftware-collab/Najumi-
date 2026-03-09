// packages/core/src/plugins/plugin-loader.js

import fs from "fs"
import path from "path"

export async function loadPlugins(pluginEngine) {

  const projectRoot = process.cwd()

  const pluginDirs = [
    "plugins",
    "modules"
  ]

  for (const dir of pluginDirs) {

    const fullDir = path.join(projectRoot, dir)

    if (!fs.existsSync(fullDir)) {
      continue
    }

    const files = fs.readdirSync(fullDir)

    for (const file of files) {

      const filePath = path.join(fullDir, file)

      const stat = fs.statSync(filePath)

      // modules/*/plugin.js
      if (stat.isDirectory()) {

        const modulePlugin = path.join(filePath, "plugin.js")

        if (fs.existsSync(modulePlugin)) {

          const pluginModule = await import(modulePlugin)

          if (pluginModule.default) {
            pluginEngine.register(pluginModule.default)
          }

        }

        continue
      }

      // plugins/*.js
      if (!file.endsWith(".js")) {
        continue
      }

      const pluginFile = path.join(fullDir, file)

      const pluginModule = await import(pluginFile)

      if (pluginModule.default) {
        pluginEngine.register(pluginModule.default)
      }

    }

  }

}