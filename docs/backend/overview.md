Backend Overview

The Najumi.js backend system provides the server-side infrastructure used to power modern applications.

It is designed to support scalable APIs, secure services and efficient data processing while maintaining a simple and developer-friendly architecture.

Unlike many frameworks that rely heavily on external tools, Najumi integrates multiple backend systems directly into the framework.

This unified architecture allows developers to build full-stack applications without assembling multiple independent tools.

---

Backend Philosophy

The backend architecture of Najumi.js is built around several core principles.

Security First
Security protections are integrated directly into the framework to reduce common vulnerabilities.

Performance-Oriented
The system is designed for fast request handling, efficient processing and optimized runtime performance.

Scalable Architecture
Applications can grow from small projects to large distributed systems without requiring major structural changes.

Developer Simplicity
Complex backend capabilities are exposed through simple and predictable APIs.

---

Core Backend Systems

The Najumi backend includes several integrated systems that work together to power applications.

These systems provide essential backend functionality while remaining modular and extensible.

---

API System

The API system allows developers to define HTTP endpoints that respond to client requests.

API routes can handle operations such as:

- fetching data
- creating resources
- updating records
- processing user actions

The API engine integrates directly with the routing system and middleware pipeline to provide efficient request handling.

---

Service Layer

The service layer contains the business logic of the application.

Services allow developers to organize complex application logic outside of API routes.

This separation improves maintainability and encourages a clean architecture.

Services may handle tasks such as:

- data processing
- authentication checks
- integrations with external systems
- background operations

---

Authentication System

Authentication is built directly into the backend architecture.

Najumi supports several authentication strategies including:

- JWT authentication
- session-based authentication
- API key authentication
- OAuth integration

These authentication methods help secure application endpoints and protect user data.

---

Database System (Najumi Atlas)

Najumi Atlas is the integrated database system of the framework.

It acts as a powerful abstraction layer for interacting with databases while maintaining high performance.

Atlas provides:

- database models
- query building
- connection management
- migration tools

It supports multiple database engines including relational and document databases.

---

Cache Engine (Pulse)

Najumi Pulse is the caching system used to improve application performance.

Caching helps reduce repeated computations and database queries by storing frequently accessed data.

The cache engine supports:

- in-memory caching
- distributed caching
- automatic cache invalidation

By reducing expensive operations, Pulse helps applications scale efficiently.

---

Queue System (Orbit)

Najumi Orbit handles background job processing.

Background jobs allow applications to perform tasks asynchronously without blocking incoming requests.

Examples of background tasks include:

- sending emails
- processing uploads
- generating reports
- running scheduled jobs

Orbit includes a job queue, worker system and retry mechanisms for reliable task processing.

---

Storage System (Harbor)

Najumi Harbor manages file storage and asset handling.

It allows applications to store and retrieve files such as:

- user uploads
- images
- documents
- generated assets

Harbor supports multiple storage drivers and is designed for high-performance file handling.

---

Secret Management (Vault)

Najumi Vault provides secure management of sensitive application data.

Secrets such as API keys, tokens and credentials are stored securely and accessed through controlled interfaces.

Vault helps prevent accidental exposure of sensitive information and ensures safe configuration management.

---

Request Lifecycle

When a request reaches a Najumi backend application, it passes through several stages.

1. The HTTP server receives the request.
2. Security layers validate the request.
3. Middleware processes the request.
4. The router determines the matching route.
5. The API handler or service processes the request.
6. A response is generated and returned to the client.

This structured flow ensures that requests are handled efficiently and securely.

---

Integration with Frontend

Najumi.js is designed as a full-stack framework.

The backend integrates directly with the frontend system, allowing frontend components to communicate easily with backend APIs.

This integration simplifies the development of full-stack applications.

---

Summary

The Najumi backend provides a complete server-side environment designed for security, performance and scalability.

By integrating APIs, services, authentication, databases, caching, job queues and storage systems into a single framework, Najumi enables developers to build powerful backend applications with minimal complexity.

---

Next Step

Now that you understand the overall backend architecture, the next step is to explore the API system used to build backend endpoints.

Next: API System