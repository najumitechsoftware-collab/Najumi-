// packages/core/src/package-manager/update.js

import fs from "fs/promises"
import path from "path"

const REGISTRY_URL = "https://registry.najumi.dev"

async function fetchPackageInfo(name) {

  const url = `${REGISTRY_URL}/${name}.json`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Package not found: ${name}`)
  }

  return await response.json()

}

async function readPackageConfig(projectRoot) {

  const configPath = path.join(projectRoot, "najumi.packages.json")

  try {

    const content = await fs.readFile(configPath, "utf8")

    return JSON.parse(content)

  } catch {

    return { dependencies: {} }

  }

}

async function savePackageConfig(projectRoot, config) {

  const configPath = path.join(projectRoot, "najumi.packages.json")

  await fs.writeFile(
    configPath,
    JSON.stringify(config, null, 2),
    "utf8"
  )

}

async function downloadPackage(packageInfo, modulesDir) {

  const packageDir = path.join(modulesDir, packageInfo.name)

  await fs.rm(packageDir, { recursive: true, force: true })

  await fs.mkdir(packageDir, { recursive: true })

  for (const file of packageInfo.files) {

    const fileUrl = `${REGISTRY_URL}/${packageInfo.name}/${file}`

    const response = await fetch(fileUrl)

    if (!response.ok) {
      throw new Error(`Failed to download file: ${file}`)
    }

    const content = await response.text()

    const filePath = path.join(packageDir, file)

    await fs.mkdir(path.dirname(filePath), { recursive: true })

    await fs.writeFile(filePath, content, "utf8")

  }

}

export async function updatePackages() {

  const projectRoot = process.cwd()

  const modulesDir = path.join(projectRoot, "najumi_modules")

  const config = await readPackageConfig(projectRoot)

  const dependencies = config.dependencies || {}

  if (Object.keys(dependencies).length === 0) {

    console.log("No packages installed.")

    return

  }

  console.log("🔍 Checking for package updates...")

  for (const [name, currentVersion] of Object.entries(dependencies)) {

    try {

      const packageInfo = await fetchPackageInfo(name)

      const latestVersion = packageInfo.version

      if (latestVersion !== currentVersion) {

        console.log(`⬆ Updating ${name}: ${currentVersion} → ${latestVersion}`)

        await downloadPackage(packageInfo, modulesDir)

        dependencies[name] = latestVersion

      } else {

        console.log(`✔ ${name} is up to date (${currentVersion})`)

      }

    } catch (error) {

      console.error(`Failed to update package: ${name}`)

    }

  }

  await savePackageConfig(projectRoot, { dependencies })

  console.log("✅ Package update process completed")

}