/*
Najumi Request API
High-performance request wrapper
*/

import { parse } from "url"
import { StringDecoder } from "string_decoder"

export function createRequest(req) {

const parsedUrl = parse(req.url, true)

const request = {

/*
HTTP method
*/
method: req.method,

/*
Raw request
*/
raw: req,

/*
URL path
*/
path: parsedUrl.pathname,

/*
Query parameters
*/
query: parsedUrl.query || {},

/*
Route params
*/
params: {},

/*
Headers
*/
headers: req.headers,

/*
Body (lazy parsing)
*/
body: null,

/*
Parse JSON body
*/
async json() {

  if (this.body) {
    return this.body
  }

  const contentType = req.headers["content-type"] || ""

  if (!contentType.includes("application/json")) {
    return null
  }

  const decoder = new StringDecoder("utf8")

  let buffer = ""

  for await (const chunk of req) {

    buffer += decoder.write(chunk)

  }

  buffer += decoder.end()

  if (!buffer) {

    this.body = null
    return null

  }

  try {

    this.body = JSON.parse(buffer)

    return this.body

  } catch (error) {

    throw new Error("Invalid JSON body")

  }

},

/*
Parse text body
*/
async text() {

  const decoder = new StringDecoder("utf8")

  let buffer = ""

  for await (const chunk of req) {

    buffer += decoder.write(chunk)

  }

  buffer += decoder.end()

  return buffer

}

}

return request

}