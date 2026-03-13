import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

/*
Resolve current file location
*/
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/*
Resolve CLI root
*/
const cliRoot = path.resolve(__dirname, "../../")

/*
Primary templates directory
*/
let templatesRoot = path.join(cliRoot, "templates")

/*
Fallback templates directory
(for npm link or global install)
*/
const fallbackTemplates = path.join(
  process.cwd(),
  "packages",
  "cli",
  "templates"
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
Copy template recursively
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

      let content = await fs.readFile(srcPath, "utf8")

      content = replaceVariables(content, variables)

      await fs.writeFile(destPath, content)

    }

  }

}

/*
Ensure templates directory exists
*/
async function resolveTemplatesRoot() {

  console.log("DEBUG CLI ROOT:", cliRoot)
  console.log("DEBUG PRIMARY TEMPLATES:", templatesRoot)
  console.log("DEBUG FALLBACK TEMPLATES:", fallbackTemplates)

  try {

    await fs.access(templatesRoot)
    console.log("DEBUG: Primary templates directory exists")

  } catch {

    console.log("DEBUG: Primary templates not found, trying fallback...")

    try {

      await fs.access(fallbackTemplates)
      templatesRoot = fallbackTemplates

      console.log("DEBUG: Using fallback templates:", templatesRoot)

    } catch {

      console.error("Templates directory not found.")
      console.error("Checked paths:")
      console.error("Primary:", templatesRoot)
      console.error("Fallback:", fallbackTemplates)

      process.exit(1)

    }

  }

}

/*
Create project
*/
async function createProject(template, projectName) {

  await resolveTemplatesRoot()

  const projectRoot = path.join(process.cwd(), projectName)
  const templatePath = path.join(templatesRoot, template)

  console.log("DEBUG TEMPLATE PATH:", templatePath)

  try {

    await fs.access(templatePath)
    console.log("DEBUG: Template exists")

  } catch {

    console.error(`Template not found: ${template}`)
    console.error(`Looked in: ${templatePath}`)
    process.exit(1)

  }

  try {

    await fs.mkdir(projectRoot)

  } catch {

    console.error("Project folder already exists")
    process.exit(1)

  }

  const variables = {
    projectName,
    port: "3000"
  }

  await copyTemplate(templatePath, projectRoot, variables)

  console.log("")
  console.log("✔ Najumi project created successfully")
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
    console.log("Available templates:")
    console.log("")
    console.log("app")
    console.log("api")
    console.log("blog")
    console.log("dashboard")
    console.log("ecommerce")
    console.log("saas")
    console.log("")
    console.log("Example:")
    console.log("")
    console.log("najumi create app my-app")
    console.log("")

    process.exit(1)

  }

  await createProject(template, projectName)

}