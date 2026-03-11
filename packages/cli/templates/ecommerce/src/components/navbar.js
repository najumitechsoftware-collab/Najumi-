/*
Store Navbar Component
*/

import { getComponentSystem } from "../../../frontend/src/view/component-system.js"

const Navbar = {

template: `

<header class="store-navbar">

  <div class="navbar-container">

    <div class="logo">

      <a href="/">
        {{store}}
      </a>

    </div>

    <nav class="nav-links">

      <a href="/">Home</a>

      <a href="/cart">Cart</a>

      <a href="/checkout">Checkout</a>

    </nav>

  </div>

</header>

`,

state() {

return {

  store: "{{projectName}}"

}

},

mounted(instance) {

const links = instance.el.querySelectorAll("a")

links.forEach(link => {

  link.addEventListener("click", (e) => {

    const href = link.getAttribute("href")

    if (!href.startsWith("/")) return

    e.preventDefault()

    window.history.pushState({}, "", href)

    window.dispatchEvent(new Event("najumi:navigate"))

  })

})

}

}

/*
Initialize Navbar Component
*/
export default function initNavbar() {

const componentSystem = getComponentSystem()

componentSystem.register("Navbar", Navbar)

}