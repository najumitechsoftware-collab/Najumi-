// packages/frontend/src/view/security/dom-sanitizer.js

const BLOCKED_TAGS = new Set([
  "script",
  "iframe",
  "object",
  "embed",
  "link",
  "meta"
])

const BLOCKED_ATTR = new Set([
  "onerror",
  "onload",
  "onclick",
  "onmouseover",
  "onfocus",
  "onmouseenter"
])

const SAFE_URL = /^(https?|mailto|tel):/i

function sanitizeAttributes(node) {

  const attrs = [...node.attributes]

  for (const attr of attrs) {

    const name = attr.name.toLowerCase()
    const value = attr.value

    /*
    Remove event handlers
    */
    if (BLOCKED_ATTR.has(name) || name.startsWith("on")) {

      node.removeAttribute(attr.name)
      continue

    }

    /*
    Validate URL attributes
    */
    if (name === "href" || name === "src") {

      if (!SAFE_URL.test(value)) {

        node.removeAttribute(attr.name)

      }

    }

  }

}

function sanitizeNode(node) {

  /*
  Remove blocked tags
  */
  if (node.nodeType === 1) {

    const tag = node.tagName.toLowerCase()

    if (BLOCKED_TAGS.has(tag)) {

      node.remove()
      return

    }

    sanitizeAttributes(node)

  }

  /*
  Process children
  */
  const children = [...node.childNodes]

  for (const child of children) {

    sanitizeNode(child)

  }

}

/*
 Main sanitizer
*/
export function sanitizeHTML(html) {

  if (typeof html !== "string") {
    return ""
  }

  const template = document.createElement("template")

  template.innerHTML = html

  const fragment = template.content

  const nodes = [...fragment.childNodes]

  for (const node of nodes) {

    sanitizeNode(node)

  }

  return template.innerHTML

}

/*
 Safe text rendering
*/
export function escapeHTML(str) {

  if (typeof str !== "string") {
    return str
  }

  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")

}

/*
 Validate URL
*/
export function safeURL(url) {

  if (typeof url !== "string") {
    return ""
  }

  if (!SAFE_URL.test(url)) {
    return ""
  }

  return url

}