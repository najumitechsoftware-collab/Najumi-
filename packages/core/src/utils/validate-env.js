// packages/core/src/utils/validate-env.js

const MIN_NODE_VERSION = 18
const RECOMMENDED_NODE_VERSION = 20

const VALID_ENVIRONMENTS = [
  "development",
  "test",
  "staging",
  "production"
]

// Extract major Node version
function getNodeMajorVersion() {
  const version = process.versions.node
  return parseInt(version.split(".")[0], 10)
}

// Check Node version
function checkNodeVersion() {
  const nodeVersion = getNodeMajorVersion()

  if (nodeVersion < MIN_NODE_VERSION) {
    throw new Error(
      `❌ Najumi requires Node.js ${MIN_NODE_VERSION}+ but detected ${process.versions.node}`
    )
  }

  if (nodeVersion < RECOMMENDED_NODE_VERSION) {
    console.warn(
      `⚠️ Recommended Node.js version is ${RECOMMENDED_NODE_VERSION}+ (current: ${process.versions.node})`
    )
  }
}

// Check environment mode
function checkEnvironmentMode() {
  const env = process.env.NODE_ENV || "development"

  if (!VALID_ENVIRONMENTS.includes(env)) {
    throw new Error(
      `❌ Invalid NODE_ENV "${env}". Valid environments: ${VALID_ENVIRONMENTS.join(", ")}`
    )
  }

  return env
}

// Runtime safety checks
function checkRuntimeSafety(env) {
  if (env === "production") {
    if (!process.env.NODE_ENV) {
      throw new Error(
        "❌ NODE_ENV must be defined in production for security reasons"
      )
    }

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "⚠️ Production environment detected but NODE_ENV is not 'production'"
      )
    }
  }
}

// Main validator
export function validateEnvironment() {
  const nodeVersion = getNodeMajorVersion()

  checkNodeVersion()

  const env = checkEnvironmentMode()

  checkRuntimeSafety(env)

  return {
    nodeVersion,
    environment: env
  }
}