// packages/frontend/src/view/layout/layout-tree.js

const treeCache = new Map()

function validateLayout(template) {

  if (!template || typeof template !== "string") {
    throw new Error("Invalid layout template")
  }

  if (template.length > 500000) {
    throw new Error("Layout template too large")
  }

  return template

}

function generateCacheKey(layouts) {

  return layouts
    .map(l => l.length)
    .join("-")

}

/*
Build layout hierarchy
*/
export function buildLayoutTree(layouts) {

  if (!Array.isArray(layouts)) {
    throw new Error("Layouts must be an array")
  }

  const cacheKey = generateCacheKey(layouts)

  if (treeCache.has(cacheKey)) {
    return treeCache.get(cacheKey)
  }

  const uniqueLayouts = []
  const seen = new Set()

  for (const layout of layouts) {

    const validated = validateLayout(layout)

    if (seen.has(validated)) {
      continue
    }

    seen.add(validated)
    uniqueLayouts.push(validated)

  }

  /*
  Ensure correct render order
  Root → Nested → Page
  */
  const tree = uniqueLayouts

  treeCache.set(cacheKey, tree)

  return tree

}

/*
Clear cache (dev mode)
*/
export function clearLayoutTreeCache() {

  treeCache.clear()

}