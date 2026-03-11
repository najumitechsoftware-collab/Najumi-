/*
Najumi UI Table Component
*/

import { getComponentSystem } from "../../view/component-system.js"

const UITable = {

template: `

<div class="najumi-table-wrapper">

  <table class="najumi-table">

    <thead>

      <tr>

        {{headers}}

      </tr>

    </thead>

    <tbody>

      {{rows}}

    </tbody>

  </table>

</div>

`,

state() {

return {

  headers: "",

  rows: ""

}

},

mounted(instance) {

/*
Emit table mounted event
*/

const event = new CustomEvent("najumi:table-mounted")

window.dispatchEvent(event)

}

}

/*
Initialize UI Table
*/

export function initUITable() {

const componentSystem = getComponentSystem()

componentSystem.register("UITable", UITable)

}