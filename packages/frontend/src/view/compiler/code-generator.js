// packages/frontend/src/view/compiler/code-generator.js

export function generateCode(ast, dependencies = []) {

  const codeParts = []

  walk(ast)

  const templateCode = codeParts.join("")

  const renderFunction = `
function render(state) {
  return \`${templateCode}\`
}
`

  return {
    render: renderFunction,
    dependencies
  }

  /*
  Walk AST recursively
  */
  function walk(node) {

    if (!node) return

    switch (node.type) {

      /*
      ROOT
      */
      case "ROOT":

        if (node.children) {

          node.children.forEach(child => walk(child))

        }

        break

      /*
      ELEMENT
      */
      case "ELEMENT":

        codeParts.push(`<${node.tag}>`)

        if (node.children) {

          node.children.forEach(child => walk(child))

        }

        codeParts.push(`</${node.tag}>`)

        break

      /*
      TEXT NODE
      */
      case "TEXT":

        codeParts.push(node.value)

        break

      /*
      EXPRESSION NODE
      */
      case "EXPRESSION":

        codeParts.push(`\${state.${node.value}}`)

        break

      default:
        break

    }

  }

}