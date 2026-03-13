import fs from "fs/promises"
import path from "path"

/*
Resolve templates directory
*/
function resolveTemplates() {

  const possiblePaths = [

    // when running inside repo
    path.resolve(process.cwd(), "packages/cli/templates"),

    // when installed globally
    path.resolve(process.cwd(), "node_modules/najumi/templates"),

    // fallback relative path
    path.resolve(process.cwd(), "templates")

  ]

  for (const p of possiblePaths) {

    try {

      return p

    } catch {}

  }

  return null
}

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
Copy directory recursively
*/
async function copyDir(src, dest, variables) {

  const entries = await fs.readdir(src, { withFileTypes: true })

  for (const entry of entries) {

    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {

      await fs.mkdir(destPath, { recursive: true })

      await copyDir(srcPath, destPath, variables)

    } else {

      let content = await fs.readFile(srcPath, "utf8")

      content = replaceVariables(content, variables)

      await fs.writeFile(destPath, content)

    }

  }

}

/*
Create project
*/
async function createProject(template, projectName) {

  const templatesRoot = resolveTemplates()

  const templatePath = path.join(templatesRoot, template)

  const projectRoot = path.join(process.cwd(), projectName)

  try {

    await fs.access(templatePath)

  } catch {

    console.error(`Template not found: ${template}`)
    console.error(`Checked path: ${templatePath}`)
    process.exit(1)

  }

  await fs.mkdir(projectRoot)

  const variables = {
    projectName,
    port: "3000"
  }

  await copyDir(templatePath, projectRoot, variables)

  console.log("")
  console.log("✔ Najumi project created successfully")
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
    console.log("najumi create <template> <project-name>")
    console.log("")
    console.log("Templates:")
    console.log("app api blog dashboard ecommerce saas")
    console.log("")

    process.exit(1)

  }

  await createProject(template, projectName)

}