// packages/frontend/src/view/compiler/view-compiler.js

import { parseTemplate } from "./template-parser.js"
import { buildAST } from "./ast-builder.js"
import { analyzeDependencies } from "./dependency-analyzer.js"
import { generateCode } from "./code-generator.js"

class ViewCompiler {

  constructor(options = {}) {

    this.options = {
      mode: options.mode || "production",
      debug: options.debug || false
    }

  }

  /*
  Main compile function
  */
  compile(template) {

    if (typeof template !== "string") {
      throw new Error("Template must be a string")
    }

    const start = performance.now()

    /*
    Step 1: Parse template
    */
    const tokens = parseTemplate(template)

    /*
    Step 2: Build AST
    */
    const ast = buildAST(tokens)

    /*
    Step 3: Analyze dependencies
    */
    const dependencies = analyzeDependencies(ast)

    /*
    Step 4: Generate optimized code
    */
    const code = generateCode(ast, dependencies)

    const end = performance.now()

    if (this.options.debug) {

      console.log("Najumi Forge Compiler Debug")
      console.log("Tokens:", tokens)
      console.log("AST:", ast)
      console.log("Dependencies:", dependencies)
      console.log("Compile time:", (end - start).toFixed(2), "ms")

    }

    return {
      code,
      dependencies,
      compileTime: end - start
    }

  }

}

/*
 Singleton compiler
*/
let compilerInstance = null

export function initViewCompiler(options = {}) {

  if (!compilerInstance) {

    compilerInstance = new ViewCompiler(options)

  }

  return compilerInstance

}

export function getViewCompiler() {

  if (!compilerInstance) {

    throw new Error("View compiler not initialized")

  }

  return compilerInstance

}