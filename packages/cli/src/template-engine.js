// packages/cli/src/template-engine.js

import fs from "fs/promises"
import path from "path"

// replace template variables
function injectVariables(content, variables) {

  let result = content

  for (const [key, value] of Object.entries(variables)) {

    const pattern = new RegExp(`{{${key}}}`, "g")

    result = result.replace(pattern, value)

  }

  return result

}

// process a single file
async function processFile(src, dest, variables) {

  const content = await fs.readFile(src, "utf-8")

  const processed = injectVariables(content, variables)

  await fs.writeFile(dest, processed)

}

// copy template directory
async function copyTemplate(srcDir, destDir, variables) {

  await fs.mkdir(destDir, { recursive: true })

  const entries = await fs.readdir(srcDir, { withFileTypes: true })

  for (const entry of entries) {

    const srcPath = path.join(srcDir, entry.name)
    const destPath = path.join(destDir, entry.name)

    if (entry.isDirectory()) {

      await copyTemplate(srcPath, destPath, variables)

    } else {

      await processFile(srcPath, destPath, variables)

    }

  }

}

// main template generator
export async function generateProject(templatePath, targetPath, variables) {

  try {

    await copyTemplate(templatePath, targetPath, variables)

    console.log("Project generated successfully.")

  } catch (error) {

    console.error("Template generation failed:", error.message)

  }

}