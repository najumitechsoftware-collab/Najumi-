{{projectName}}

This project was created using the Najumi.js API Starter Template.

Najumi.js is a modern full-stack framework designed for building scalable, secure and high-performance applications.
This template provides a minimal backend API server ready for development.

---

Getting Started

Follow these steps to start your API server.

Start Development Server

Run the development server:

najumi dev

The server will start and listen on:

http://localhost:3000

---

Example API Endpoint

This template includes an example API route.

Try opening the following endpoint in your browser or API client:

GET /api/hello

Example request:

http://localhost:3000/api/hello

Example response:

{
  "message": "Hello from Najumi API",
  "framework": "Najumi.js",
  "success": true
}

You can modify this route inside:

src/api/hello.js

---

Project Structure

The API template uses the following structure:

src
 ├ api
 │  └ hello.js        → Example API route
 │
 ├ services           → Business logic services
 │
 └ index.js           → Application entry point

najumi.config.js      → Najumi configuration

.env.example          → Environment configuration example

---

Creating New API Routes

You can add new API routes inside:

src/api

Example:

src/api/users.js

Example route:

export default {

  path: "/users",

  handlers: {

    async GET(req, res) {

      res.end(JSON.stringify({
        users: []
      }))

    }

  }

}

This route will be available at:

GET /api/users

---

Environment Configuration

Create an environment file from the example template:

cp .env.example .env

Edit the ".env" file to configure:

- database connection
- authentication secrets
- external services

---

Production Build

To build the API server for production:

najumi build

Then start the production server:

najumi start

---

Next Steps

Start building your API by:

- adding new routes in "src/api"
- implementing services in "src/services"
- connecting your database using Najumi Atlas

---

Built with Najumi.js

This API is powered by the Najumi ecosystem:

- Najumi Atlas (Database system)
- Najumi Pulse (Caching engine)
- Najumi Orbit (Queue system)
- Najumi Harbor (Storage system)
- Najumi Vault (Secret management)

---

License

MIT License

---

Najumi Tech

Najumi.js is developed by Najumi Tech.
Our mission is to build powerful tools for the next generation of software development.