/*
Najumi Route Prefetch Engine
Ultra-fast navigation system
*/

import { getRouter } from "./router-engine.js"

class PrefetchEngine {

constructor() {

this.prefetched = new Set()

}

/*
Prefetch route
*/

async prefetch(path) {

if (!path) return

if (this.prefetched.has(path)) {
  return
}

try {

  const router = getRouter()

  /*
  If route has loader function
  */

  const route = router.routes.get(path)

  if (route && typeof route.prefetch === "function") {

    await route.prefetch()

  }

  this.prefetched.add(path)

} catch (err) {

  console.warn("Prefetch failed:", err)

}

}

}

let prefetchInstance = null

export function initPrefetch() {

if (!prefetchInstance) {

prefetchInstance = new PrefetchEngine()

}

return prefetchInstance

}

/*
Auto prefetch links
*/

export function enableLinkPrefetch() {

const engine = initPrefetch()

document.addEventListener("mouseover", (event) => {

const link = event.target.closest("[data-najumi-link]")

if (!link) return

const path = link.getAttribute("href")

if (!path) return

if (path.startsWith("http")) return

engine.prefetch(path)

})

}