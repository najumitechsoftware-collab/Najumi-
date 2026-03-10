// packages/core/src/orbit/retry-system.js

class RetrySystem {

  constructor(options = {}) {

    this.maxRetries = options.maxRetries || 3
    this.baseDelay = options.baseDelay || 1000
    this.failedJobs = new Map()

  }

  /**
   * Generate job fingerprint
   */
  fingerprint(job) {

    const data = JSON.stringify(job.payload || {})

    let hash = 0

    for (let i = 0; i < data.length; i++) {
      const chr = data.charCodeAt(i)
      hash = (hash << 5) - hash + chr
      hash |= 0
    }

    return `${job.name}:${hash}`

  }

  /**
   * Calculate retry delay (exponential backoff)
   */
  calculateDelay(attempt) {

    return this.baseDelay * Math.pow(2, attempt)

  }

  /**
   * Handle failed job
   */
  async handleFailure(job, queueManager) {

    const id = this.fingerprint(job)

    if (!this.failedJobs.has(id)) {

      this.failedJobs.set(id, {
        attempts: 0,
        lastError: null
      })

    }

    const state = this.failedJobs.get(id)

    state.attempts++

    if (state.attempts > this.maxRetries) {

      this.isolate(job)

      return false

    }

    const delay = this.calculateDelay(state.attempts)

    setTimeout(() => {

      queueManager.push(
        job.name,
        job,
        job.priority || "normal"
      )

    }, delay)

    return true

  }

  /**
   * Isolate permanently failing jobs
   */
  isolate(job) {

    const id = this.fingerprint(job)

    this.failedJobs.set(id, {
      isolated: true,
      job
    })

  }

  /**
   * Check if job is isolated
   */
  isIsolated(job) {

    const id = this.fingerprint(job)

    const state = this.failedJobs.get(id)

    if (!state) return false

    return state.isolated === true

  }

  /**
   * Clear failure state
   */
  clear(job) {

    const id = this.fingerprint(job)

    this.failedJobs.delete(id)

  }

  /**
   * Get retry statistics
   */
  getStats() {

    let isolated = 0

    for (const state of this.failedJobs.values()) {

      if (state.isolated) {
        isolated++
      }

    }

    return {
      trackedFailures: this.failedJobs.size,
      isolatedJobs: isolated
    }

  }

}

let retryInstance = null

export function initRetrySystem(options = {}) {

  if (!retryInstance) {
    retryInstance = new RetrySystem(options)
  }

  return retryInstance

}

export function getRetrySystem() {

  if (!retryInstance) {
    throw new Error("RetrySystem not initialized")
  }

  return retryInstance

}