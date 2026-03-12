/*
Najumi Response API
High-performance response wrapper
*/

export function createResponse(res) {

const response = {

/*
Raw response
*/
raw: res,

/*
Status code
*/
status(code) {

  res.statusCode = code
  return this

},

/*
Set header
*/
header(name, value) {

  res.setHeader(name, value)
  return this

},

/*
Send text response
*/
send(data) {

  if (!res.headersSent) {
    res.setHeader("Content-Type", "text/plain")
  }

  res.end(data)

},

/*
Send JSON response
*/
json(data) {

  if (!res.headersSent) {

    res.setHeader("Content-Type", "application/json")

  }

  const body = JSON.stringify(data)

  res.end(body)

},

/*
Redirect
*/
redirect(url, status = 302) {

  res.statusCode = status
  res.setHeader("Location", url)
  res.end()

},

/*
Send HTML
*/
html(htmlContent) {

  if (!res.headersSent) {

    res.setHeader("Content-Type", "text/html")

  }

  res.end(htmlContent)

},

/*
End response
*/
end() {

  res.end()

}

}

return response

}