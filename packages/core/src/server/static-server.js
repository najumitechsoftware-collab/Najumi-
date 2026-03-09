// packages/core/src/server/static-server.js

import fs from "fs"
import path from "path"

export async function serveStatic(req, res) {

  const publicDir = path.join(process.cwd(), "public")

  let filePath = path.join(publicDir, req.url)

  if (req.url === "/") {
    filePath = path.join(publicDir, "index.html")
  }

  if (!filePath.startsWith(publicDir)) {
    return false
  }

  try {

    const stat = fs.statSync(filePath)

    if (stat.isFile()) {

      const data = fs.readFileSync(filePath)

      res.statusCode = 200
      res.end(data)

      return true

    }

  } catch (error) {

    return false

  }

}