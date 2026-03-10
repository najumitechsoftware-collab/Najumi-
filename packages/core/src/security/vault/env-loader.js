// packages/core/src/security/vault/env-loader.js

import fs from "fs"
import path from "path"

function parseEnv(content) {

  const env = {}

  const lines = content.split("\n")

  for (const line of lines) {

    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith("#")) {
      continue
    }

    const [key, ...rest] = trimmed.split("=")

    const value = rest.join("=")

    env[key.trim()] = value.trim()

  }

  return env

}

function loadFile(filePath) {

  if (!fs.existsSync(filePath)) {
    return {}
  }

  const content = fs.readFileSync(filePath, "utf8")

  return parseEnv(content)

}

export function loadEnv(rootDir = process.cwd()) {

  const env = process.env.NODE_ENV || "development"

  const files = [

    ".env",
    `.env.${env}`,
    ".env.local"

  ]

  const result = {}

  for (const file of files) {

    const fullPath = path.join(rootDir, file)

    const parsed = loadFile(fullPath)

    Object.assign(result, parsed)

  }

  for (const key of Object.keys(result)) {

    if (!process.env[key]) {
      process.env[key] = result[key]
    }

  }

  return result

}