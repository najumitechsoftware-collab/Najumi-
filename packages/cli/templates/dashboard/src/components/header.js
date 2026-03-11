/*
Dashboard Header Component
*/

import { getComponentSystem } from "../../../frontend/src/view/component-system.js"

const HeaderComponent = {

template: `

<header class="dashboard-header">

  <div class="header-left">

    <h1>{{title}}</h1>

  </div>

  <div class="header-right">

    <span class="notification">🔔</span>

    <span class="user">{{user}}</span>

    <button id="logoutBtn">Logout</button>

  </div>

</header>

`,

state() {

return {

  title: "Admin Panel",

  user: "Admin"

}

},

mounted(instance) {

/*
Logout handler
*/

const logoutBtn = instance.el.querySelector("#logoutBtn")

if (logoutBtn) {

  logoutBtn.addEventListener("click", () => {

    alert("Logout functionality not implemented yet")

  })

}

}

}

/*
Initialize header component
*/
export default function initHeader() {

const componentSystem = getComponentSystem()

componentSystem.register("DashboardHeader", HeaderComponent)

}