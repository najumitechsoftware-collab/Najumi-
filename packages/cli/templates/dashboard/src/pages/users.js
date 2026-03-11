/*
Users Management Page
*/

import { getComponentSystem } from "../../../frontend/src/view/component-system.js"

const UsersPage = {

template: `

<section class="users-page">

  <h1>Users</h1>

  <p>
    Manage application users.
  </p>

  <table class="users-table">

    <thead>
      <tr>
        <th>ID</th>
        <th>Email</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>

      {{rows}}

    </tbody>

  </table>

</section>

`,

state() {

return {

  users: [
    { id: 1, email: "user1@example.com", status: "active" },
    { id: 2, email: "user2@example.com", status: "active" },
    { id: 3, email: "user3@example.com", status: "pending" }
  ],

  rows: ""

}

},

mounted(instance) {

const users = instance.state.users

let rows = ""

users.forEach(user => {

  rows += `
    <tr>
      <td>${user.id}</td>
      <td>${user.email}</td>
      <td>${user.status}</td>
    </tr>
  `

})

instance.setState("rows", rows)

}

}

/*
Initialize users page
*/
export default function initUsersPage() {

const componentSystem = getComponentSystem()

componentSystem.register("UsersPage", UsersPage)

componentSystem.mount("UsersPage", "#app")

}