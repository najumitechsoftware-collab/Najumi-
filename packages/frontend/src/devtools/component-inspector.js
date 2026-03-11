/*
Najumi DevTools Component Inspector
*/

import { getDevTools } from "./devtools-engine.js"
import { getComponentSystem } from "../view/component-system.js"

class ComponentInspector {

constructor() {

this.components = []

}

/*
Scan components from component system
*/

scan() {

const componentSystem = getComponentSystem()

const devtools = getDevTools()

this.components = []

for (const [name, instance] of componentSystem.instances) {

  const componentData = {

    name,

    state: instance.state || {},

    mounted: instance.mounted,

    element: instance.el ? instance.el.tagName : null

  }

  this.components.push(componentData)

  devtools.registerComponent(componentData)

}

}

/*
Get components tree
*/

getComponents() {

return this.components

}

}

let inspectorInstance = null

export function initComponentInspector() {

if (!inspectorInstance) {

inspectorInstance = new ComponentInspector()

}

return inspectorInstance

}

export function getComponentInspector() {

if (!inspectorInstance) {

throw new Error("ComponentInspector not initialized")

}

return inspectorInstance

}