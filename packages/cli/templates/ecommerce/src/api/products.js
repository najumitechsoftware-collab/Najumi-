/*
Products API
*/

export async function GET(req, res) {

const products = [

{
  id: 1,
  name: "Product One",
  price: 29,
  description: "Example ecommerce product"
},

{
  id: 2,
  name: "Product Two",
  price: 49,
  description: "Example ecommerce product"
},

{
  id: 3,
  name: "Product Three",
  price: 19,
  description: "Example ecommerce product"
}

]

res.setHeader("Content-Type", "application/json")

res.end(JSON.stringify(products))

}