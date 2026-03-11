API System

The API System in Najumi.js provides the foundation for building backend endpoints that handle client requests.

APIs allow applications to communicate with external systems, frontend interfaces and other services.

Using the API system, developers can define routes that respond to HTTP requests such as fetching data, creating records or performing actions within the application.

The Najumi API system is designed to be simple, secure and highly performant.

---

What is an API Route?

An API route is a server endpoint that responds to HTTP requests.

Each API route defines how the server should respond when a specific URL path is requested.

For example:

/api/users

This route may return a list of users stored in the database.

API routes are responsible for:

- receiving requests
- processing input data
- interacting with services or databases
- returning responses

---

Defining an API Route

API routes in Najumi are defined using the API engine.

Example:

import { createApiEngine } from "najumi/backend"

const api = createApiEngine()

api.api("/users", {

  GET(req, res) {

    res.json({
      message: "Users list"
    })

  }

})

In this example:

- the route path is "/users"
- the route handles a "GET" request
- the server returns a JSON response

---

Supported HTTP Methods

The API system supports standard HTTP methods used in RESTful APIs.

These include:

- GET
- POST
- PUT
- PATCH
- DELETE

Each method represents a different type of operation.

GET
Used for retrieving data.

POST
Used for creating new resources.

PUT
Used for replacing existing data.

PATCH
Used for partially updating data.

DELETE
Used for removing resources.

---

Request Object

Each API route receives a request object containing information about the incoming request.

The request object may include:

- request headers
- query parameters
- request body
- authentication information

Example usage:

GET(req, res) {

  const query = req.query

  res.json(query)

}

---

Response Object

The response object is used to send data back to the client.

Common response methods include:

res.json(data)
res.send(data)
res.status(200)

Example:

res.status(200).json({
  success: true
})

Responses are typically returned in JSON format for API communication.

---

Route Parameters

API routes can contain dynamic parameters.

Example route:

/api/users/:id

Example request:

/api/users/42

The value of "id" can be accessed inside the route handler.

Example:

GET(req, res) {

  const id = req.params.id

  res.json({ userId: id })

}

---

Query Parameters

Query parameters allow additional data to be sent with requests.

Example URL:

/api/users?page=1

Accessing query parameters:

const page = req.query.page

Query parameters are often used for filtering, pagination or sorting.

---

Error Handling

API routes should handle errors gracefully to ensure reliable application behavior.

Example:

GET(req, res) {

  try {

    const data = getUsers()

    res.json(data)

  } catch (error) {

    res.status(500).json({
      error: "Internal server error"
    })

  }

}

Proper error handling helps prevent unexpected server crashes.

---

API Security

The API system integrates with the framework's security layers.

Requests pass through:

- request validation
- authentication checks
- middleware security filters

These mechanisms help protect API endpoints from unauthorized access and malicious input.

---

API Performance

Najumi's API engine is optimized for performance.

It focuses on:

- fast route matching
- minimal overhead
- efficient request processing

This allows applications to handle high volumes of requests while maintaining responsiveness.

---

Summary

The API system provides the core interface for backend communication in Najumi.js.

By defining routes that handle HTTP requests, developers can build powerful server-side functionality that connects the frontend with application logic and data storage.

---

Next Step

Now that you understand how API routes work, the next step is to explore the service layer that handles business logic within the application.

Next: Service Layer