// packages/cli/src/commands/build.js

import fs from "fs/promises"
import path from "path"
import { performance } from "perf_hooks"

async function copyDirectory(src, dest) {

  await fs.mkdir(dest, { recursive: true })

  const entries = await fs.readdir(src, { withFileTypes: true })

  for (const entry of entries) {

    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {

      console.log(`📂 Processing directory: ${entry.name}`)

      await copyDirectory(srcPath, destPath)

    } else {

      console.log(`📄 Bundling file: ${entry.name}`)

      await fs.copyFile(srcPath, destPath)

    }

  }

}

function formatTime(ms) {

  if (ms < 1000) {
    return `${ms.toFixed(0)}ms`
  }

  const seconds = ms / 1000

  if (seconds < 60) {
    return `${seconds.toFixed(2)}s`
  }

  const minutes = seconds / 60

  return `${minutes.toFixed(2)}m`

}

export default async function handler() {

  const projectRoot = process.cwd()

  const srcDir = path.join(projectRoot, "src")
  const distDir = path.join(projectRoot, "dist")

  const startTime = performance.now()

  try {

    console.log("")
    console.log("🚀 Starting Najumi production build")
    console.log("")

    console.log("🧹 Cleaning previous build...")

    await fs.rm(distDir, { recursive: true, force: true })

    console.log("📦 Preparing build directory...")

    await fs.mkdir(distDir, { recursive: true })

    console.log("⚙️ Processing project files...")
    console.log("")

    await copyDirectory(srcDir, distDir)

    const endTime = performance.now()

    const duration = formatTime(endTime - startTime)

    console.log("")
    console.log("✅ Build completed successfully")
    console.log(`⏱ Build time: ${duration}`)
    console.log(`📁 Output directory: ${distDir}`)
    console.log("")

  } catch (error) {

    console.error("")
    console.error("❌ Build failed")
    console.error(error.message)
    console.error("")

    process.exit(1)

  }

}