/*
Najumi Error Boundary System
*/

class ErrorBoundary {

constructor() {

this.handlers = []

this.fallback = null

}

/*
Register error handler
*/

onError(fn) {

if (typeof fn === "function") {

  this.handlers.push(fn)

}

}

/*
Set fallback UI
*/

setFallback(fn) {

if (typeof fn === "function") {

  this.fallback = fn

}

}

/*
Execute guarded function
*/

async guard(fn, context = {}) {

try {

  return await fn(context)

} catch (error) {

  console.error("Najumi UI Error:", error)

  for (const handler of this.handlers) {

    try {

      handler(error, context)

    } catch (e) {

      console.error("Error handler failed:", e)

    }

  }

  if (this.fallback) {

    this.fallback(error)

  }

}

}

}

let boundaryInstance = null

export function initErrorBoundary() {

if (!boundaryInstance) {

boundaryInstance = new ErrorBoundary()

}

return boundaryInstance

}

export function getErrorBoundary() {

if (!boundaryInstance) {

throw new Error("ErrorBoundary not initialized")

}

return boundaryInstance

}