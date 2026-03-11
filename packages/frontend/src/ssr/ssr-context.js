/*
Najumi SSR Context
*/

export function createSSRContext({

path = "/",
req = {},
res = {}

} = {}) {

const query = parseQuery(path)

const cookies = parseCookies(req.headers ? req.headers.cookie : "")

return {

path,

query,

cookies,

headers: req.headers || {},

request: req,

response: res,

/*
Redirect helper
*/

redirect(url) {

  if (res && res.writeHead) {

    res.writeHead(302, { Location: url })
    res.end()

  }

},

/*
Set response header
*/

setHeader(name, value) {

  if (res && res.setHeader) {

    res.setHeader(name, value)

  }

}

}

}

/*
Parse query string
*/

function parseQuery(path) {

const query = {}

const parts = path.split("?")

if (parts.length < 2) {

return query

}

const queryString = parts[1]

const pairs = queryString.split("&")

for (const pair of pairs) {

const [key, value] = pair.split("=")

query[decodeURIComponent(key)] = decodeURIComponent(value || "")

}

return query

}

/*
Parse cookies
*/

function parseCookies(cookieHeader = "") {

const cookies = {}

const pairs = cookieHeader.split(";")

for (const pair of pairs) {

const parts = pair.split("=")

if (parts.length < 2) continue

const key = parts[0].trim()

const value = parts[1].trim()

cookies[key] = decodeURIComponent(value)

}

return cookies

}