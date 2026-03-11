/*
Blog Posts API
*/

/*
Example in-memory posts
(developer can replace with database)
*/

const posts = [

{
id: 1,
title: "Welcome to Najumi.js",
excerpt: "Learn how to build modern applications using Najumi.",
content: "Najumi.js is a powerful full-stack framework designed for performance, scalability and developer simplicity.",
date: "2026-01-01"
},

{
id: 2,
title: "Building a Blog with Najumi",
excerpt: "Create fast and secure blog systems easily.",
content: "Using Najumi you can quickly build a blog with a modern architecture and strong security foundation.",
date: "2026-01-10"
},

{
id: 3,
title: "Why Najumi is Different",
excerpt: "Discover the philosophy behind Najumi.",
content: "Najumi focuses on developer experience, clean architecture and ultra-fast performance.",
date: "2026-02-01"
}

]

/*
GET /api/posts
Return all posts
*/

export async function GET(req, res) {

res.setHeader("Content-Type", "application/json")

res.end(JSON.stringify({
success: true,
posts
}))

}

/*
GET /api/posts?id=1
Return single post
*/

export async function POST(req, res) {

let body = ""

req.on("data", chunk => {

body += chunk.toString()

})

req.on("end", () => {

try {

  const data = JSON.parse(body)

  const id = Number(data.id)

  const post = posts.find(p => p.id === id)

  if (!post) {

    res.statusCode = 404

    res.end(JSON.stringify({
      success: false,
      error: "Post not found"
    }))

    return

  }

  res.setHeader("Content-Type", "application/json")

  res.end(JSON.stringify({
    success: true,
    post
  }))

}

catch (error) {

  res.statusCode = 400

  res.end(JSON.stringify({
    success: false,
    error: "Invalid request"
  }))

}

})

}