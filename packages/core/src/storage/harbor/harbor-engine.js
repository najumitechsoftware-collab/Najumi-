// packages/core/src/storage/harbor/harbor-engine.js

import fs from "fs"
import path from "path"
import crypto from "crypto"
import { pipeline } from "stream/promises"

class HarborEngine {

  constructor(options = {}) {

    this.root = options.root || path.join(process.cwd(), "storage")

    this.maxFileSize = options.maxFileSize || 50 * 1024 * 1024 // 50MB

    this.allowedTypes = options.allowedTypes || null

    this.drivers = new Map()

    this.ensureStorage()

  }

  /**
   * Ensure storage directory exists
   */
  ensureStorage() {

    if (!fs.existsSync(this.root)) {
      fs.mkdirSync(this.root, { recursive: true })
    }

  }

  /**
   * Register storage driver
   */
  registerDriver(name, driver) {

    this.drivers.set(name, driver)

  }

  /**
   * Generate secure filename
   */
  generateName(original) {

    const ext = path.extname(original)

    const id = crypto.randomBytes(16).toString("hex")

    return `${Date.now()}-${id}${ext}`

  }

  /**
   * Validate file type
   */
  validateType(mime) {

    if (!this.allowedTypes) return true

    return this.allowedTypes.includes(mime)

  }

  /**
   * Upload file using stream
   */
  async upload(stream, metadata = {}) {

    const {

      filename = "file",
      mime = "application/octet-stream",
      driver = "local"

    } = metadata

    if (!this.validateType(mime)) {
      throw new Error("File type not allowed")
    }

    const storageDriver = this.drivers.get(driver)

    if (!storageDriver) {
      throw new Error(`Storage driver not found: ${driver}`)
    }

    const name = this.generateName(filename)

    return storageDriver.save({
      name,
      stream,
      mime,
      root: this.root
    })

  }

  /**
   * Save buffer
   */
  async saveBuffer(buffer, metadata = {}) {

    const { filename = "file" } = metadata

    const name = this.generateName(filename)

    const filePath = path.join(this.root, name)

    await fs.promises.writeFile(filePath, buffer)

    return {
      id: name,
      path: filePath
    }

  }

  /**
   * Get file path
   */
  get(id) {

    const filePath = path.join(this.root, id)

    if (!fs.existsSync(filePath)) {
      return null
    }

    return filePath

  }

  /**
   * Delete file
   */
  async delete(id) {

    const filePath = path.join(this.root, id)

    if (!fs.existsSync(filePath)) {
      return false
    }

    await fs.promises.unlink(filePath)

    return true

  }

  /**
   * Create readable stream
   */
  stream(id) {

    const filePath = path.join(this.root, id)

    if (!fs.existsSync(filePath)) {
      throw new Error("File not found")
    }

    return fs.createReadStream(filePath)

  }

}

let harborInstance = null

export function initHarbor(options = {}) {

  if (!harborInstance) {
    harborInstance = new HarborEngine(options)
  }

  return harborInstance

}

export function getHarbor() {

  if (!harborInstance) {
    throw new Error("Harbor not initialized")
  }

  return harborInstance

}