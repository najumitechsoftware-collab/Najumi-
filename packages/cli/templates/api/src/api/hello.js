export default {

/*
Route path
*/
path: "/hello",

/*
Route handlers
*/
handlers: {

/*
GET /api/hello
*/
async GET(req, res) {

  res.statusCode = 200

  res.setHeader("Content-Type", "application/json")

  res.end(JSON.stringify({

    message: "Hello from Najumi API",

    framework: "Najumi.js",

    success: true,

    timestamp: Date.now()

  }))

}

}

}