// packages/core/src/build/build-writer.js

import fs from "fs"
import path from "path"

function ensureDir(dir) {

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

}

export async function writeBuildOutput({ code, assets, config }) {

  const projectRoot = process.cwd()

  const distDir = path.join(projectRoot, "dist")

  const assetsDir = path.join(distDir, "assets")

  // create dist folders
  ensureDir(distDir)
  ensureDir(assetsDir)

  // write bundled code
  const serverFile = path.join(distDir, "server.js")

  fs.writeFileSync(serverFile, code, "utf8")

  // write optimized assets
  for (const asset of assets) {

    const fileName = path.basename(asset.file)

    const outputPath = path.join(assetsDir, fileName)

    fs.writeFileSync(outputPath, asset.content)

  }

  console.log("📦 Build output written to /dist")

}