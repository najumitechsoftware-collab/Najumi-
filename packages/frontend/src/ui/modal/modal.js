/*
Najumi UI Modal Component
*/

import { getComponentSystem } from "../../view/component-system.js"

const UIModal = {

template: `

<div class="najumi-modal-overlay">

  <div class="najumi-modal">

    <div class="najumi-modal-header">

      <h3>{{title}}</h3>

      <button class="najumi-modal-close">
        ×
      </button>

    </div>

    <div class="najumi-modal-body">

      {{content}}

    </div>

  </div>

</div>

`,

state() {

return {

  title: "Modal Title",

  content: "Modal content..."

}

},

mounted(instance) {

const overlay = instance.el.querySelector(".najumi-modal-overlay")

const closeBtn = instance.el.querySelector(".najumi-modal-close")

/*
Close modal
*/

function closeModal() {

  overlay.remove()

  const event = new CustomEvent("najumi:modal-close")

  window.dispatchEvent(event)

}

if (closeBtn) {

  closeBtn.addEventListener("click", closeModal)

}

/*
Close when clicking outside
*/

overlay.addEventListener("click", (e) => {

  if (e.target === overlay) {

    closeModal()

  }

})

}

}

/*
Initialize UI Modal
*/

export function initUIModal() {

const componentSystem = getComponentSystem()

componentSystem.register("UIModal", UIModal)

}