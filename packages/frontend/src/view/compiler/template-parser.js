// packages/frontend/src/view/compiler/template-parser.js

export function parseTemplate(template) {

  const tokens = []

  let i = 0
  const len = template.length

  while (i < len) {

    const char = template[i]

    /*
    TAG START
    */
    if (char === "<") {

      const closeIndex = template.indexOf(">", i)

      if (closeIndex === -1) break

      const tagContent = template.slice(i + 1, closeIndex).trim()

      /*
      closing tag
      */
      if (tagContent.startsWith("/")) {

        tokens.push({
          type: "TAG_CLOSE",
          value: tagContent.slice(1)
        })

      } else {

        const tagName = tagContent.split(" ")[0]

        tokens.push({
          type: "TAG_OPEN",
          value: tagName
        })

      }

      i = closeIndex + 1
      continue

    }

    /*
    EXPRESSION
    */
    if (char === "{" && template[i + 1] === "{") {

      const closeIndex = template.indexOf("}}", i)

      if (closeIndex === -1) break

      const expression = template
        .slice(i + 2, closeIndex)
        .trim()

      tokens.push({
        type: "EXPRESSION",
        value: expression
      })

      i = closeIndex + 2
      continue

    }

    /*
    TEXT NODE
    */
    let textEnd = i

    while (
      textEnd < len &&
      template[textEnd] !== "<" &&
      !(template[textEnd] === "{" && template[textEnd + 1] === "{")
    ) {
      textEnd++
    }

    const text = template.slice(i, textEnd)

    if (text.trim()) {

      tokens.push({
        type: "TEXT",
        value: text
      })

    }

    i = textEnd

  }

  return tokens

}