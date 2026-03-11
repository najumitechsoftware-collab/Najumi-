/*
Najumi UI Input Component
*/

import { getComponentSystem } from "../../view/component-system.js"

const UIInput = {

template: `

<div class="najumi-input-wrapper">

  <label class="najumi-input-label">

    {{label}}

  </label>

  <input
    class="najumi-input-field"
    type="{{type}}"
    placeholder="{{placeholder}}"
  />

</div>

`,

state() {

return {

  label: "",

  type: "text",

  placeholder: "",

  value: ""

}

},

mounted(instance) {

const input = instance.el.querySelector(".najumi-input-field")

if (!input) return

/*
Security: sanitize input
*/

input.addEventListener("input", () => {

  let value = input.value

  /*
  Basic sanitization
  */

  value = value.replace(/</g, "&lt;")
  value = value.replace(/>/g, "&gt;")

  instance.state.value = value

  /*
  Emit Najumi event
  */

  const event = new CustomEvent("najumi:input-change", {

    detail: {

      value

    }

  })

  window.dispatchEvent(event)

})

}

}

/*
Initialize UI Input
*/

export function initUIInput() {

const componentSystem = getComponentSystem()

componentSystem.register("UIInput", UIInput)

}