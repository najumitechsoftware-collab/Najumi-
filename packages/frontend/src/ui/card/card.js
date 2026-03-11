/*
Najumi UI Card Component
*/

import { getComponentSystem } from "../../view/component-system.js"

const UICard = {

template: `

<div class="najumi-card">

  <div class="najumi-card-header">

    <h3>{{title}}</h3>

  </div>

  <div class="najumi-card-body">

    {{content}}

  </div>

  <div class="najumi-card-footer">

    {{footer}}

  </div>

</div>

`,

state() {

return {

  title: "Card Title",

  content: "Card content goes here.",

  footer: ""

}

},

mounted(instance) {

/*
Emit event when card loads
*/

const event = new CustomEvent("najumi:card-mounted", {

  detail: {

    title: instance.state.title

  }

})

window.dispatchEvent(event)

}

}

/*
Initialize UI Card
*/

export function initUICard() {

const componentSystem = getComponentSystem()

componentSystem.register("UICard", UICard)

}