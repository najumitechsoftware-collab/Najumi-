export default {

/*
Page title
*/
title: "Welcome to Najumi",

/*
Page state
*/
state() {

return {

  framework: "Najumi.js",

  message: "Your application is running successfully.",

  docs: "https://najumi.dev",

  year: new Date().getFullYear()

}

},

/*
Page template
*/
template: `

  <main class="container"><h1>🚀 Welcome to Najumi</h1>

<p>{{message}}</p>

<div class="info">

  <p>
    You are now running a <strong>{{framework}}</strong> application.
  </p>

  <p>
    Start editing this page:
  </p>

  <code>
    src/pages/index.js
  </code>

</div>

<div class="actions">

  <a href="{{docs}}" target="_blank">
    Documentation
  </a>

</div>

<footer>

  <p>
    © {{year}} Najumi Tech
  </p>

</footer>

  </main>`

}