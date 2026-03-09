// packages/core/src/middleware/security-middleware.js

export function securityMiddleware(req, res, next) {

  try {

    // ---------- SECURITY HEADERS ----------
    res.setHeader("X-Content-Type-Options", "nosniff")
    res.setHeader("X-Frame-Options", "DENY")
    res.setHeader("X-XSS-Protection", "1; mode=block")
    res.setHeader("Referrer-Policy", "no-referrer")
    res.setHeader("Content-Security-Policy", "default-src 'self'")

    // ---------- METHOD VALIDATION ----------
    const allowedMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"]

    if (!allowedMethods.includes(req.method)) {

      res.statusCode = 405
      res.end("Method Not Allowed")

      return false

    }

    // ---------- PATH TRAVERSAL PROTECTION ----------
    if (req.url.includes("..")) {

      res.statusCode = 400
      res.end("Invalid request path")

      return false

    }

    // ---------- BASIC REQUEST SIZE CHECK ----------
    const contentLength = parseInt(req.headers["content-length"] || "0")

    const maxSize = 1024 * 1024 * 2 // 2MB

    if (contentLength > maxSize) {

      res.statusCode = 413
      res.end("Payload Too Large")

      return false

    }

    // continue request pipeline
    next()

  } catch (error) {

    console.error("Security middleware error:", error)

    res.statusCode = 500
    res.end("Security middleware failure")

  }

}