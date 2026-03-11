Service Layer

The Service Layer in Najumi.js is responsible for handling the core business logic of an application.

While API routes receive and respond to client requests, services contain the logic that processes data, interacts with databases and performs application operations.

Separating business logic into services helps keep the application architecture clean, organized and scalable.

---

Why Services Exist

In large applications, placing all logic directly inside API routes can quickly lead to complex and difficult-to-maintain code.

The service layer solves this problem by separating responsibilities.

API routes handle:

- request processing
- response generation
- request validation

Services handle:

- business logic
- data processing
- interactions with databases
- communication with external systems

This separation makes applications easier to maintain and expand.

---

Service Architecture

Services are designed as independent units that perform specific tasks within the application.

Examples of services include:

- user management services
- authentication services
- payment processing services
- notification services
- reporting services

Each service focuses on a single responsibility.

---

Creating a Service

Services are typically defined using the service engine.

Example:

import { createService } from "najumi/backend"

const userService = createService({

  async getUsers() {

    return [
      { id: 1, name: "Amina" },
      { id: 2, name: "Yusuf" }
    ]

  }

})

export default userService

This service provides a function that retrieves a list of users.

---

Using Services in API Routes

Services can be imported and used within API routes.

Example:

import userService from "../services/userService.js"

api.api("/users", {

  async GET(req, res) {

    const users = await userService.getUsers()

    res.json(users)

  }

})

In this example:

- the API route receives the request
- the service performs the business logic
- the result is returned to the client

---

Benefits of the Service Layer

Using services provides several advantages.

Better Code Organization
Business logic is separated from request handling.

Reusability
Services can be reused by multiple API routes or modules.

Scalability
Applications can grow without creating complex API route logic.

Maintainability
Services make it easier to update and test application logic.

---

Service Communication

Services may interact with other systems within the framework.

Common interactions include:

- database queries through Atlas
- caching through Pulse
- background jobs through Orbit
- file operations through Harbor
- secret access through Vault

These integrations allow services to perform complex application operations.

---

Dependency Injection

Najumi.js uses a runtime container to manage application services.

This container allows services to be registered and resolved automatically during application startup.

Dependency injection helps reduce tight coupling between services and improves testability.

---

Service Security

Services operate within the secure runtime environment of Najumi.js.

Security protections include:

- authentication validation
- access control checks
- secure secret management
- safe database access

These protections ensure that service operations remain secure.

---

Best Practices

When building services in Najumi.js, developers should follow several best practices.

Keep services focused on a single responsibility.

Avoid placing request handling logic inside services.

Reuse services across different modules when possible.

Write services in a way that makes them easy to test and maintain.

---

Summary

The service layer provides a structured way to organize business logic within Najumi applications.

By separating application logic from API routes, services help maintain a clean architecture that scales effectively as applications grow.

---

Next Step

Now that you understand the service layer, the next step is to explore the authentication system used to secure backend applications.

Next: Authentication System