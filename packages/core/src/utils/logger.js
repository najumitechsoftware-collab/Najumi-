// packages/core/src/utils/logger.js

const ENV = process.env.NODE_ENV || "development"

const LEVELS = {
  DEBUG: "debug",
  INFO: "info",
  WARN: "warn",
  ERROR: "error",
  SECURITY: "security",
  PERFORMANCE: "performance"
}

function getTimestamp() {
  return new Date().toISOString()
}

function formatLog(level, message, meta = {}) {
  return {
    level,
    message,
    time: getTimestamp(),
    environment: ENV,
    ...meta
  }
}

function outputConsole(level, logObject) {
  if (ENV === "production") {
    // JSON logs for production
    console.log(JSON.stringify(logObject))
    return
  }

  // Pretty logs for development
  const color = {
    debug: "\x1b[36m",
    info: "\x1b[32m",
    warn: "\x1b[33m",
    error: "\x1b[31m",
    security: "\x1b[35m",
    performance: "\x1b[34m"
  }

  const reset = "\x1b[0m"

  console.log(
    `${color[level]}[${logObject.level.toUpperCase()}]${reset}`,
    logObject.message,
    logObject.meta || ""
  )
}

// Generic log
export function log(message, meta = {}) {
  const logObject = formatLog(LEVELS.INFO, message, meta)
  outputConsole("info", logObject)
}

// Debug log
export function debug(message, meta = {}) {
  if (ENV === "production") return

  const logObject = formatLog(LEVELS.DEBUG, message, meta)
  outputConsole("debug", logObject)
}

// Warning log
export function warn(message, meta = {}) {
  const logObject = formatLog(LEVELS.WARN, message, meta)
  outputConsole("warn", logObject)
}

// Error log
export function error(message, meta = {}) {
  const logObject = formatLog(LEVELS.ERROR, message, meta)
  outputConsole("error", logObject)
}

// Security log
export function security(message, meta = {}) {
  const logObject = formatLog(LEVELS.SECURITY, message, meta)
  outputConsole("security", logObject)
}

// Performance log
export function performance(event, duration) {
  const logObject = formatLog(LEVELS.PERFORMANCE, `Performance event: ${event}`, {
    duration
  })

  outputConsole("performance", logObject)
}