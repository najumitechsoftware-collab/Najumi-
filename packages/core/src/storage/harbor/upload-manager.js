// packages/core/src/storage/harbor/upload-manager.js

import fs from "fs"
import path from "path"
import crypto from "crypto"
import { pipeline } from "stream/promises"

class UploadManager {

  constructor(options = {}) {

    this.tmpDir = options.tmpDir || path.join(process.cwd(), "storage/tmp")

    this.chunkSize = options.chunkSize || 10 * 1024 * 1024 // 10MB

    this.activeUploads = new Map()

    this.ensureTmp()

  }

  /**
   * Ensure temp directory exists
   */
  ensureTmp() {

    if (!fs.existsSync(this.tmpDir)) {

      fs.mkdirSync(this.tmpDir, { recursive: true })

    }

  }

  /**
   * Create upload session
   */
  createUpload(metadata = {}) {

    const id = crypto.randomBytes(16).toString("hex")

    this.activeUploads.set(id, {
      id,
      metadata,
      chunks: [],
      createdAt: Date.now()
    })

    return id

  }

  /**
   * Upload chunk
   */
  async uploadChunk(uploadId, chunkStream, index) {

    const upload = this.activeUploads.get(uploadId)

    if (!upload) {
      throw new Error("Upload session not found")
    }

    const chunkPath = path.join(
      this.tmpDir,
      `${uploadId}.part${index}`
    )

    const writeStream = fs.createWriteStream(chunkPath)

    await pipeline(chunkStream, writeStream)

    upload.chunks[index] = chunkPath

    return {
      chunk: index,
      path: chunkPath
    }

  }

  /**
   * Complete upload (merge chunks)
   */
  async complete(uploadId, destination) {

    const upload = this.activeUploads.get(uploadId)

    if (!upload) {
      throw new Error("Upload session not found")
    }

    const writeStream = fs.createWriteStream(destination)

    for (const chunkPath of upload.chunks) {

      const readStream = fs.createReadStream(chunkPath)

      await pipeline(readStream, writeStream, { end: false })

      fs.unlinkSync(chunkPath)

    }

    writeStream.end()

    this.activeUploads.delete(uploadId)

    return {
      id: uploadId,
      path: destination
    }

  }

  /**
   * Abort upload
   */
  abort(uploadId) {

    const upload = this.activeUploads.get(uploadId)

    if (!upload) return false

    for (const chunkPath of upload.chunks) {

      if (fs.existsSync(chunkPath)) {
        fs.unlinkSync(chunkPath)
      }

    }

    this.activeUploads.delete(uploadId)

    return true

  }

  /**
   * Upload progress
   */
  progress(uploadId) {

    const upload = this.activeUploads.get(uploadId)

    if (!upload) return null

    return {
      chunksUploaded: upload.chunks.length
    }

  }

}

let uploadManagerInstance = null

export function initUploadManager(options = {}) {

  if (!uploadManagerInstance) {

    uploadManagerInstance = new UploadManager(options)

  }

  return uploadManagerInstance

}

export function getUploadManager() {

  if (!uploadManagerInstance) {
    throw new Error("UploadManager not initialized")
  }

  return uploadManagerInstance

}