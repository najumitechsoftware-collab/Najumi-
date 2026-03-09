// packages/core/src/dev/file-watcher.js

import fs from "fs"
import path from "path"

export function startFileWatcher({ onChange }) {

  const watchDirs = [
    "src",
    "modules",
    "public"
  ]

  console.log("Starting Najumi file watcher...")

  watchDirs.forEach((dir) => {

    const fullPath = path.join(process.cwd(), dir)

    if (!fs.existsSync(fullPath)) {
      return
    }

    fs.watch(fullPath, { recursive: true }, (eventType, filename) => {

      if (!filename) return

      const changedFile = path.join(fullPath, filename)

      console.log(`File changed: ${changedFile}`)

      if (onChange) {
        onChange(changedFile)
      }

    })

  })

}