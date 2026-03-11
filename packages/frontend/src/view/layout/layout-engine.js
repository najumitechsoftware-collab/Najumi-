// packages/frontend/src/view/layout/layout-engine.js

import { resolveLayouts } from "./layout-resolver.js"
import { buildLayoutTree } from "./layout-tree.js"
import { sanitizeHTML } from "../security/dom-sanitizer.js"

const layoutCache = new Map()

function normalizeTemplate(template) {

  if (typeof template !== "string") {
    throw new Error("Invalid template")
  }

  return template.trim()

}

/*
Safe slot injection
*/
function injectSlot(layoutTemplate, content) {

  const safeContent = sanitizeHTML(content)

  if (!layoutTemplate.includes("<slot")) {
    return layoutTemplate + safeContent
  }

  return layoutTemplate.replace(
    /<slot\s*\/?>/gi,
    safeContent
  )

}

/*
Compile layout
*/
function compileLayout(template) {

  template = normalizeTemplate(template)

  if (layoutCache.has(template)) {
    return layoutCache.get(template)
  }

  const compiled = (content) => injectSlot(template, content)

  layoutCache.set(template, compiled)

  return compiled

}

/*
Render layout chain
*/
function renderLayoutChain(layouts, pageContent) {

  let content = pageContent

  for (let i = layouts.length - 1; i >= 0; i--) {

    const layoutTemplate = layouts[i]

    const renderer = compileLayout(layoutTemplate)

    content = renderer(content)

  }

  return content

}

/*
Main layout engine
*/
export async function renderWithLayouts(pagePath, pageContent, loader) {

  const layouts = await resolveLayouts(pagePath, loader)

  const tree = buildLayoutTree(layouts)

  const rendered = renderLayoutChain(tree, pageContent)

  return rendered

}

/*
Clear cache (dev mode)
*/
export function clearLayoutCache() {
  layoutCache.clear()
}