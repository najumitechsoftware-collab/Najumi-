// packages/frontend/src/view/layout/layout-resolver.js

import fs from "fs/promises"
import path from "path"

const layoutCache = new Map()

function sanitizePath(inputPath) {

  if (!inputPath || typeof inputPath !== "string") {
    throw new Error("Invalid page path")
  }

  if (inputPath.includes("..")) {
    throw new Error("Path traversal detected")
  }

  return inputPath

}

/*
Check if layout exists
*/
async function loadLayout(layoutPath) {

  try {

    const template = await fs.readFile(layoutPath, "utf-8")

    return template

  } catch {

    return null

  }

}

/*
Resolve layouts from root to page
*/
export async function resolveLayouts(pagePath, loader) {

  pagePath = sanitizePath(pagePath)

  if (layoutCache.has(pagePath)) {
    return layoutCache.get(pagePath)
  }

  const projectRoot = process.cwd()

  const pagesDir = path.join(projectRoot, "src", "pages")

  const pageDir = path.dirname(pagePath)

  const layouts = []

  /*
  Root layout
  */
  const rootLayoutPath = path.join(pagesDir, "layout.view")

  const rootLayout = await loadLayout(rootLayoutPath)

  if (rootLayout) {
    layouts.push(rootLayout)
  }

  /*
  Nested layouts
  */
  const segments = pageDir
    .replace(pagesDir, "")
    .split(path.sep)
    .filter(Boolean)

  let currentPath = pagesDir

  for (const segment of segments) {

    currentPath = path.join(currentPath, segment)

    const layoutPath = path.join(currentPath, "layout.view")

    const layoutTemplate = await loadLayout(layoutPath)

    if (layoutTemplate) {
      layouts.push(layoutTemplate)
    }

  }

  layoutCache.set(pagePath, layouts)

  return layouts

}

/*
Clear cache for dev mode
*/
export function clearLayoutResolverCache() {

  layoutCache.clear()

}