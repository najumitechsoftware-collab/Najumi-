import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

/*
resolve file location
*/
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/*
CLI package root (packages/cli)
*/
const cliRoot = path.resolve(__dirname, "../../")

/*
templates folder
*/
const templatesRoot = path.join(cliRoot, "templates")

function replaceVariables(content, variables) {

  let result = content

  for (const [key, value] of Object.entries(variables)) {

    const pattern = new RegExp(`{{${key}}}`, "g")

    result = result.replace(pattern, value)

  }

  return result
}

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

async function createProject(template, projectName) {

  const templatePath = path.join(templatesRoot, template)
  const projectRoot = path.join(process.cwd(), projectName)

  try {
    await fs.access(templatePath)
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