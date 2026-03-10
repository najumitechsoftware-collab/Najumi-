// packages/core/src/security/vault/secret-store.js

import crypto from "crypto"

class SecretStore {

  constructor(encryptionKey) {

    if (!encryptionKey) {
      throw new Error("SecretStore requires encryption key")
    }

    this.key = encryptionKey
    this.store = new Map()
    this.audit = []

  }

  /**
   * Encrypt value
   */
  encrypt(value) {

    const iv = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv(
      "aes-256-gcm",
      this.key,
      iv
    )

    let encrypted = cipher.update(value, "utf8", "hex")

    encrypted += cipher.final("hex")

    const tag = cipher.getAuthTag().toString("hex")

    return {
      iv: iv.toString("hex"),
      value: encrypted,
      tag
    }

  }

  /**
   * Decrypt value
   */
  decrypt(payload) {

    const iv = Buffer.from(payload.iv, "hex")

    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      this.key,
      iv
    )

    decipher.setAuthTag(Buffer.from(payload.tag, "hex"))

    let decrypted = decipher.update(payload.value, "hex", "utf8")

    decrypted += decipher.final("utf8")

    return decrypted

  }

  /**
   * Store secret
   */
  set(key, value) {

    if (typeof key !== "string") {
      throw new Error("Secret key must be string")
    }

    if (typeof value !== "string") {
      value = String(value)
    }

    const encrypted = this.encrypt(value)

    this.store.set(key, encrypted)

  }

  /**
   * Retrieve secret
   */
  get(key) {

    if (!this.store.has(key)) {
      return undefined
    }

    const encrypted = this.store.get(key)

    const value = this.decrypt(encrypted)

    this.logAccess(key)

    return value

  }

  /**
   * Check existence
   */
  has(key) {

    return this.store.has(key)

  }

  /**
   * Require secrets
   */
  require(keys = []) {

    for (const key of keys) {

      if (!this.store.has(key)) {
        throw new Error(`Missing required secret: ${key}`)
      }

    }

  }

  /**
   * Mask secret
   */
  mask(value) {

    if (!value) return ""

    if (value.length <= 4) {
      return "****"
    }

    return value.slice(0, 2) + "****" + value.slice(-2)

  }

  /**
   * Safe access for logging
   */
  safe(key) {

    const value = this.get(key)

    return this.mask(value)

  }

  /**
   * Prevent accidental JSON leaks
   */
  toJSON() {

    return "[SecretStore Protected]"

  }

  /**
   * Prevent console logging leaks
   */
  toString() {

    return "[SecretStore Protected]"

  }

  /**
   * Audit access
   */
  logAccess(key) {

    this.audit.push({
      key,
      time: Date.now()
    })

  }

  /**
   * List keys only (not values)
   */
  list() {

    return Array.from(this.store.keys())

  }

}

export function createSecretStore(encryptionKey) {

  return new SecretStore(encryptionKey)

}