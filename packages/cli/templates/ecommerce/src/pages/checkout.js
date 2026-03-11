/*
Checkout Page
*/

import { getComponentSystem } from "../../../frontend/src/view/component-system.js"

const CheckoutPage = {

template: `

<section class="checkout-page">

  <h1>Checkout</h1>

  <form id="checkoutForm">

    <div class="form-group">

      <label>Name</label>

      <input type="text" name="name" required />

    </div>

    <div class="form-group">

      <label>Email</label>

      <input type="email" name="email" required />

    </div>

    <div class="form-group">

      <label>Address</label>

      <input type="text" name="address" required />

    </div>

    <button type="submit">
      Place Order
    </button>

  </form>

</section>

`,

state() {

return {

  orderPlaced: false

}

},

mounted(instance) {

const form = instance.el.querySelector("#checkoutForm")

if (!form) return

form.addEventListener("submit", (event) => {

  event.preventDefault()

  const formData = new FormData(form)

  const order = {

    name: formData.get("name"),

    email: formData.get("email"),

    address: formData.get("address")

  }

  console.log("Order placed:", order)

  alert("Order placed successfully!")

})

}

}

/*
Initialize checkout page
*/
export default function initCheckoutPage() {

const componentSystem = getComponentSystem()

componentSystem.register("CheckoutPage", CheckoutPage)

componentSystem.mount("CheckoutPage", "#app")

}