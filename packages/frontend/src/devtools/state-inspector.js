/*
Najumi DevTools State Inspector
*/

import { getDevTools } from "./devtools-engine.js"
import { getState } from "../view/state/state-engine.js"

class StateInspector {

constructor() {

this.history = []

}

/*
Scan current state
*/

scan() {

const stateEngine = getState()
const devtools = getDevTools()

const currentState = { ...stateEngine.state }

devtools.data.state = currentState

return currentState

}

/*
Track state change
*/

track(key, value) {

const devtools = getDevTools()

const record = {
  key,
  value,
  time: Date.now()
}

this.history.push(record)

devtools.updateState(key, value)

}

/*
Get state history
*/

getHistory() {

return this.history

}

/*
Reset history
*/

clearHistory() {

this.history = []

}

}

let inspectorInstance = null

export function initStateInspector() {

if (!inspectorInstance) {

inspectorInstance = new StateInspector()

}

return inspectorInstance

}

export function getStateInspector() {

if (!inspectorInstance) {

throw new Error("StateInspector not initialized")

}

return inspectorInstance

}