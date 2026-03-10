// packages/core/src/security/vault/validator.js

class VaultValidator {

  constructor(vault) {

    if (!vault) {
      throw new Error("VaultValidator requires vault instance")
    }

    this.vault = vault
    this.rules = []

  }

  /**
   * Add validation rule
   */
  rule(key, options = {}) {

    this.rules.push({
      key,
      options
    })

    return this

  }

  /**
   * Validate type
   */
  validateType(value, type) {

    if (type === "number") {
      return !isNaN(Number(value))
    }

    if (type === "boolean") {
      return value === "true" || value === "false"
    }

    if (type === "string") {
      return typeof value === "string"
    }

    return true

  }

  /**
   * Validate pattern
   */
  validatePattern(value, pattern) {

    if (!pattern) return true

    return pattern.test(value)

  }

  /**
   * Validate range
   */
  validateRange(value, min, max) {

    const num = Number(value)

    if (isNaN(num)) return false

    if (min !== undefined && num < min) return false

    if (max !== undefined && num > max) return false

    return true

  }

  /**
   * Run validation
   */
  run() {

    const errors = []

    for (const rule of this.rules) {

      const { key, options } = rule

      const value = this.vault.get(key)

      if (options.required && (value === undefined || value === "")) {

        errors.push(`Missing required secret: ${key}`)
        continue

      }

      if (value === undefined) {
        continue
      }

      if (options.type && !this.validateType(value, options.type)) {

        errors.push(`Invalid type for ${key}. Expected ${options.type}`)

      }

      if (options.pattern && !this.validatePattern(value, options.pattern)) {

        errors.push(`Invalid format for ${key}`)

      }

      if (options.min !== undefined || options.max !== undefined) {

        if (!this.validateRange(value, options.min, options.max)) {

          errors.push(`Value out of range for ${key}`)

        }

      }

      if (options.custom) {

        try {

          const result = options.custom(value)

          if (!result) {
            errors.push(`Custom validation failed for ${key}`)
          }

        } catch (err) {

          errors.push(`Custom validation error for ${key}`)

        }

      }

    }

    if (errors.length) {

      const message = errors.join("\n")

      throw new Error(`Vault validation failed:\n${message}`)

    }

    return true

  }

}

export function createVaultValidator(vault) {

  return new VaultValidator(vault)

}