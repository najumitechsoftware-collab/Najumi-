// packages/core/src/backend/atlas/model-system/model-loader.js

import fs from "fs/promises"
import path from "path"
import { log } from "../../../utils/logger.js"

/**
 * Load all Atlas models automatically
 */
export async function loadModels(atlasEngine, rootDir = process.cwd()) {

  const modelsDir = path.join(rootDir, "models")

  try {

    // check if models folder exists
    const exists = await fs.stat(modelsDir).then(() => true).catch(() => false)

    if (!exists) {

      log("Atlas: no models directory found")

      return

    }

    const files = await fs.readdir(modelsDir)

    for (const file of files) {

      if (!file.endsWith(".js")) {
        continue
      }

      const filePath = path.join(modelsDir, file)

      try {

        const module = await import(filePath)

        const model = module.default || module

        if (!model || !model.name) {

          console.warn(`Invalid model file: ${file}`)

          continue

        }

        atlasEngine.registerModel(model)

      } catch (error) {

        console.error(`Atlas failed to load model: ${file}`, error)

      }

    }

  } catch (error) {

    console.error("Atlas model loader error:", error)

  }

}