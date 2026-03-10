// packages/frontend/src/view/view-engine.js

class ReactiveStore {

  constructor() {
    this.state = {}
    this.subscribers = new Map()
  }

  set(key, value) {

    this.state[key] = value

    if (this.subscribers.has(key)) {

      for (const fn of this.subscribers.get(key)) {
        fn(value)
      }

    }

  }

  get(key) {
    return this.state[key]
  }

  subscribe(key, fn) {

    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set())
    }

    this.subscribers.get(key).add(fn)

  }

}

/*
 Basic DOM sanitizer
*/
function sanitizeHTML(html) {

  const template = document.createElement("template")

  template.innerHTML = html

  const scripts = template.content.querySelectorAll("script")

  scripts.forEach(script => script.remove())

  return template.innerHTML

}

/*
 View Engine
*/
class ViewEngine {

  constructor() {

    this.components = new Map()

    this.store = new ReactiveStore()

  }

  /*
  Register component
  */
  component(name, definition) {

    if (this.components.has(name)) {
      throw new Error(`Component already exists: ${name}`)
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

    const state = component.state ? component.state() : {}

    this.render(el, component.template, state)

    this.bindState(el, state)

  }

  /*
  Render template
  */
  render(el, template, state) {

    let html = template

    for (const key in state) {

      const value = state[key]

      const pattern = new RegExp(`{{\\s*${key}\\s*}}`, "g")

      html = html.replace(pattern, value)

    }

    html = sanitizeHTML(html)

    el.innerHTML = html

  }

  /*
  Bind reactive state
  */
  bindState(el, state) {

    Object.keys(state).forEach(key => {

      this.store.subscribe(key, value => {

        const nodes = el.querySelectorAll(`[data-bind="${key}"]`)

        nodes.forEach(node => {
          node.textContent = value
        })

      })

    })

  }

  /*
  Global state update
  */
  setState(key, value) {

    this.store.set(key, value)

  }

  getState(key) {

    return this.store.get(key)

  }

}

let viewInstance = null

export function initView() {

  if (!viewInstance) {

    viewInstance = new ViewEngine()

  }

  return viewInstance

}

export function getView() {

  if (!viewInstance) {
    throw new Error("View engine not initialized")
  }

  return viewInstance

}