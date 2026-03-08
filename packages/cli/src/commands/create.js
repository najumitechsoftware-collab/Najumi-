// packages/cli/src/commands/create.js

import fs from "fs/promises"
import path from "path"

function projectStructure(projectName) {
  return {
    name: projectName,
    folders: [
      "src",
      "public",
      "modules"
    ],
    files: {
      "package.json": JSON.stringify({
        name: projectName,
        version: "1.0.0",
        private: true,
        scripts: {
          dev: "najumi dev",
          build: "najumi build",
          start: "najumi start"
        }
      }, null, 2),

      "najumi.config.js": `export default {
  port: 3000,
  modules: [],
  plugins: []
}
`,

      "src/index.js": `console.log("Welcome to Najumi App")`
    }
  }
}

async function createProject(projectName) {

  if (!projectName) {
    console.error("Please provide a project name")
    process.exit(1)
  }

  const root = path.join(process.cwd(), projectName)

  try {
    await fs.mkdir(root)

    const structure = projectStructure(projectName)

    // create folders
    for (const folder of structure.folders) {
      await fs.mkdir(path.join(root, folder))
    }

    // create files
    for (const [file, content] of Object.entries(structure.files)) {
      const filePath = path.join(root, file)

      await fs.mkdir(path.dirname(filePath), { recursive: true })
      await fs.writeFile(filePath, content)
    }

    console.log(`Project created: ${projectName}`)

  } catch (err) {
    console.error("Failed to create project:", err.message)
  }
}

export default async function handler(args) {

  const projectType = args[0]
  const projectName = args[1]

  if (projectType !== "app") {
    console.error("Only 'app' project type is supported")
    return
  }

  await createProject(projectName)
}