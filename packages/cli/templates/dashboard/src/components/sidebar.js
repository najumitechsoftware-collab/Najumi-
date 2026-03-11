/*
Dashboard Sidebar Component
*/

import { getComponentSystem } from "../../../frontend/src/view/component-system.js"

const SidebarComponent = {

template: `

<aside class="dashboard-sidebar">

  <h2 class="sidebar-title">{{title}}</h2>

  <nav class="sidebar-nav">

    <a href="/" class="nav-link">Dashboard</a>

    <a href="/users" class="nav-link">Users</a>

    <a href="/analytics" class="nav-link">Analytics</a>

  </nav>

</aside>

`,

state() {

return {

  title: "{{projectName}}"

}

},

mounted(instance) {

/*
Highlight active link
*/

const links = instance.el.querySelectorAll(".nav-link")

links.forEach(link => {

  if (link.getAttribute("href") === window.location.pathname) {

    link.style.fontWeight = "bold"

  }

})

}

}

/*
Initialize sidebar component
*/
export default function initSidebar() {

const componentSystem = getComponentSystem()

componentSystem.register("DashboardSidebar", SidebarComponent)

}