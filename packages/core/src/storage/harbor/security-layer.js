// packages/core/src/storage/harbor/security-layer.js

import path from "path"
import crypto from "crypto"

class HarborSecurityLayer {

  constructor(options = {}) {

    this.maxFileSize = options.maxFileSize || 100 * 1024 * 1024 // 100MB

    this.allowedMimeTypes = options.allowedMimeTypes || null

    this.blockedExtensions = [
      ".exe",
      ".sh",
      ".bat",
      ".cmd",
      ".msi",
      ".dll",
      ".php",
      ".cgi"
    ]

  }

  /**
   * Validate file size
   */
  validateSize(size) {

    if (size > this.maxFileSize) {

      throw new Error("File exceeds maximum allowed size")

    }

    return true

  }

  /**
   * Validate file extension
   */
  validateExtension(filename) {

    const ext = path.extname(filename).toLowerCase()

    if (this.blockedExtensions.includes(ext)) {

      throw new Error(`Blocked file extension: ${ext}`)

    }

    return true

  }

  /**
   * Validate MIME type
   */
  validateMime(mime) {

    if (!this.allowedMimeTypes) return true

    if (!this.allowedMimeTypes.includes(mime)) {

      throw new Error(`Unsupported file type: ${mime}`)

    }

    return true

  }

  /**
   * Prevent path traversal
   */
  validatePath(filePath) {

    if (filePath.includes("..")) {

      throw new Error("Invalid file path")

    }

    return true

  }

  /**
   * Detect suspicious filenames
   */
  validateFilename(name) {

    const suspicious = [
      "passwd",
      "shadow",
      "system32"
    ]

    for (const word of suspicious) {

      if (name.toLowerCase().includes(word)) {

        throw new Error("Suspicious filename detected")

      }

    }

    return true

  }

  /**
   * File fingerprint
   */
  fingerprint(buffer) {

    return crypto
      .createHash("sha256")
      .update(buffer)
      .digest("hex")

  }

  /**
   * Run all validations
   */
  validate(metadata) {

    const {
      filename,
      size,
      mime,
      path
    } = metadata

    if (size) this.validateSize(size)

    if (filename) {

      this.validateExtension(filename)

      this.validateFilename(filename)

    }

    if (mime) {

      this.validateMime(mime)

    }

    if (path) {

      this.validatePath(path)

    }

    return true

  }

}

let securityInstance = null

export function initHarborSecurity(options = {}) {

  if (!securityInstance) {

    securityInstance = new HarborSecurityLayer(options)

  }

  return securityInstance

}

export function getHarborSecurity() {

  if (!securityInstance) {

    throw new Error("Harbor security not initialized")

  }

  return securityInstance

}