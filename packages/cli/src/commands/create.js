// packages/cli/src/commands/create.js

import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

/*
Get CLI directory
*/
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/*
Template directory (relative to CLI package)
*/
const templatesRoot = path.resolve(
  __dirname,
  "../../templates"
)

/*
Replace template variables
*/
function replaceVariables(content, variables) {

  let result = content

  for (const [key, value] of Object.entries(variables)) {

    const pattern = new RegExp(`{{${key}}}`, "g")

    result = result.replace(pattern, value)

  }

  return result

}

/*
Copy template files
*/
async function copyTemplate(src, dest, variables) {

  const entries = await fs.readdir(src, { withFileTypes: true })

  for (const entry of entries) {

    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {

      await fs.mkdir(destPath, { recursive: true })

      await copyTemplate(srcPath, destPath, variables)

    } else {

      let content = await fs.readFile(srcPath, "utf-8")

      content = replaceVariables(content, variables)

      await fs.writeFile(destPath, content)

    }

  }

}

/*
Create project from template
*/
async function createProject(template, projectName) {

  if (!projectName) {

    console.error("Please provide a project name")

    process.exit(1)

  }

  const projectRoot = path.join(process.cwd(), projectName)

  const templatePath = path.join(templatesRoot, template)

  try {

    /*
    Check if template exists
    */
    await fs.access(templatePath)

  } catch {

    console.error(`Template not found: ${template}`)

    process.exit(1)

  }

  try {

    /*
    Create project directory
    */
    await fs.mkdir(projectRoot)

  } catch {

    console.error("Project folder already exists")

    process.exit(1)

  }

  const variables = {

    projectName,

    port: "3000"

  }

  /*
  Copy template
  */
  await copyTemplate(templatePath, projectRoot, variables)

  console.log("")
  console.log("Project created successfully")
  console.log("")
  console.log("Next steps:")
  console.log("")
  console.log(`cd ${projectName}`)
  console.log("najumi dev")
  console.log("")

}

/*
CLI handler
*/
export default async function handler(args) {

  const template = args[0]

  const projectName = args[1]

  if (!template || !projectName) {

    console.log("")
    console.log("Usage:")
    console.log("")
    console.log("najumi create <template> <project-name>")
    console.log("")
    console.log("Example:")
    console.log("")
    console.log("najumi create app my-app")
    console.log("")

    process.exit(1)

  }

  await createProject(template, projectName)

}