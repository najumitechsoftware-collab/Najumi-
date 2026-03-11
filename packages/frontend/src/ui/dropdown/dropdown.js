/*
Najumi UI Dropdown Component
*/

import { getComponentSystem } from "../../view/component-system.js"

const UIDropdown = {

template: `

<div class="najumi-dropdown">

  <button class="najumi-dropdown-toggle">

    {{label}}

  </button>

  <div class="najumi-dropdown-menu">

    {{items}}

  </div>

</div>

`,

state() {

return {

  label: "Menu",

  items: ""

}

},

mounted(instance) {

const toggle = instance.el.querySelector(".najumi-dropdown-toggle")

const menu = instance.el.querySelector(".najumi-dropdown-menu")

if (!toggle || !menu) return

/*
Toggle dropdown
*/

toggle.addEventListener("click", () => {

  const isOpen = menu.classList.contains("open")

  if (isOpen) {

    menu.classList.remove("open")

  } else {

    menu.classList.add("open")

  }

})

/*
Close dropdown when clicking outside
*/

document.addEventListener("click", (e) => {

  if (!instance.el.contains(e.target)) {

    menu.classList.remove("open")

  }

})

}

}

/*
Initialize UI Dropdown
*/

export function initUIDropdown() {

const componentSystem = getComponentSystem()

componentSystem.register("UIDropdown", UIDropdown)

}