/*
Najumi UI Button Component
*/

import { getComponentSystem } from "../../view/component-system.js"

const UIButton = {

template: `

<button class="najumi-btn {{variant}}">

  {{label}}

</button>

`,

state() {

return {

  label: "Button",

  variant: "primary"

}

},

mounted(instance) {

const button = instance.el.querySelector("button")

if (!button) return

button.addEventListener("click", (event) => {

  /*
  Dispatch Najumi UI event
  */

  const customEvent = new CustomEvent("najumi:button-click", {

    detail: {

      label: instance.state.label

    }

  })

  window.dispatchEvent(customEvent)

})

}

}

/*
Initialize UI Button
*/

export function initUIButton() {

const componentSystem = getComponentSystem()

componentSystem.register("UIButton", UIButton)

}