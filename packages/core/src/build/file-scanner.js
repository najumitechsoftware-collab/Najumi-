// packages/core/src/build/file-scanner.js

import fs from "fs"
import path from "path"

function scanDirectory(dir, collected = []) {

  if (!fs.existsSync(dir)) {
    return collected
  }

  const files = fs.readdirSync(dir)

  for (const file of files) {

    const fullPath = path.join(dir, file)

    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {

      scanDirectory(fullPath, collected)

    } else {

      collected.push(fullPath)

    }

  }

  return collected

}

export async function scanProjectFiles() {

  const projectRoot = process.cwd()

  const scanTargets = [
    "src",
    "modules",
    "public"
  ]

  const results = {
    source: [],
    modules: [],
    assets: []
  }

  for (const target of scanTargets) {

    const fullPath = path.join(projectRoot, target)

    if (!fs.existsSync(fullPath)) {
      continue
    }

    const files = scanDirectory(fullPath)

    for (const file of files) {

      if (target === "src") {
        results.source.push(file)
      }

      if (target === "modules") {
        results.modules.push(file)
      }

      if (target === "public") {
        results.assets.push(file)
      }

    }

  }

  return results

}