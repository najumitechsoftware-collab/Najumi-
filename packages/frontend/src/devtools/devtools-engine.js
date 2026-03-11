/*
Najumi DevTools Engine
*/

class DevToolsEngine {

constructor() {

this.enabled = false

this.data = {
  components: [],
  state: {},
  routes: [],
  performance: []
}

}

enable() {

this.enabled = true

console.log("Najumi DevTools enabled")

window.__NAJUMI_DEVTOOLS__ = this

}

disable() {

this.enabled = false

}

/*
Register component
*/

registerComponent(component) {

if (!this.enabled) return

this.data.components.push(component)

}

/*
Update state
*/

updateState(key, value) {

if (!this.enabled) return

this.data.state[key] = value

}

/*
Track route
*/

trackRoute(path) {

if (!this.enabled) return

this.data.routes.push({
  path,
  time: Date.now()
})

}

/*
Track performance
*/

trackPerformance(label, time) {

if (!this.enabled) return

this.data.performance.push({
  label,
  time
})

}

getData() {

return this.data

}

}

let devtoolsInstance = null

export function initDevTools() {

if (!devtoolsInstance) {

devtoolsInstance = new DevToolsEngine()

}

return devtoolsInstance

}

export function getDevTools() {

if (!devtoolsInstance) {

throw new Error("DevTools not initialized")

}

return devtoolsInstance

}