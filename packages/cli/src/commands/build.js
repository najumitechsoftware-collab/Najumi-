// packages/cli/src/commands/build.js

import fs from "fs/promises"
import path from "path"

async function copyDirectory(src, dest) {

  await fs.mkdir(dest, { recursive: true })

  const entries = await fs.readdir(src, { withFileTypes: true })

  for (const entry of entries) {

    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {

      await copyDirectory(srcPath, destPath)

    } else {

      await fs.copyFile(srcPath, destPath)

    }

  }

}

export default async function handler() {

  const projectRoot = process.cwd()

  const srcDir = path.join(projectRoot, "src")
  const distDir = path.join(projectRoot, "dist")

  try {

    console.log("Building Najumi application...")

    await fs.rm(distDir, { recursive: true, force: true })

    await fs.mkdir(distDir)

    await copyDirectory(srcDir, distDir)

    console.log("Build completed successfully.")

  } catch (error) {

    console.error("Build failed:", error.message)

  }

}