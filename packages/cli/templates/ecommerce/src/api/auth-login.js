/*
Authentication Login API
*/

const users = [

{
id: 1,
email: "admin@store.com",
password: "password123",
name: "Admin User"
}

]

/*
Login endpoint
*/
export async function POST(req, res) {

let body = ""

req.on("data", chunk => {

body += chunk.toString()

})

req.on("end", () => {

try {

  const data = JSON.parse(body)

  const { email, password } = data

  const user = users.find(u => u.email === email)

  if (!user || user.password !== password) {

    res.statusCode = 401

    res.setHeader("Content-Type", "application/json")

    res.end(JSON.stringify({
      success: false,
      error: "Invalid credentials"
    }))

    return

  }

  const session = {

    token: Date.now() + "-" + Math.random(),

    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }

  }

  res.setHeader("Content-Type", "application/json")

  res.end(JSON.stringify({
    success: true,
    session
  }))

} catch (error) {

  res.statusCode = 400

  res.end(JSON.stringify({
    success: false,
    error: "Invalid request"
  }))

}

})

}