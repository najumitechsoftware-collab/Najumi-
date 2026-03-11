/*
Product Card Component
*/

import { getComponentSystem } from "../../../frontend/src/view/component-system.js"

const ProductCard = {

template: `

<div class="product-card">

  <h3>{{name}}</h3>

  <p class="price">{{price}}</p>

  <button class="add-btn" data-id="{{id}}">
    Add to Cart
  </button>

</div>

`,

state() {

return {

  id: 0,
  name: "Product",
  price: "$0"

}

},

mounted(instance) {

const btn = instance.el.querySelector(".add-btn")

if (!btn) return

btn.addEventListener("click", () => {

  const id = instance.state.id

  console.log("Add to cart:", id)

  alert("Product added to cart")

})

}

}

/*
Initialize product card component
*/
export default function initProductCard() {

const componentSystem = getComponentSystem()

componentSystem.register("ProductCard", ProductCard)

}