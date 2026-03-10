// packages/core/src/orbit/orbit-engine.js

class OrbitEngine {

  constructor(options = {}) {

    this.queues = new Map()
    this.workers = new Map()
    this.processing = false

    this.concurrency = options.concurrency || 10

  }

  /**
   * Create queue if not exists
   */
  ensureQueue(name) {

    if (!this.queues.has(name)) {

      this.queues.set(name, [])

    }

    return this.queues.get(name)

  }

  /**
   * Dispatch job
   */
  dispatch(name, payload = {}, options = {}) {

    const queue = this.ensureQueue(name)

    const job = {
      id: Date.now() + Math.random(),
      name,
      payload,
      retries: options.retries || 0,
      attempts: 0,
      priority: options.priority || "normal",
      delay: options.delay || 0,
      createdAt: Date.now()
    }

    if (job.delay > 0) {

      setTimeout(() => {
        queue.push(job)
      }, job.delay * 1000)

    } else {

      queue.push(job)

    }

    if (!this.processing) {
      this.process()
    }

  }

  /**
   * Register worker
   */
  worker(name, handler) {

    if (typeof handler !== "function") {
      throw new Error("Worker handler must be function")
    }

    this.workers.set(name, handler)

  }

  /**
   * Process jobs
   */
  async process() {

    this.processing = true

    while (this.processing) {

      for (const [name, queue] of this.queues.entries()) {

        if (!queue.length) continue

        const job = queue.shift()

        const handler = this.workers.get(name)

        if (!handler) continue

        this.executeJob(handler, job)

      }

      await new Promise(resolve => setTimeout(resolve, 1))

    }

  }

  /**
   * Execute job
   */
  async executeJob(handler, job) {

    try {

      job.attempts++

      await handler(job.payload)

    } catch (error) {

      if (job.attempts <= job.retries) {

        const queue = this.ensureQueue(job.name)

        queue.push(job)

      }

    }

  }

  /**
   * Stop workers
   */
  stop() {

    this.processing = false

  }

}

let orbitInstance = null

export function initOrbit(options = {}) {

  if (!orbitInstance) {
    orbitInstance = new OrbitEngine(options)
  }

  return orbitInstance

}

export function getOrbit() {

  if (!orbitInstance) {
    throw new Error("Orbit not initialized")
  }

  return orbitInstance

}