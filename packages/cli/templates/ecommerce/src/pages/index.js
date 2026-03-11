/*
Ecommerce Store Homepage
*/

import { getComponentSystem } from "../../../frontend/src/view/component-system.js"

const StoreHomePage = {

template: `

<section class="store-home">

  <h2>{{store}}</h2>

  <p>
    Browse our products.
  </p>

  <div class="products">

    {{products}}

  </div>

</section>

`,

state() {

return {

  store: "{{projectName}} Store",

  items: [
    { id: 1, name: "Product One", price: "$29.00" },
    { id: 2, name: "Product Two", price: "$49.00" },
    { id: 3, name: "Product Three", price: "$19.00" }
  ],

  products: ""

}

},

mounted(instance) {

const items = instance.state.items

let html = ""

items.forEach(product => {

  html += `
    <div class="product">

      <h3>${product.name}</h3>

      <p>${product.price}</p>

      <button data-id="${product.id}">
        Add to Cart
      </button>

    </div>
  `

})

instance.setState("products", html)

}

}

/*
Initialize store homepage
*/
export default function initStoreHomePage() {

const componentSystem = getComponentSystem()

componentSystem.register("StoreHomePage", StoreHomePage)

componentSystem.mount("StoreHomePage", "#app")

}