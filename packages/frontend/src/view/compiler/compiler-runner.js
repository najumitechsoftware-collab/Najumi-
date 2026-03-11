// packages/frontend/src/view/compiler/compiler-runner.js

import fs from "fs/promises"
import path from "path"

import { initViewCompiler } from "./view-compiler.js"

const compiler = initViewCompiler()

/*
 Scan directory for templates
*/
async function scanTemplates(dir) {

  const files = await fs.readdir(dir, { withFileTypes: true })

  const templates = []

  for (const file of files) {

    const fullPath = path.join(dir, file.name)

    if (file.isDirectory()) {

      const nested = await scanTemplates(fullPath)

      templates.push(...nested)

    }

    else if (file.name.endsWith(".view")) {

      templates.push(fullPath)

    }

  }

  return templates

}

/*
 Compile a single template
*/
async function compileTemplate(filePath) {

  const template = await fs.readFile(filePath, "utf-8")

  const result = compiler.compile(template)

  return result

}

/*
 Write compiled output
*/
async function writeOutput(outputDir, filePath, code) {

  const fileName = path.basename(filePath).replace(".view", ".js")

  const outPath = path.join(outputDir, fileName)

  await fs.mkdir(outputDir, { recursive: true })

  await fs.writeFile(outPath, code.render)

}

/*
 Main runner
*/
export async function runViewCompiler(projectRoot, options = {}) {

  const srcDir = path.join(projectRoot, "src")

  const outputDir = path.join(projectRoot, "dist", "view")

  const templates = await scanTemplates(srcDir)

  if (!templates.length) {

    console.log("No .view templates found")

    return

  }

  console.log(`Found ${templates.length} templates`)

  for (const file of templates) {

    try {

      const compiled = await compileTemplate(file)

      await writeOutput(outputDir, file, compiled.code)

      console.log("Compiled:", file)

    } catch (err) {

      console.error("Compile failed:", file)

      console.error(err)

    }

  }

}