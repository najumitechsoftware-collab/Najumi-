// packages/core/src/backend/auth/strategies/jwt-auth.js

import crypto from "crypto"

const DEFAULT_ALGORITHM = "HS256"
const DEFAULT_EXPIRES_IN = 60 * 60 * 24 // 24 hours

function base64url(input) {

  return Buffer
    .from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")

}

function base64urlDecode(input) {

  input = input.replace(/-/g, "+").replace(/_/g, "/")

  const pad = input.length % 4

  if (pad) {
    input += "=".repeat(4 - pad)
  }

  return Buffer.from(input, "base64").toString()

}

function sign(data, secret) {

  return crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")

}

export function createJwtStrategy(config = {}) {

  const secret = config.secret || process.env.JWT_SECRET

  if (!secret) {
    throw new Error("JWT secret is required")
  }

  const expiresIn = config.expiresIn || DEFAULT_EXPIRES_IN

  return {

    name: "jwt",

    /**
     * generate token
     */
    sign(payload = {}) {

      const header = {
        alg: DEFAULT_ALGORITHM,
        typ: "JWT"
      }

      const now = Math.floor(Date.now() / 1000)

      const body = {
        ...payload,
        iat: now,
        exp: now + expiresIn
      }

      const headerEncoded = base64url(JSON.stringify(header))
      const payloadEncoded = base64url(JSON.stringify(body))

      const data = `${headerEncoded}.${payloadEncoded}`

      const signature = sign(data, secret)

      return `${data}.${signature}`

    },

    /**
     * verify token
     */
    verify(token) {

      try {

        const parts = token.split(".")

        if (parts.length !== 3) {
          return null
        }

        const [headerPart, payloadPart, signaturePart] = parts

        const data = `${headerPart}.${payloadPart}`

        const expectedSignature = sign(data, secret)

        if (signaturePart !== expectedSignature) {
          return null
        }

        const payload = JSON.parse(base64urlDecode(payloadPart))

        const now = Math.floor(Date.now() / 1000)

        if (payload.exp && payload.exp < now) {
          return null
        }

        return payload

      } catch {

        return null

      }

    },

    /**
     * authenticate request
     */
    async authenticate(req) {

      const header = req.headers["authorization"]

      if (!header) {
        return null
      }

      if (!header.startsWith("Bearer ")) {
        return null
      }

      const token = header.slice(7)

      const payload = this.verify(token)

      if (!payload) {
        return null
      }

      return payload

    }

  }

}