/*
Product Details Page
*/

import { getComponentSystem } from "../../../frontend/src/view/component-system.js"

const ProductPage = {

template: `

<section class="product-page">

  <h1>{{name}}</h1>

  <p class="price">{{price}}</p>

  <p class="description">
    {{description}}
  </p>

  <button id="addToCart">
    Add to Cart
  </button>

</section>

`,

state() {

return {

  id: 1,

  name: "Example Product",

  price: "$29.00",

  description: "This is an example product description."

}

},

mounted(instance) {

const addBtn = instance.el.querySelector("#addToCart")

if (addBtn) {

  addBtn.addEventListener("click", () => {

    alert("Product added to cart")

  })

}

}

}

/*
Initialize product page
*/
export default function initProductPage() {

const componentSystem = getComponentSystem()

componentSystem.register("ProductPage", ProductPage)

componentSystem.mount("ProductPage", "#app")

}