// packages/core/src/security/vault/vault-engine.js

import crypto from "crypto"
import fs from "fs"
import path from "path"

class VaultEngine {

  constructor() {

    this.secrets = new Map()
    this.accessLog = []
    this.encryptionKey = null

  }

  /**
   * Initialize Vault
   */
  async init(config = {}) {

    const key = config.masterKey || process.env.NAJUMI_VAULT_KEY

    if (!key) {
      throw new Error("Vault requires NAJUMI_VAULT_KEY")
    }

    this.encryptionKey = crypto
      .createHash("sha256")
      .update(key)
      .digest()

    await this.loadEnv()

  }

  /**
   * Load .env file safely
   */
  async loadEnv() {

    const envPath = path.join(process.cwd(), ".env")

    if (!fs.existsSync(envPath)) {
      return
    }

    const content = fs.readFileSync(envPath, "utf8")

    const lines = content.split("\n")

    for (const line of lines) {

      const trimmed = line.trim()

      if (!trimmed || trimmed.startsWith("#")) {
        continue
      }

      const [key, ...rest] = trimmed.split("=")

      const value = rest.join("=")

      this.set(key.trim(), value.trim())

    }

  }

  /**
   * Encrypt secret
   */
  encrypt(value) {

    const iv = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv(
      "aes-256-gcm",
      this.encryptionKey,
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
   * Decrypt secret
   */
  decrypt(payload) {

    const iv = Buffer.from(payload.iv, "hex")

    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      this.encryptionKey,
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

    if (!key || typeof key !== "string") {
      throw new Error("Invalid secret key")
    }

    const encrypted = this.encrypt(value)

    this.secrets.set(key, encrypted)

  }

  /**
   * Get secret
   */
  get(key) {

    if (!this.secrets.has(key)) {
      return undefined
    }

    const payload = this.secrets.get(key)

    const value = this.decrypt(payload)

    this.logAccess(key)

    return value

  }

  /**
   * Require secrets
   */
  require(keys = []) {

    for (const key of keys) {

      if (!this.secrets.has(key)) {
        throw new Error(`Missing required secret: ${key}`)
      }

    }

  }

  /**
   * Mask secret for logging
   */
  mask(value) {

    if (!value) return ""

    return value.slice(0, 2) + "********"

  }

  /**
   * Prevent secret leaks
   */
  safe(key) {

    const value = this.get(key)

    return this.mask(value)

  }

  /**
   * Log secret access
   */
  logAccess(key) {

    this.accessLog.push({
      key,
      time: Date.now()
    })

  }

  /**
   * List secret keys
   */
  list() {

    return Array.from(this.secrets.keys())

  }

}

let vaultInstance = null

export async function initVault(config = {}) {

  if (vaultInstance) {
    return vaultInstance
  }

  const vault = new VaultEngine()

  await vault.init(config)

  vaultInstance = vault

  return vault

}

export function getVault() {

  if (!vaultInstance) {
    throw new Error("Vault not initialized")
  }

  return vaultInstance

}