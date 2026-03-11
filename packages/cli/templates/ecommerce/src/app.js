/*
Najumi Ecommerce Application Entry
*/

import initNavbar from "./components/navbar.js"
import initProductCard from "./components/product-card.js"
import initCartItem from "./components/cart-item.js"

import initStoreHomePage from "./pages/index.js"
import initProductPage from "./pages/product.js"
import initCartPage from "./pages/cart.js"
import initCheckoutPage from "./pages/checkout.js"
import initAdminDashboard from "./pages/admin-dashboard.js"

/*
Initialize components
*/

initNavbar()
initProductCard()
initCartItem()

/*
Simple page router
*/

function loadPage() {

const path = window.location.pathname

if (path === "/") {

initStoreHomePage()

}

else if (path === "/product") {

initProductPage()

}

else if (path === "/cart") {

initCartPage()

}

else if (path === "/checkout") {

initCheckoutPage()

}

else if (path === "/admin") {

initAdminDashboard()

}

}

/*
Listen navigation events
*/

window.addEventListener("najumi:navigate", loadPage)

/*
First load
*/

loadPage()