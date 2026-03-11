// packages/core/src/dev/file-watcher.js

import fs from "fs"
import path from "path"

import { triggerHotReload } from "./hot-reload.js"

export function startFileWatcher({ onChange }) {

  const watchDirs = [
    "src",
    "modules",
    "public"
  ]

  console.log("📡 Starting Najumi file watcher...")

  watchDirs.forEach((dir) => {

    const fullPath = path.join(process.cwd(), dir)

    if (!fs.existsSync(fullPath)) {
      return
    }

    try {

      const watcher = fs.watch(
        fullPath,
        { recursive: true },
        (eventType, filename) => {

          if (!filename) return

          const changedFile = path.join(fullPath, filename)

          console.log(`📄 File changed: ${changedFile}`)

          /*
          Run custom handler (compiler / server restart)
          */
          if (onChange) {
            onChange(changedFile)
          }

          /*
          Trigger secure hot reload
          */
          triggerHotReload()

        }
      )

      watcher.on("error", (err) => {

        console.error("File watcher error:", err)

      })

    } catch (error) {

      console.error(`Failed to watch directory: ${fullPath}`)
      console.error(error)

    }

  })

}