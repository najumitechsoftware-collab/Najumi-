/*
SaaS Authentication - Login Endpoint
*/

export default {

path: "/api/login",

handlers: {

async POST(req, res) {

  try {

    let body = ""

    req.on("data", chunk => {
      body += chunk
    })

    req.on("end", async () => {

      const data = JSON.parse(body || "{}")

      const { email, password } = data

      if (!email || !password) {

        res.statusCode = 400

        res.setHeader("Content-Type", "application/json")

        res.end(JSON.stringify({
          success: false,
          error: "Email and password are required"
        }))

        return

      }

      /*
      Example authentication logic
      In real apps this should query Najumi Atlas
      */

      const fakeUser = {
        id: 1,
        email: email
      }

      /*
      Example token
      Real apps should generate JWT token
      */

      const token = "example-token"

      res.statusCode = 200

      res.setHeader("Content-Type", "application/json")

      res.end(JSON.stringify({
        success: true,
        message: "Login successful",
        token,
        user: fakeUser
      }))

    })

  } catch (error) {

    res.statusCode = 500

    res.setHeader("Content-Type", "application/json")

    res.end(JSON.stringify({
      success: false,
      error: "Login failed"
    }))

  }

}

}

}