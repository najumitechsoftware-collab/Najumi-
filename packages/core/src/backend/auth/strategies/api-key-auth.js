// packages/core/src/backend/auth/strategies/api-key-auth.js

import crypto from "crypto"

function constantTimeCompare(a, b) {

  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)

  if (aBuf.length !== bBuf.length) {
    return false
  }

  return crypto.timingSafeEqual(aBuf, bBuf)

}

function hashKey(key) {

  return crypto
    .createHash("sha256")
    .update(key)
    .digest("hex")

}

export function createApiKeyStrategy(config = {}) {

  const headerName = (config.headerName || "x-api-key").toLowerCase()
  const queryName = config.queryName || "api_key"

  const keys = new Map()

  return {

    name: "apiKey",

    /**
     * register API key
     */
    registerKey(key, metadata = {}) {

      if (!key || typeof key !== "string") {
        throw new Error("API key must be a string")
      }

      const hashed = hashKey(key)

      keys.set(hashed, {
        ...metadata,
        createdAt: Date.now()
      })

    },

    /**
     * revoke API key
     */
    revokeKey(key) {

      const hashed = hashKey(key)

      keys.delete(hashed)

    },

    /**
     * verify key
     */
    verifyKey(key) {

      const hashed = hashKey(key)

      const record = keys.get(hashed)

      if (!record) {
        return null
      }

      if (record.expiresAt && record.expiresAt < Date.now()) {
        keys.delete(hashed)
        return null
      }

      return record

    },

    /**
     * extract API key
     */
    extractKey(req) {

      const headerKey = req.headers[headerName]

      if (headerKey) {
        return headerKey
      }

      const url = new URL(req.url, `http://${req.headers.host}`)

      const queryKey = url.searchParams.get(queryName)

      if (queryKey) {
        return queryKey
      }

      return null

    },

    /**
     * authenticate request
     */
    async authenticate(req) {

      const key = this.extractKey(req)

      if (!key) {
        return null
      }

      const record = this.verifyKey(key)

      if (!record) {
        return null
      }

      return {
        apiKey: true,
        ...record
      }

    }

  }

}