// packages/core/src/storage/harbor/drivers/local-driver.js

import fs from "fs"
import path from "path"
import crypto from "crypto"
import { pipeline } from "stream/promises"

class LocalStorageDriver {

  constructor(options = {}) {

    this.root = options.root || path.join(process.cwd(), "storage")

    this.ensureRoot()

  }

  /**
   * Ensure storage root exists
   */
  ensureRoot() {

    if (!fs.existsSync(this.root)) {

      fs.mkdirSync(this.root, { recursive: true })

    }

  }

  /**
   * Generate hashed directory path
   */
  resolvePath(filename) {

    const hash = crypto
      .createHash("sha1")
      .update(filename)
      .digest("hex")

    const dir1 = hash.slice(0, 2)
    const dir2 = hash.slice(2, 4)

    const dirPath = path.join(this.root, dir1, dir2)

    if (!fs.existsSync(dirPath)) {

      fs.mkdirSync(dirPath, { recursive: true })

    }

    return path.join(dirPath, filename)

  }

  /**
   * Save file using streaming
   */
  async save({ name, stream }) {

    const filePath = this.resolvePath(name)

    const tempPath = `${filePath}.upload`

    const writeStream = fs.createWriteStream(tempPath, {
      flags: "w",
      mode: 0o600
    })

    await pipeline(stream, writeStream)

    // atomic move
    await fs.promises.rename(tempPath, filePath)

    const stat = await fs.promises.stat(filePath)

    return {
      id: name,
      path: filePath,
      size: stat.size
    }

  }

  /**
   * Read file stream
   */
  read(id) {

    const filePath = this.resolvePath(id)

    if (!fs.existsSync(filePath)) {

      throw new Error("File not found")

    }

    return fs.createReadStream(filePath)

  }

  /**
   * Delete file
   */
  async delete(id) {

    const filePath = this.resolvePath(id)

    if (!fs.existsSync(filePath)) {

      return false

    }

    await fs.promises.unlink(filePath)

    return true

  }

  /**
   * File exists
   */
  exists(id) {

    const filePath = this.resolvePath(id)

    return fs.existsSync(filePath)

  }

  /**
   * Get file metadata
   */
  async stat(id) {

    const filePath = this.resolvePath(id)

    if (!fs.existsSync(filePath)) {

      return null

    }

    const stat = await fs.promises.stat(filePath)

    return {
      size: stat.size,
      createdAt: stat.birthtime,
      modifiedAt: stat.mtime
    }

  }

}

let localDriverInstance = null

export function initLocalDriver(options = {}) {

  if (!localDriverInstance) {

    localDriverInstance = new LocalStorageDriver(options)

  }

  return localDriverInstance

}

export function getLocalDriver() {

  if (!localDriverInstance) {

    throw new Error("Local storage driver not initialized")

  }

  return localDriverInstance

}