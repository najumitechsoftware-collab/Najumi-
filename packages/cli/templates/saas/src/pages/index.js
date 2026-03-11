/*
SaaS Landing Page
*/

import { getComponentSystem } from "../../../frontend/src/view/component-system.js"

/*
Landing component
*/
const LandingPage = {

template: `

<section class="landing">

  <h1>Welcome to {{name}}</h1>

  <p>
    Your SaaS platform powered by Najumi.js is ready.
  </p>

  <button id="openDashboard">
    Open Dashboard
  </button>

</section>

`,

state() {

return {
  name: "{{projectName}}"
}

},

mounted(instance) {

const button = instance.el.querySelector("#openDashboard")

if (button) {

  button.addEventListener("click", () => {

    window.location.href = "/dashboard"

  })

}

}

}

/*
Initialize landing page
*/
export default function initLandingPage() {

const componentSystem = getComponentSystem()

componentSystem.register("LandingPage", LandingPage)

componentSystem.mount("LandingPage", "#app")

}