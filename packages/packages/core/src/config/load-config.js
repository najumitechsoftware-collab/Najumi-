// packages/core/src/config/load-config.js

import fs from "fs/promises"
import path from "path"
import { log, warn } from "../utils/logger.js"

const CONFIG_FILES = [
  "najumi.config.js",
  "najumi.config.mjs",
  "najumi.config.json"
]

// Default configuration
const DEFAULT_CONFIG = {
  port: 3000,
  environment: process.env.NODE_ENV || "development",
  modules: [],
  plugins: [],
  security: {
    strict: true
  }
}

// Find config file
async function findConfigFile(rootDir) {
  for (const file of CONFIG_FILES) {
    const fullPath = path.join(rootDir, file)

    try {
      await fs.access(fullPath)
      return fullPath
    } catch {
      // continue searching
    }
  }

  return null
}

// Load config file
async function loadUserConfig(configPath) {
  if (!configPath) return {}

  const ext = path.extname(configPath)

  try {
    if (ext === ".json") {
      const content = await fs.readFile(configPath, "utf-8")
      return JSON.parse(content)
    }

    const module = await import(configPath)
    return module.default || module
  } catch (error) {
    throw new Error(`Failed to load config file: ${error.message}`)
  }
}

// Merge configs
function mergeConfigs(defaultConfig, userConfig) {
  return {
    ...defaultConfig,
    ...userConfig,
    security: {
      ...defaultConfig.security,
      ...(userConfig.security || {})
    }
  }
}

// Validate configuration
function validateConfig(config) {
  if (typeof config.port !== "number") {
    throw new Error("Invalid config: port must be a number")
  }

  if (!Array.isArray(config.modules)) {
    throw new Error("Invalid config: modules must be an array")
  }

  if (!Array.isArray(config.plugins)) {
    throw new Error("Invalid config: plugins must be an array")
  }

  if (typeof config.security !== "object") {
    throw new Error("Invalid config: security must be an object")
  }
}

// Main loader
export async function loadConfig() {
  const rootDir = process.cwd()

  log("Loading Najumi configuration...")

  const configPath = await findConfigFile(rootDir)

  if (!configPath) {
    warn("No config file found. Using default configuration.")
    return DEFAULT_CONFIG
  }

  log(`Config file detected: ${configPath}`)

  const userConfig = await loadUserConfig(configPath)

  const finalConfig = mergeConfigs(DEFAULT_CONFIG, userConfig)

  validateConfig(finalConfig)

  return finalConfig
}