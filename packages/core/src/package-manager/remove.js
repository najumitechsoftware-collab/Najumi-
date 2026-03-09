// packages/core/src/package-manager/remove.js

import fs from "fs/promises"
import path from "path"

async function removeDirectory(dir) {

  try {
    await fs.rm(dir, { recursive: true, force: true })
  } catch {}

}

async function updatePackageConfig(projectRoot, packageName) {

  const configPath = path.join(projectRoot, "najumi.packages.json")

  let config

  try {

    const content = await fs.readFile(configPath, "utf8")

    config = JSON.parse(content)

  } catch {

    console.log("No package configuration found.")
    return

  }

  if (!config.dependencies || !config.dependencies[packageName]) {

    console.log(`Package not listed in dependencies: ${packageName}`)
    return

  }

  delete config.dependencies[packageName]

  await fs.writeFile(
    configPath,
    JSON.stringify(config, null, 2),
    "utf8"
  )

}

export async function removePackage(name) {

  const projectRoot = process.cwd()

  const modulesDir = path.join(projectRoot, "najumi_modules")

  const packageDir = path.join(modulesDir, name)

  console.log(`🗑 Removing package: ${name}`)

  // remove package directory
  await removeDirectory(packageDir)

  // update configuration
  await updatePackageConfig(projectRoot, name)

  console.log(`✅ Package removed: ${name}`)

}