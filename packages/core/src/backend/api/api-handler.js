// packages/core/src/backend/api/api-handler.js

import { log } from "../../utils/logger.js"

const MAX_BODY_SIZE = 1024 * 1024 * 2 // 2MB


async function parseBody(req) {

  return new Promise((resolve, reject) => {

    let body = ""
    let size = 0

    req.on("data", chunk => {

      size += chunk.length

      if (size > MAX_BODY_SIZE) {

        reject(new Error("Request body too large"))
        req.destroy()
        return

      }

      body += chunk.toString()

    })

    req.on("end", () => {

      if (!body) {
        resolve(null)
        return
      }

      try {

        const parsed = JSON.parse(body)

        resolve(parsed)

      } catch {

        resolve(body)

      }

    })

    req.on("error", reject)

  })

}


function parseQuery(url) {

  const query = {}

  url.searchParams.forEach((value, key) => {

    query[key] = value

  })

  return query

}


function sendJson(res, data, status = 200) {

  res.statusCode = status

  res.setHeader("Content-Type", "application/json")

  res.end(JSON.stringify(data))

}


function sendError(res, message = "Internal server error", status = 500) {

  res.statusCode = status

  res.setHeader("Content-Type", "application/json")

  res.end(JSON.stringify({
    error: message
  }))

}


export function createApiHandler(handler) {

  return async function(req, res) {

    try {

      const url = new URL(req.url, `http://${req.headers.host}`)

      const query = parseQuery(url)

      const body = await parseBody(req)

      const context = {
        req,
        res,
        body,
        query,
        params: {}
      }

      const result = await handler(context)

      if (res.writableEnded) {
        return
      }

      if (result !== undefined) {

        sendJson(res, result)

      }

    } catch (error) {

      log("API handler error:", error)

      sendError(res)

    }

  }

}