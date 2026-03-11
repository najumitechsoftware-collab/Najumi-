// packages/frontend/src/view/component-system.js

import { getRenderEngine } from "./render-engine.js"

class ComponentInstance {

  constructor(name, definition, mountEl) {

    this.name = name
    this.definition = definition
    this.el = mountEl

    this.renderEngine = getRenderEngine()

    this.state = definition.state ? definition.state() : {}

    this.template = definition.template || ""

    this.mounted = false

  }

  /*
  Render component
  */
  render() {

    if (!this.el) return

    this.renderEngine.render(
      this.el,
      this.template,
      this.state
    )

  }

  /*
  Update state
  */
  setState(key, value) {

    if (!key) return

    this.state[key] = value

    this.render()

  }

  getState(key) {

    return this.state[key]

  }

  /*
  Lifecycle mount
  */
  mount() {

    if (this.mounted) return

    if (this.definition.beforeMount) {
      this.definition.beforeMount(this)
    }

    this.render()

    this.mounted = true

    if (this.definition.mounted) {
      this.definition.mounted(this)
    }

  }

  /*
  Destroy component
  */
  destroy() {

    if (!this.mounted) return

    if (this.definition.beforeDestroy) {
      this.definition.beforeDestroy(this)
    }

    if (this.el) {
      this.el.innerHTML = ""
    }

    this.mounted = false

  }

}

/*
 Component Registry
*/
class ComponentSystem {

  constructor() {

    this.components = new Map()

    this.instances = new Map()

  }

  /*
  Register component
  */
  register(name, definition) {

    if (!name || typeof name !== "string") {
      throw new Error("Invalid component name")
    }

    if (this.components.has(name)) {
      throw new Error(`Component already registered: ${name}`)
    }

    this.components.set(name, definition)

  }

  /*
  Mount component
  */
  mount(name, selector) {

    const component = this.components.get(name)

    if (!component) {
      throw new Error(`Component not found: ${name}`)
    }

    const el = document.querySelector(selector)

    if (!el) {
      throw new Error(`Mount element not found: ${selector}`)
    }

    const instance = new ComponentInstance(
      name,
      component,
      el
    )

    instance.mount()

    if (!this.instances.has(name)) {
      this.instances.set(name, new Set())
    }

    this.instances.get(name).add(instance)

    return instance

  }

  /*
  Get component instances
  */
  get(name) {

    return this.instances.get(name) || null

  }

  /*
  Destroy component instances
  */
  destroy(name) {

    const instances = this.instances.get(name)

    if (!instances) return

    for (const instance of instances) {
      instance.destroy()
    }

    this.instances.delete(name)

  }

}

let componentSystemInstance = null

export function initComponentSystem() {

  if (!componentSystemInstance) {

    componentSystemInstance = new ComponentSystem()

  }

  return componentSystemInstance

}

export function getComponentSystem() {

  if (!componentSystemInstance) {

    throw new Error("Component system not initialized")

  }

  return componentSystemInstance

}