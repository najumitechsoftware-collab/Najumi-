// packages/core/src/build/build-engine.js

import { scanProjectFiles } from "./file-scanner.js"
import { bundleModules } from "./bundler.js"
import { optimizeAssets } from "./asset-optimizer.js"
import { writeBuildOutput } from "./build-writer.js"

export async function runBuild(config = {}) {

  try {

    console.log("🔨 Starting Najumi production build...")

    // 1. scan project
    const projectFiles = await scanProjectFiles()

    // 2. bundle source modules
    const bundledCode = await bundleModules(projectFiles)

    // 3. optimize assets
    const optimizedAssets = await optimizeAssets(projectFiles)

    // 4. write build output
    await writeBuildOutput({
      code: bundledCode,
      assets: optimizedAssets,
      config
    })

    console.log("✅ Build completed successfully")

  } catch (error) {

    console.error("❌ Build failed:", error)

    throw error

  }

}