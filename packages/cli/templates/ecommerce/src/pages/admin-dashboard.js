/*
Ecommerce Admin Dashboard
*/

import { getComponentSystem } from "../../../frontend/src/view/component-system.js"

const AdminDashboard = {

template: `

<section class="admin-dashboard">

  <h1>Store Admin</h1>

  <div class="admin-section">

    <h2>Products</h2>

    <button id="addProductBtn">
      Add Product
    </button>

    <div class="product-list">
      {{products}}
    </div>

  </div>

  <div class="admin-section">

    <h2>Orders</h2>

    <div class="orders">
      {{orders}}
    </div>

  </div>

</section>

`,

state() {

return {

  productsHTML: "",

  ordersHTML: "",

  products: [
    { id: 1, name: "Product One", price: 29 },
    { id: 2, name: "Product Two", price: 49 }
  ],

  orders: [
    { id: 1001, total: 58 },
    { id: 1002, total: 19 }
  ]

}

},

mounted(instance) {

/*
Render products
*/

let productsHTML = ""

instance.state.products.forEach(product => {

  productsHTML += `
    <div class="admin-product">
      <strong>${product.name}</strong>
      <span>$${product.price}</span>
    </div>
  `

})

instance.setState("products", productsHTML)

/*
Render orders
*/

let ordersHTML = ""

instance.state.orders.forEach(order => {

  ordersHTML += `
    <div class="admin-order">
      Order #${order.id}
      - $${order.total}
    </div>
  `

})

instance.setState("orders", ordersHTML)

/*
Add product button
*/

const addBtn = instance.el.querySelector("#addProductBtn")

if (addBtn) {

  addBtn.addEventListener("click", () => {

    alert("Add product feature coming soon")

  })

}

}

}

/*
Initialize Admin Dashboard
*/

export default function initAdminDashboard() {

const componentSystem = getComponentSystem()

componentSystem.register("AdminDashboard", AdminDashboard)

componentSystem.mount("AdminDashboard", "#app")

}