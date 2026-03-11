// packages/frontend/src/view/compiler/dependency-analyzer.js

export function analyzeDependencies(ast) {

  const dependencies = new Set()

  walk(ast)

  return Array.from(dependencies)

  /*
  Walk AST recursively
  */
  function walk(node) {

    if (!node) return

    /*
    Expression nodes
    */
    if (node.type === "EXPRESSION") {

      extractDeps(node.value).forEach(dep => {
        dependencies.add(dep)
      })

    }

    /*
    Walk children
    */
    if (node.children && node.children.length) {

      for (const child of node.children) {

        walk(child)

      }

    }

  }

}

/*
Extract dependencies from expression
*/
function extractDeps(expression) {

  const deps = []

  /*
  match identifiers like:
  user
  user.name
  user.profile.name
  */

  const regex = /[a-zA-Z_$][\w.$]*/g

  let match

  while ((match = regex.exec(expression))) {

    const value = match[0]

    /*
    ignore JS keywords
    */
    if (isKeyword(value)) {
      continue
    }

    deps.push(value)

  }

  return deps

}

/*
Basic JS keyword filter
*/
function isKeyword(word) {

  const keywords = new Set([
    "true",
    "false",
    "null",
    "undefined",
    "if",
    "else",
    "return",
    "const",
    "let",
    "var"
  ])

  return keywords.has(word)

}