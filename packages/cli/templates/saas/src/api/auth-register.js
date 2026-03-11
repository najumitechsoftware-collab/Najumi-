/*
SaaS Authentication - Register Endpoint
*/

export default {

path: "/api/register",

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
      Example user creation
      In real apps this should use Najumi Atlas
      */

      const user = {
        id: Date.now(),
        email
      }

      res.statusCode = 201

      res.setHeader("Content-Type", "application/json")

      res.end(JSON.stringify({
        success: true,
        message: "User registered successfully",
        user
      }))

    })

  } catch (error) {

    res.statusCode = 500

    res.setHeader("Content-Type", "application/json")

    res.end(JSON.stringify({
      success: false,
      error: "Registration failed"
    }))

  }

}

}

}