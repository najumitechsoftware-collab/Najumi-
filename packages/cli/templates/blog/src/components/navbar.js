/*
Blog Navbar Component
*/

import { getComponentSystem } from "../../../frontend/src/view/component-system.js"

const BlogNavbar = {

template: `

<header class="blog-navbar">

  <div class="navbar-container">

    <div class="blog-logo">

      <a href="/">
        {{blogName}}
      </a>

    </div>

    <nav class="blog-nav">

      <a href="/">Home</a>

      <a href="/latest">Latest</a>

    </nav>

  </div>

</header>

`,

state() {

return {

  blogName: "{{projectName}}"

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
Initialize Navbar
*/

export default function initNavbar() {

const componentSystem = getComponentSystem()

componentSystem.register("BlogNavbar", BlogNavbar)

}