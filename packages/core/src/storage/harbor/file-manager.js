// packages/core/src/storage/harbor/file-manager.js

import fs from "fs"
import path from "path"
import crypto from "crypto"

class FileManager {

  constructor(options = {}) {

    this.root = options.root || path.join(process.cwd(), "storage")

    this.index = new Map()

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
   * Generate secure file id
   */
  generateId() {

    return crypto.randomBytes(16).toString("hex")

  }

  /**
   * Hash directory structure
   */
  resolvePath(fileId) {

    const dir1 = fileId.slice(0, 2)
    const dir2 = fileId.slice(2, 4)

    const dirPath = path.join(this.root, dir1, dir2)

    if (!fs.existsSync(dirPath)) {

      fs.mkdirSync(dirPath, { recursive: true })

    }

    return path.join(dirPath, fileId)

  }

  /**
   * Register file metadata
   */
  register(metadata) {

    const id = metadata.id || this.generateId()

    const record = {
      id,
      name: metadata.name,
      mime: metadata.mime,
      size: metadata.size,
      path: metadata.path,
      createdAt: Date.now(),
      private: metadata.private || false
    }

    this.index.set(id, record)

    return record

  }

  /**
   * Get metadata
   */
  get(id) {

    return this.index.get(id) || null

  }

  /**
   * Check existence
   */
  exists(id) {

    return this.index.has(id)

  }

  /**
   * Delete file
   */
  async delete(id) {

    const record = this.index.get(id)

    if (!record) return false

    if (fs.existsSync(record.path)) {

      await fs.promises.unlink(record.path)

    }

    this.index.delete(id)

    return true

  }

  /**
   * List files
   */
  list(limit = 100) {

    return Array.from(this.index.values()).slice(0, limit)

  }

  /**
   * Secure access check
   */
  canAccess(id, options = {}) {

    const record = this.index.get(id)

    if (!record) return false

    if (!record.private) return true

    if (options.user && options.user.authenticated) {
      return true
    }

    return false

  }

  /**
   * Create download token
   */
  createAccessToken(id, ttl = 300) {

    const token = crypto.randomBytes(24).toString("hex")

    const expires = Date.now() + (ttl * 1000)

    return {
      token,
      id,
      expires
    }

  }

}

let fileManagerInstance = null

export function initFileManager(options = {}) {

  if (!fileManagerInstance) {

    fileManagerInstance = new FileManager(options)

  }

  return fileManagerInstance

}

export function getFileManager() {

  if (!fileManagerInstance) {
    throw new Error("FileManager not initialized")
  }

  return fileManagerInstance

}