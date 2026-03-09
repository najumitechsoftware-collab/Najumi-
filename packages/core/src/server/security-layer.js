// packages/core/src/server/security-layer.js

export function applySecurity(req, res) {

  // security headers
  res.setHeader("X-Content-Type-Options", "nosniff")
  res.setHeader("X-Frame-Options", "DENY")
  res.setHeader("X-XSS-Protection", "1; mode=block")
  res.setHeader("Referrer-Policy", "no-referrer")

  // basic method protection
  const allowedMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"]

  if (!allowedMethods.includes(req.method)) {

    res.statusCode = 405
    res.end("Method Not Allowed")

    return false

  }

  return true

}