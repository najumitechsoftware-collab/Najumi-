// packages/core/src/orbit/scheduler.js

class OrbitScheduler {

  constructor() {

    this.jobs = new Map()
    this.running = false

  }

  /**
   * Parse cron expression (basic)
   */
  parseCron(expression) {

    const parts = expression.split(" ")

    if (parts.length !== 5) {
      throw new Error("Invalid cron expression")
    }

    return parts.map(part => {
      if (part === "*") return "*"
      return parseInt(part)
    })

  }

  /**
   * Check if cron should run
   */
  shouldRun(cron, date) {

    const [min, hour, day, month, weekday] = cron

    if (min !== "*" && min !== date.getMinutes()) return false
    if (hour !== "*" && hour !== date.getHours()) return false
    if (day !== "*" && day !== date.getDate()) return false
    if (month !== "*" && month !== (date.getMonth() + 1)) return false
    if (weekday !== "*" && weekday !== date.getDay()) return false

    return true

  }

  /**
   * Schedule cron job
   */
  schedule(name, expression, handler) {

    const cron = this.parseCron(expression)

    this.jobs.set(name, {
      cron,
      handler,
      lastRun: null
    })

  }

  /**
   * Run scheduler loop
   */
  start() {

    if (this.running) return

    this.running = true

    const loop = async () => {

      const now = new Date()

      for (const [name, job] of this.jobs.entries()) {

        if (this.shouldRun(job.cron, now)) {

          if (
            !job.lastRun ||
            now - job.lastRun >= 60000
          ) {

            job.lastRun = now

            try {

              await job.handler()

            } catch (error) {

              // ignore errors to keep scheduler alive

            }

          }

        }

      }

      setTimeout(loop, 1000)

    }

    loop()

  }

  /**
   * Stop scheduler
   */
  stop() {

    this.running = false

  }

  /**
   * List jobs
   */
  list() {

    return Array.from(this.jobs.keys())

  }

}

let schedulerInstance = null

export function initScheduler() {

  if (!schedulerInstance) {
    schedulerInstance = new OrbitScheduler()
  }

  return schedulerInstance

}

export function getScheduler() {

  if (!schedulerInstance) {
    throw new Error("Scheduler not initialized")
  }

  return schedulerInstance

}