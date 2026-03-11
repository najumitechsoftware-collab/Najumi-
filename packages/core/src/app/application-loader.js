// packages/core/src/app/application-loader.js

import fs from "fs/promises"
import path from "path"

function isValidFile(file) {

  if (!file) return false

  if (file.startsWith(".")) return false

  if (file.includes("..")) return false

  return true

}

/*
Load directory files safely
*/
async function readDirSafe(dir) {

  try {

    const files = await fs.readdir(dir, { withFileTypes: true })

    return files

  } catch {

    return []

  }

}

/*
Register pages
*/
async function loadPages(srcDir, router) {

  const pagesDir = path.join(srcDir, "pages")

  const files = await readDirSafe(pagesDir)

  for (const file of files) {

    if (!file.isFile()) continue

    if (!isValidFile(file.name)) continue

    if (!file.name.endsWith(".view")) continue

    const filePath = path.join(pagesDir, file.name)

    const routePath = "/" + file.name.replace(".view", "")

    router.add(routePath, async (req, res) => {

      const template = await fs.readFile(filePath, "utf-8")

      res.setHeader("Content-Type", "text/html")

      res.end(template)

    })

  }

}

/*
Register API routes
*/
async function loadApi(srcDir, router) {

  const apiDir = path.join(srcDir, "api")

  const files = await readDirSafe(apiDir)

  for (const file of files) {

    if (!file.isFile()) continue

    if (!isValidFile(file.name)) continue

    if (!file.name.endsWith(".js")) continue

    const filePath = path.join(apiDir, file.name)

    const routePath = "/api/" + file.name.replace(".js", "")

    const module = await import(filePath)

    const handler = module.default || module.handler

    if (typeof handler !== "function") continue

    router.add(routePath, handler)

  }

}

/*
Load services
*/
async function loadServices(srcDir) {

  const servicesDir = path.join(srcDir, "services")

  const files = await readDirSafe(servicesDir)

  const services = {}

  for (const file of files) {

    if (!file.isFile()) continue

    if (!file.name.endsWith(".js")) continue

    const filePath = path.join(servicesDir, file.name)

    const name = file.name.replace(".js", "")

    const module = await import(filePath)

    services[name] = module.default || module

  }

  return services

}

/*
Load jobs
*/
async function loadJobs(srcDir) {

  const jobsDir = path.join(srcDir, "jobs")

  const files = await readDirSafe(jobsDir)

  const jobs = []

  for (const file of files) {

    if (!file.isFile()) continue

    if (!file.name.endsWith(".js")) continue

    const filePath = path.join(jobsDir, file.name)

    const module = await import(filePath)

    const job = module.default || module

    jobs.push(job)

  }

  return jobs

}

/*
Main loader
*/
export async function loadApplication(router) {

  const projectRoot = process.cwd()

  const srcDir = path.join(projectRoot, "src")

  console.log("Loading Najumi application...")

  await loadPages(srcDir, router)

  await loadApi(srcDir, router)

  const services = await loadServices(srcDir)

  const jobs = await loadJobs(srcDir)

  return {
    services,
    jobs
  }

}