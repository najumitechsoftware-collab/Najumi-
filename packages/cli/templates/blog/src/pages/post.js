/*
Single Blog Post Page
*/

import { getComponentSystem } from "../../../frontend/src/view/component-system.js"

const BlogPostPage = {

template: `

<section class="blog-post">

  <h1>{{title}}</h1>

  <p class="meta">
    Published on {{date}}
  </p>

  <article class="content">

    {{content}}

  </article>

  <p>

    <a href="/" class="back-link">
      ← Back to posts
    </a>

  </p>

</section>

`,

state() {

return {

  id: null,

  title: "Blog Post",

  date: "2026",

  content: "Post content goes here..."

}

},

mounted(instance) {

/*
Read post id from URL
*/

const params = new URLSearchParams(window.location.search)

const id = params.get("id")

if (!id) return

/*
Example static posts
(developer can replace with API or database)
*/

const posts = {

  1: {
    title: "Welcome to Najumi.js",
    date: "2026",
    content: `
      Najumi.js is a modern full-stack framework designed for speed,
      security and scalability.
    `
  },

  2: {
    title: "Building a Blog with Najumi",
    date: "2026",
    content: `
      You can easily create a fast blog using the Najumi framework.
    `
  },

  3: {
    title: "Why Najumi is Different",
    date: "2026",
    content: `
      Najumi focuses on developer simplicity and strong architecture.
    `
  }

}

const post = posts[id]

if (!post) return

instance.setState("title", post.title)

instance.setState("date", post.date)

instance.setState("content", post.content)

/*
SPA navigation
*/

const backLink = instance.el.querySelector(".back-link")

if (backLink) {

  backLink.addEventListener("click", (e) => {

    const href = backLink.getAttribute("href")

    e.preventDefault()

    window.history.pushState({}, "", href)

    window.dispatchEvent(new Event("najumi:navigate"))

  })

}

}

}

/*
Initialize Post Page
*/

export default function initPostPage() {

const componentSystem = getComponentSystem()

componentSystem.register("BlogPostPage", BlogPostPage)

componentSystem.mount("BlogPostPage", "#app")

}