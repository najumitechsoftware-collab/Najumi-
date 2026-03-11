/*
Najumi DevTools Router Inspector
*/

import { getDevTools } from "./devtools-engine.js"

class RouterInspector {

constructor() {

this.history = []

}

/*
Track route navigation
*/

track(path, params = {}) {

const devtools = getDevTools()

const record = {

  path,
  params,
  time: Date.now()

}

this.history.push(record)

devtools.trackRoute(path)

}

/*
Get navigation history
*/

getHistory() {

return this.history

}

/*
Clear navigation history
*/

clearHistory() {

this.history = []

}

}

let routerInspectorInstance = null

export function initRouterInspector() {

if (!routerInspectorInstance) {

routerInspectorInstance = new RouterInspector()

}

return routerInspectorInstance

}

export function getRouterInspector() {

if (!routerInspectorInstance) {

throw new Error("RouterInspector not initialized")

}

return routerInspectorInstance

}