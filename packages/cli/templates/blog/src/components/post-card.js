/*
Blog Post Card Component
*/

import { getComponentSystem } from "../../../frontend/src/view/component-system.js"

const PostCard = {

template: `

<div class="post-card">

  <h2>{{title}}</h2>

  <p class="excerpt">
    {{excerpt}}
  </p>

  <a href="/post?id={{id}}" class="read-more">
    Read more
  </a>

</div>

`,

state() {

return {

  id: 0,

  title: "Blog Post",

  excerpt: "Post summary..."

}

},

mounted(instance) {

const link = instance.el.querySelector(".read-more")

if (!link) return

link.addEventListener("click", (e) => {

  const href = link.getAttribute("href")

  e.preventDefault()

  window.history.pushState({}, "", href)

  window.dispatchEvent(new Event("najumi:navigate"))

})

}

}

/*
Initialize Post Card Component
*/

export default function initPostCard() {

const componentSystem = getComponentSystem()

componentSystem.register("PostCard", PostCard)

}