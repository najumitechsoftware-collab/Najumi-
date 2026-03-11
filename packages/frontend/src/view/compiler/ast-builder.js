// packages/frontend/src/view/compiler/ast-builder.js

export function buildAST(tokens) {

  const root = {
    type: "ROOT",
    children: []
  }

  const stack = [root]

  let current = root

  for (let i = 0; i < tokens.length; i++) {

    const token = tokens[i]

    switch (token.type) {

      /*
      OPEN TAG
      */
      case "TAG_OPEN": {

        const elementNode = {
          type: "ELEMENT",
          tag: token.value,
          children: []
        }

        current.children.push(elementNode)

        stack.push(elementNode)

        current = elementNode

        break
      }

      /*
      CLOSE TAG
      */
      case "TAG_CLOSE": {

        stack.pop()

        current = stack[stack.length - 1]

        break
      }

      /*
      TEXT NODE
      */
      case "TEXT": {

        const textNode = {
          type: "TEXT",
          value: token.value
        }

        current.children.push(textNode)

        break
      }

      /*
      EXPRESSION NODE
      */
      case "EXPRESSION": {

        const exprNode = {
          type: "EXPRESSION",
          value: token.value
        }

        current.children.push(exprNode)

        break
      }

      default:
        break

    }

  }

  return root

}