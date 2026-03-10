// packages/core/src/orbit/worker-engine.js

import { Worker } from "worker_threads"
import os from "os"

class WorkerEngine {

  constructor(options = {}) {

    this.poolSize = options.poolSize || os.cpus().length
    this.workers = []
    this.queue = []
    this.activeJobs = 0

  }

  /**
   * Initialize worker pool
   */
  init() {

    for (let i = 0; i < this.poolSize; i++) {

      const worker = new Worker(`
        const { parentPort } = require("worker_threads");

        parentPort.on("message", async (job) => {

          try {

            const handler = eval("(" + job.handler + ")");

            const result = await handler(job.payload);

            parentPort.postMessage({
              id: job.id,
              success: true,
              result
            });

          } catch (error) {

            parentPort.postMessage({
              id: job.id,
              success: false,
              error: error.message
            });

          }

        });
      `, { eval: true })

      worker.on("message", (msg) => {

        this.activeJobs--

        if (this.onComplete) {
          this.onComplete(msg)
        }

        this.process()

      })

      this.workers.push(worker)

    }

  }

  /**
   * Add job
   */
  addJob(job) {

    this.queue.push(job)

    this.process()

  }

  /**
   * Process queue
   */
  process() {

    if (!this.queue.length) return

    if (this.activeJobs >= this.poolSize) return

    const job = this.queue.shift()

    const worker = this.workers[
      this.activeJobs % this.workers.length
    ]

    this.activeJobs++

    worker.postMessage(job)

  }

  /**
   * Register completion handler
   */
  onJobComplete(handler) {

    this.onComplete = handler

  }

  /**
   * Stop workers
   */
  stop() {

    for (const worker of this.workers) {
      worker.terminate()
    }

  }

}

let workerEngineInstance = null

export function initWorkerEngine(options = {}) {

  if (!workerEngineInstance) {

    workerEngineInstance = new WorkerEngine(options)

    workerEngineInstance.init()

  }

  return workerEngineInstance

}

export function getWorkerEngine() {

  if (!workerEngineInstance) {
    throw new Error("WorkerEngine not initialized")
  }

  return workerEngineInstance

}