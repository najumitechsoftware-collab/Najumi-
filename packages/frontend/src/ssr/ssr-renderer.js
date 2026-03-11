/*
Najumi SSR Renderer
*/

export async function renderToString(component, context = {}) {

try {

/*
If component is function
*/

if (typeof component === "function") {

  const result = await component(context)

  if (typeof result === "string") {

    return result

  }

  if (result && result.template) {

    return processTemplate(result.template, result.state || {})

  }

}

/*
If component is object
*/

if (component && component.template) {

  return processTemplate(component.template, component.state || {})

}

return "<div>Invalid component</div>"

} catch (error) {

console.error("SSR render error:", error)

return "<h1>Server Render Error</h1>"

}

}

/*
Template processor
*/

function processTemplate(template, state) {

let html = template

for (const key in state) {

const value = state[key]

const pattern = new RegExp(`{{\\s*${key}\\s*}}`, "g")

html = html.replace(pattern, value)

}

return html

}