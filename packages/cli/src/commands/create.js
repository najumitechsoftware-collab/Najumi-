import fs from "fs/promises"
import path from "path"

const templatesRoot = new URL("../../templates/", import.meta.url).pathname

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
    console.error(`Expected path: ${templatePath}`)
    process.exit(1)

  }

  await fs.mkdir(projectRoot)

  const variables = {
    projectName,
    port: "3000"
  }

  await copyTemplate(templatePath, projectRoot, variables)

  console.log("")
  console.log("✔ Najumi project created")
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
    console.log("najumi create <template> <project-name>")
    console.log("")
    console.log("Templates:")
    console.log("app api blog dashboard ecommerce saas")
    console.log("")

    process.exit(1)

  }

  await createProject(template, projectName)

}