/*
Orders API
*/

const orders = []

/*
Get all orders
*/
export async function GET(req, res) {

res.setHeader("Content-Type", "application/json")

res.end(JSON.stringify({
success: true,
orders
}))

}

/*
Create new order
*/
export async function POST(req, res) {

let body = ""

req.on("data", chunk => {

body += chunk.toString()

})

req.on("end", () => {

try {

  const data = JSON.parse(body)

  const order = {

    id: Date.now(),

    items: data.items || [],

    total: data.total || 0,

    customer: data.customer || {},

    createdAt: new Date().toISOString()

  }

  orders.push(order)

  res.setHeader("Content-Type", "application/json")

  res.end(JSON.stringify({
    success: true,
    order
  }))

} catch (error) {

  res.statusCode = 400

  res.end(JSON.stringify({
    success: false,
    error: "Invalid order data"
  }))

}

})

}