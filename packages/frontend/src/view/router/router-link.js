/*
Najumi RouterLink Component
Secure SPA Navigation
*/

import { getRouter } from "./router-engine.js"

export function initRouterLink() {

document.addEventListener("click", (event) => {

const link = event.target.closest("[data-najumi-link]")

if (!link) return

const to = link.getAttribute("href")

if (!to) return

/*
Ignore external links
*/

if (to.startsWith("http")) {
  return
}

event.preventDefault()

const router = getRouter()

router.go(to)

})

}

/*
Programmatic RouterLink creator
*/

export function createRouterLink({ to, label }) {

const a = document.createElement("a")

a.href = to

a.setAttribute("data-najumi-link", "true")

a.textContent = label

return a

}