Database System (Najumi Atlas)

Najumi Atlas is the database system integrated into the Najumi.js framework.

It provides a powerful and flexible way for developers to interact with databases while maintaining high performance and a clean architecture.

Atlas acts as a bridge between the application and the underlying database engine. It simplifies database interactions while preserving the efficiency of native database operations.

The system is designed to support modern applications that require scalable data management.

---

Why Najumi Atlas Exists

Many frameworks rely on external database tools that require complex configuration and additional dependencies.

Najumi Atlas was designed to provide a unified and integrated database experience inside the framework.

The goals of Atlas include:

- simplifying database interactions
- maintaining strong performance
- providing flexible database support
- enabling scalable data architecture

By integrating the database system directly into the framework, developers can build data-driven applications more efficiently.

---

Supported Databases

Najumi Atlas supports multiple database engines through connector drivers.

Currently supported database types include:

- PostgreSQL
- MySQL
- MongoDB

This flexibility allows developers to choose the database system that best fits their application.

Each database connector provides optimized communication with the underlying database engine.

---

Database Models

Models represent structured data within the application.

A model defines the shape of a database entity such as a user, product or order.

Example model definition:

export default {

  name: "User",

  fields: {

    id: "number",
    name: "string",
    email: "string",
    created_at: "date"

  }

}

Models help standardize how data is structured and accessed within the application.

---

Query Engine

Atlas includes a powerful query engine that allows developers to interact with database models.

Example query:

const users = await atlas.model("User").find()

Example creating a record:

await atlas.model("User").create({

  name: "Amina",
  email: "amina@example.com"

})

The query engine provides a clean API for performing database operations.

---

Database Connections

Atlas manages database connections automatically.

During application startup, the database system initializes the connection using the configuration provided in the project settings.

Example configuration:

export default {

  database: {

    provider: "postgres",
    url: process.env.DATABASE_URL

  }

}

This configuration allows the application to connect securely to the database.

---

Migration System

The migration system allows developers to manage database schema changes over time.

Migrations help ensure that the database structure stays synchronized with the application code.

Typical migration tasks include:

- creating tables
- modifying fields
- updating indexes
- removing outdated structures

Using migrations allows teams to evolve database schemas safely.

---

Query Performance

Atlas is designed with performance in mind.

The query engine focuses on:

- efficient query generation
- optimized database communication
- minimal overhead

This ensures that applications remain responsive even when handling large datasets.

---

Security Considerations

Database access must be carefully controlled to prevent security vulnerabilities.

Atlas includes protections such as:

- parameterized queries
- safe query execution
- controlled connection management

These measures help protect applications from common database security risks such as injection attacks.

---

Integration with Backend Systems

The database system integrates with other backend components including:

- API routes
- service layer
- caching system
- authentication services

This allows developers to build powerful data-driven applications using a consistent architecture.

---

Summary

Najumi Atlas provides a powerful and flexible database system for Najumi applications.

By supporting multiple database engines and offering a clean query interface, Atlas allows developers to manage application data efficiently while maintaining high performance and scalability.

---

Next Step

Now that you understand the database system, the next step is to explore the caching system used to improve application performance.

Next: Cache System (Pulse)