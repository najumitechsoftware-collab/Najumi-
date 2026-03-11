/*
Najumi UI Form Component
*/

import { getComponentSystem } from "../../view/component-system.js"

const UIForm = {

template: `

<form class="najumi-form">

  {{fields}}

  <div class="najumi-form-actions">

    <button type="submit" class="najumi-form-submit">

      {{submitLabel}}

    </button>

  </div>

</form>

`,

state() {

return {

  fields: "",

  submitLabel: "Submit"

}

},

mounted(instance) {

const form = instance.el.querySelector(".najumi-form")

if (!form) return

form.addEventListener("submit", (event) => {

  event.preventDefault()

  const formData = new FormData(form)

  const data = {}

  formData.forEach((value, key) => {

    /*
    Basic sanitization
    */

    if (typeof value === "string") {

      value = value.replace(/</g, "&lt;")
      value = value.replace(/>/g, "&gt;")

    }

    data[key] = value

  })

  /*
  Emit Najumi form event
  */

  const customEvent = new CustomEvent("najumi:form-submit", {

    detail: data

  })

  window.dispatchEvent(customEvent)

})

}

}

/*
Initialize UI Form
*/

export function initUIForm() {

const componentSystem = getComponentSystem()

componentSystem.register("UIForm", UIForm)

}