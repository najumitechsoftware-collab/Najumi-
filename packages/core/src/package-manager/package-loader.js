// packages/core/src/package-manager/package-loader.js

import fs from "fs/promises"
import path from "path"

async function readPackageConfig(projectRoot) {

  const configPath = path.join(projectRoot, "najumi.packages.json")

  try {

    const content = await fs.readFile(configPath, "utf8")

    return JSON.parse(content)

  } catch {

    return { dependencies: {} }

  }

}

async function loadPackage(packageName, modulesDir, runtime) {

  const packagePath = path.join(modulesDir, packageName)

  const pluginFile = path.join(packagePath, "plugin.js")

  try {

    const module = await import(pluginFile)

    if (module.default) {

      await module.default(runtime)

      console.log(`📦 Loaded package: ${packageName}`)

    }

  } catch (error) {

    console.error(`Failed to load package: ${packageName}`)

  }

}

export async function loadInstalledPackages(runtime) {

  const projectRoot = process.cwd()

  const modulesDir = path.join(projectRoot, "najumi_modules")

  const config = await readPackageConfig(projectRoot)

  const dependencies = config.dependencies || {}

  const packageNames = Object.keys(dependencies)

  if (packageNames.length === 0) {

    console.log("No installed packages found.")

    return

  }

  console.log("🔌 Loading installed packages...")

  for (const name of packageNames) {

    await loadPackage(name, modulesDir, runtime)

  }

  console.log("✅ Package loading completed")

}