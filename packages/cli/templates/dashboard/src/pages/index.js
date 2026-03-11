/*
Dashboard Main Page
*/

import { getComponentSystem } from "../../../frontend/src/view/component-system.js"

const DashboardMain = {

template: `

<section class="dashboard-main">

  <h1>Welcome to {{title}}</h1>

  <p>
    Your Najumi admin dashboard is ready.
  </p>

  <div class="stats">

    <div class="stat">
      <h3>Total Users</h3>
      <p>{{users}}</p>
    </div>

    <div class="stat">
      <h3>Revenue</h3>
      <p>{{revenue}}</p>
    </div>

    <div class="stat">
      <h3>Visits</h3>
      <p>{{visits}}</p>
    </div>

  </div>

</section>

`,

state() {

return {

  title: "{{projectName}} Dashboard",

  users: 102,

  revenue: "$4,200",

  visits: "8,920"

}

},

mounted(instance) {

/*
Example lifecycle hook
Developers can load analytics data here
*/

console.log("Dashboard mounted")

}

}

/*
Initialize dashboard page
*/
export default function initDashboardPage() {

const componentSystem = getComponentSystem()

componentSystem.register("DashboardMain", DashboardMain)

componentSystem.mount("DashboardMain", "#app")

}