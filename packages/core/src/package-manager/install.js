// packages/core/src/package-manager/install.js

import fs from "fs/promises"
import path from "path"

const REGISTRY_URL = "https://registry.najumi.dev"

async function ensureDirectory(dir) {

  try {
    await fs.mkdir(dir, { recursive: true })
  } catch {}

}

async function fetchPackageInfo(name) {

  const url = `${REGISTRY_URL}/${name}.json`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Package not found: ${name}`)
  }

  return await response.json()

}

async function downloadPackage(packageInfo, modulesDir) {

  const packageDir = path.join(modulesDir, packageInfo.name)

  await ensureDirectory(packageDir)

  for (const file of packageInfo.files) {

    const fileUrl = `${REGISTRY_URL}/${packageInfo.name}/${file}`

    const response = await fetch(fileUrl)

    if (!response.ok) {
      throw new Error(`Failed to download file: ${file}`)
    }

    const content = await response.text()

    const filePath = path.join(packageDir, file)

    await ensureDirectory(path.dirname(filePath))

    await fs.writeFile(filePath, content, "utf8")

  }

}

async function updatePackageConfig(projectRoot, packageName, version) {

  const configPath = path.join(projectRoot, "najumi.packages.json")

  let config = { dependencies: {} }

  try {

    const content = await fs.readFile(configPath, "utf8")

    config = JSON.parse(content)

  } catch {}

  config.dependencies[packageName] = version

  await fs.writeFile(
    configPath,
    JSON.stringify(config, null, 2),
    "utf8"
  )

}

export async function installPackage(name) {

  const projectRoot = process.cwd()

  const modulesDir = path.join(projectRoot, "najumi_modules")

  console.log(`📦 Installing package: ${name}`)

  await ensureDirectory(modulesDir)

  // fetch package metadata
  const packageInfo = await fetchPackageInfo(name)

  console.log(`⬇ Downloading ${packageInfo.name}@${packageInfo.version}`)

  // download package files
  await downloadPackage(packageInfo, modulesDir)

  // update project package config
  await updatePackageConfig(
    projectRoot,
    packageInfo.name,
    packageInfo.version
  )

  console.log(`✅ Package installed: ${packageInfo.name}`)

}