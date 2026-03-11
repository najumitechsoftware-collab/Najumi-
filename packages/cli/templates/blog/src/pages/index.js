/*
Blog Home Page
*/

import { getComponentSystem } from "../../../frontend/src/view/component-system.js"

const BlogHomePage = {

template: `

<section class="blog-home">

  <h1>Latest Posts</h1>

  <div class="post-list">

    {{posts}}

  </div>

</section>

`,

state() {

return {

  posts: "",

  items: [

    {
      id: 1,
      title: "Welcome to Najumi.js",
      excerpt: "Learn how to build modern apps using Najumi."
    },

    {
      id: 2,
      title: "Building a Blog with Najumi",
      excerpt: "Create fast and secure blog systems."
    },

    {
      id: 3,
      title: "Why Najumi is Different",
      excerpt: "Discover the philosophy behind Najumi."
    }

  ]

}

},

mounted(instance) {

const posts = instance.state.items

let html = ""

posts.forEach(post => {

  html += `

    <div class="post-card">

      <h2>${post.title}</h2>

      <p>${post.excerpt}</p>

      <a href="/post?id=${post.id}" class="read-more">
        Read more
      </a>

    </div>

  `

})

instance.setState("posts", html)

const links = instance.el.querySelectorAll(".read-more")

links.forEach(link => {

  link.addEventListener("click", (e) => {

    const href = link.getAttribute("href")

    e.preventDefault()

    window.history.pushState({}, "", href)

    window.dispatchEvent(new Event("najumi:navigate"))

  })

})

}

}

/*
Initialize Blog Home Page
*/

export default function initHomePage() {

const componentSystem = getComponentSystem()

componentSystem.register("BlogHomePage", BlogHomePage)

componentSystem.mount("BlogHomePage", "#app")

}