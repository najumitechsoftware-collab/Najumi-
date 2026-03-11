// packages/frontend/src/view/render-engine.js

class RenderQueue {

  constructor() {

    this.queue = new Set()
    this.scheduled = false

  }

  add(task) {

    this.queue.add(task)

    if (!this.scheduled) {

      this.scheduled = true

      requestAnimationFrame(() => this.flush())

    }

  }

  flush() {

    for (const task of this.queue) {
      task()
    }

    this.queue.clear()

    this.scheduled = false

  }

}

/*
 DOM patch operations
*/
function patchText(node, value) {

  if (node.textContent !== value) {
    node.textContent = value
  }

}

function patchAttr(node, name, value) {

  if (node.getAttribute(name) !== value) {
    node.setAttribute(name, value)
  }

}

function patchHTML(node, html) {

  if (node.innerHTML !== html) {
    node.innerHTML = html
  }

}

/*
 Security sanitize
*/
function sanitizeHTML(html) {

  const template = document.createElement("template")

  template.innerHTML = html

  const scripts = template.content.querySelectorAll("script")

  scripts.forEach(script => script.remove())

  return template.innerHTML

}

/*
 Render Engine
*/
class RenderEngine {

  constructor() {

    this.queue = new RenderQueue()

  }

  /*
  Render template
  */
  render(el, template, state = {}) {

    let html = template

    for (const key in state) {

      const pattern = new RegExp(`{{\\s*${key}\\s*}}`, "g")

      html = html.replace(pattern, state[key])

    }

    html = sanitizeHTML(html)

    el.innerHTML = html

  }

  /*
  Update specific node
  */
  updateText(node, value) {

    this.queue.add(() => {

      patchText(node, value)

    })

  }

  updateAttr(node, name, value) {

    this.queue.add(() => {

      patchAttr(node, name, value)

    })

  }

  updateHTML(node, html) {

    html = sanitizeHTML(html)

    this.queue.add(() => {

      patchHTML(node, html)

    })

  }

  /*
  Batch multiple DOM updates
  */
  batch(updates) {

    updates.forEach(update => {

      this.queue.add(update)

    })

  }

}

let renderInstance = null

export function initRenderEngine() {

  if (!renderInstance) {

    renderInstance = new RenderEngine()

  }

  return renderInstance

}

export function getRenderEngine() {

  if (!renderInstance) {
    throw new Error("Render engine not initialized")
  }

  return renderInstance

}