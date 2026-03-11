/*
Najumi SSR Response System
*/

export function createSSRResponse(res) {

if (!res) {

return {

  status: 200,
  headers: {},
  body: ""

}

}

return {

/*
Set status code
*/

status(code) {

  if (res.writeHead) {

    res.statusCode = code

  }

  return this

},

/*
Set header
*/

setHeader(name, value) {

  if (res.setHeader) {

    res.setHeader(name, value)

  }

  return this

},

/*
Send HTML
*/

send(html) {

  if (res.writeHead) {

    res.setHeader("Content-Type", "text/html")

  }

  if (res.end) {

    res.end(html)

  }

},

/*
Send JSON
*/

json(data) {

  if (res.setHeader) {

    res.setHeader("Content-Type", "application/json")

  }

  if (res.end) {

    res.end(JSON.stringify(data))

  }

},

/*
Redirect
*/

redirect(url, code = 302) {

  if (res.writeHead) {

    res.writeHead(code, {

      Location: url

    })

  }

  if (res.end) {

    res.end()

  }

}

}

}