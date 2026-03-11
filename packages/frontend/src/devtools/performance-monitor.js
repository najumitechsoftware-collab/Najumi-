/*
Najumi DevTools Performance Monitor
*/

import { getDevTools } from "./devtools-engine.js"

class PerformanceMonitor {

constructor() {

this.records = []

}

/*
Start performance mark
*/

start(label) {

return {
  label,
  start: performance.now()
}

}

/*
End performance mark
*/

end(mark) {

const devtools = getDevTools()

const end = performance.now()

const record = {

  label: mark.label,
  duration: end - mark.start,
  time: Date.now()

}

this.records.push(record)

devtools.trackPerformance(mark.label, record.duration)

}

/*
Measure function execution
*/

async measure(label, fn) {

const mark = this.start(label)

const result = await fn()

this.end(mark)

return result

}

/*
Get performance records
*/

getRecords() {

return this.records

}

/*
Clear records
*/

clear() {

this.records = []

}

}

let monitorInstance = null

export function initPerformanceMonitor() {

if (!monitorInstance) {

monitorInstance = new PerformanceMonitor()

}

return monitorInstance

}

export function getPerformanceMonitor() {

if (!monitorInstance) {

throw new Error("PerformanceMonitor not initialized")

}

return monitorInstance

}