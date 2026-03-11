/*
Cart Item Component
*/

import { getComponentSystem } from "../../../frontend/src/view/component-system.js"

const CartItem = {

template: `

<div class="cart-item">

  <div class="cart-item-info">

    <h4>{{name}}</h4>

    <p>${{price}}</p>

  </div>

  <div class="cart-item-actions">

    <button class="qty-decrease">-</button>

    <span class="qty">{{qty}}</span>

    <button class="qty-increase">+</button>

    <button class="remove-btn">Remove</button>

  </div>

</div>

`,

state() {

return {

  id: 0,

  name: "Product",

  price: 0,

  qty: 1

}

},

mounted(instance) {

const dec = instance.el.querySelector(".qty-decrease")
const inc = instance.el.querySelector(".qty-increase")
const remove = instance.el.querySelector(".remove-btn")

if (dec) {

  dec.addEventListener("click", () => {

    let qty = instance.state.qty

    if (qty > 1) {

      qty--

      instance.setState("qty", qty)

    }

  })

}

if (inc) {

  inc.addEventListener("click", () => {

    let qty = instance.state.qty

    qty++

    instance.setState("qty", qty)

  })

}

if (remove) {

  remove.addEventListener("click", () => {

    console.log("Remove item:", instance.state.id)

    instance.el.remove()

  })

}

}

}

/*
Initialize cart item component
*/
export default function initCartItem() {

const componentSystem = getComponentSystem()

componentSystem.register("CartItem", CartItem)

}