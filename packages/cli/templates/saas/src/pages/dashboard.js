/*
SaaS Dashboard Page
*/

import { getComponentSystem } from "../../../frontend/src/view/component-system.js"

const DashboardPage = {

template: `

<section class="dashboard">

  <header class="dashboard-header">

    <h2>Dashboard</h2>

    <button id="logoutBtn">
      Logout
    </button>

  </header>

  <div class="dashboard-content">

    <div class="card">

      <h3>Welcome</h3>

      <p>
        Your SaaS dashboard is ready.
      </p>

    </div>

    <div class="card">

      <h3>Application Status</h3>

      <p>
        Najumi services are running.
      </p>

    </div>

    <div class="card">

      <h3>Next Steps</h3>

      <ul>
        <li>Create API routes</li>
        <li>Connect database</li>
        <li>Build your SaaS features</li>
      </ul>

    </div>

  </div>

</section>

`,

state() {

return {

  user: null

}

},

mounted(instance) {

const logoutBtn = instance.el.querySelector("#logoutBtn")

if (logoutBtn) {

  logoutBtn.addEventListener("click", () => {

    alert("Logout logic not implemented yet")

  })

}

}

}

/*
Initialize dashboard
*/
export default function initDashboardPage() {

const componentSystem = getComponentSystem()

componentSystem.register("DashboardPage", DashboardPage)

componentSystem.mount("DashboardPage", "#app")

}