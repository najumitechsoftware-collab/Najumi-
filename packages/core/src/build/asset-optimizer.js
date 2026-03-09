// packages/core/src/build/asset-optimizer.js

import fs from "fs"
import path from "path"

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath)
  } catch {
    return null
  }
}

function minifyCSS(content) {
  return content
    .toString()
    .replace(/\s+/g, " ")
    .replace(/\n/g, "")
    .replace(/\t/g, "")
}

function minifyJS(content) {
  return content
    .toString()
    .replace(/\s+/g, " ")
    .replace(/\n/g, "")
    .replace(/\t/g, "")
}

export async function optimizeAssets(projectFiles) {

  const assets = projectFiles.assets || []

  const optimized = []

  for (const file of assets) {

    const ext = path.extname(file)

    const content = readFileSafe(file)

    if (!content) {
      continue
    }

    let optimizedContent = content

    // optimize CSS
    if (ext === ".css") {
      optimizedContent = minifyCSS(content)
    }

    // optimize JS
    if (ext === ".js") {
      optimizedContent = minifyJS(content)
    }

    optimized.push({
      file,
      content: optimizedContent
    })

  }

  return optimized

}