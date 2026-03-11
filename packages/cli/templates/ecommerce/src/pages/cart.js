/*
Shopping Cart Page
*/

import { getComponentSystem } from "../../../frontend/src/view/component-system.js"

const CartPage = {

template: `

<section class="cart-page">

  <h1>Your Cart</h1>

  <table class="cart-table">

    <thead>

      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Qty</th>
      </tr>

    </thead>

    <tbody>

      {{items}}

    </tbody>

  </table>

  <div class="cart-total">

    <h3>Total: {{total}}</h3>

    <button id="checkoutBtn">
      Checkout
    </button>

  </div>

</section>

`,

state() {

return {

  cart: [
    { name: "Product One", price: 29, qty: 1 },
    { name: "Product Two", price: 49, qty: 2 }
  ],

  items: "",

  total: "$0"

}

},

mounted(instance) {

const cart = instance.state.cart

let html = ""
let total = 0

cart.forEach(item => {

  const itemTotal = item.price * item.qty

  total += itemTotal

  html += `
    <tr>
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td>${item.qty}</td>
    </tr>
  `

})

instance.setState("items", html)

instance.setState("total", `$${total}`)

const checkoutBtn = instance.el.querySelector("#checkoutBtn")

if (checkoutBtn) {

  checkoutBtn.addEventListener("click", () => {

    window.location.href = "/checkout"

  })

}

}

}

/*
Initialize cart page
*/
export default function initCartPage() {

const componentSystem = getComponentSystem()

componentSystem.register("CartPage", CartPage)

componentSystem.mount("CartPage", "#app")

}