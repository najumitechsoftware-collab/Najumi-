// packages/core/src/backend/auth/strategies/session-auth.js

import crypto from "crypto"

const DEFAULT_SESSION_TTL = 1000 * 60 * 60 * 24 // 24 hours

function generateSessionId() {

  return crypto.randomBytes(32).toString("hex")

}

function parseCookies(req) {

  const header = req.headers.cookie

  if (!header) return {}

  const cookies = {}

  header.split(";").forEach(cookie => {

    const parts = cookie.split("=")

    const key = parts[0].trim()
    const value = parts[1] ? parts[1].trim() : ""

    cookies[key] = value

  })

  return cookies

}

export function createSessionStrategy(config = {}) {

  const sessionName = config.cookieName || "najumi_session"

  const ttl = config.ttl || DEFAULT_SESSION_TTL

  // In-memory session store (can be replaced with Redis later)
  const sessions = new Map()

  return {

    name: "session",

    /**
     * Create session
     */
    createSession(res, userData) {

      const sessionId = generateSessionId()

      const expiresAt = Date.now() + ttl

      sessions.set(sessionId, {
        user: userData,
        expiresAt
      })

      const cookie = `${sessionName}=${sessionId}; HttpOnly; Path=/; Max-Age=${ttl / 1000}`

      res.setHeader("Set-Cookie", cookie)

      return sessionId

    },

    /**
     * Destroy session
     */
    destroySession(req, res) {

      const cookies = parseCookies(req)

      const sessionId = cookies[sessionName]

      if (!sessionId) return

      sessions.delete(sessionId)

      res.setHeader(
        "Set-Cookie",
        `${sessionName}=; HttpOnly; Path=/; Max-Age=0`
      )

    },

    /**
     * Verify session
     */
    verifySession(sessionId) {

      const session = sessions.get(sessionId)

      if (!session) {
        return null
      }

      if (session.expiresAt < Date.now()) {

        sessions.delete(sessionId)

        return null

      }

      return session.user

    },

    /**
     * Authenticate request
     */
    async authenticate(req) {

      const cookies = parseCookies(req)

      const sessionId = cookies[sessionName]

      if (!sessionId) {
        return null
      }

      const user = this.verifySession(sessionId)

      if (!user) {
        return null
      }

      return user

    }

  }

}