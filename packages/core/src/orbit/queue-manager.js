// packages/core/src/orbit/queue-manager.js

class QueueManager {

  constructor() {

    this.queues = new Map()

    this.stats = {
      totalQueues: 0,
      totalJobs: 0,
      processedJobs: 0
    }

  }

  /**
   * Ensure queue exists
   */
  ensureQueue(name) {

    if (!this.queues.has(name)) {

      this.queues.set(name, {
        high: [],
        normal: [],
        low: []
      })

      this.stats.totalQueues++

    }

    return this.queues.get(name)

  }

  /**
   * Add job to queue
   */
  push(name, job, priority = "normal") {

    const queue = this.ensureQueue(name)

    if (!queue[priority]) {
      priority = "normal"
    }

    queue[priority].push(job)

    this.stats.totalJobs++

  }

  /**
   * Get next job
   */
  pop(name) {

    const queue = this.queues.get(name)

    if (!queue) return null

    if (queue.high.length) {
      return queue.high.shift()
    }

    if (queue.normal.length) {
      return queue.normal.shift()
    }

    if (queue.low.length) {
      return queue.low.shift()
    }

    return null

  }

  /**
   * Get queue size
   */
  size(name) {

    const queue = this.queues.get(name)

    if (!queue) return 0

    return (
      queue.high.length +
      queue.normal.length +
      queue.low.length
    )

  }

  /**
   * Remove queue
   */
  deleteQueue(name) {

    if (this.queues.has(name)) {

      this.queues.delete(name)

      this.stats.totalQueues--

    }

  }

  /**
   * List queues
   */
  listQueues() {

    return Array.from(this.queues.keys())

  }

  /**
   * Queue statistics
   */
  getStats() {

    return {
      ...this.stats
    }

  }

  /**
   * Mark job processed
   */
  markProcessed() {

    this.stats.processedJobs++

  }

}

let queueManagerInstance = null

export function initQueueManager() {

  if (!queueManagerInstance) {
    queueManagerInstance = new QueueManager()
  }

  return queueManagerInstance

}

export function getQueueManager() {

  if (!queueManagerInstance) {
    throw new Error("QueueManager not initialized")
  }

  return queueManagerInstance

}