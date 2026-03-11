Architecture Overview

Najumi.js is designed using a modular architecture that allows different systems within the framework to work together efficiently while remaining independent.

This architecture enables developers to build scalable applications while keeping the internal structure of their projects organized and maintainable.

At its core, Najumi.js is composed of several integrated layers that form a complete full-stack development platform.

---

Core Layers of Najumi.js

The framework architecture can be understood as a set of layers working together.

Application
│
├ Frontend Layer (Najumi View)
├ Backend Layer (API & Services)
├ Data Layer (Atlas Database System)
├ Infrastructure Layer
│   ├ Storage (Harbor)
│   ├ Cache (Pulse)
│   ├ Queue System (Orbit)
│   └ Secrets Management (Vault)
│
└ Core Engine

Each layer is designed to handle a specific responsibility within the application.

---

Core Engine

The Core Engine is the foundation of the framework.

It is responsible for initializing the entire Najumi runtime environment.

Key responsibilities include:

- loading configuration
- initializing framework services
- starting the runtime environment
- loading modules
- managing lifecycle events

The Core Engine ensures that all framework systems are properly initialized before the application begins handling requests.

---

Runtime System

The Runtime System manages the execution environment of the application.

It provides:

- service container
- dependency injection
- module activation
- application context

The runtime allows different parts of the framework to communicate with each other while maintaining clear separation between components.

---

Module System

Najumi.js uses a modular system to organize applications.

Modules allow large applications to be divided into smaller independent units.

A module may contain:

- API routes
- services
- database models
- background jobs
- event handlers

Example module structure:

modules
│
└ user
   │
   ├ api
   ├ services
   ├ models
   └ jobs

This structure makes it easier to scale applications as they grow.

---

Frontend Layer (Najumi View)

The frontend layer is powered by Najumi View, the UI framework included with Najumi.js.

Najumi View provides:

- component system
- reactive state management
- layout engine
- hydration system
- routing system

These systems allow developers to build interactive user interfaces with high performance.

---

Backend Layer

The backend layer is responsible for handling server-side logic.

This includes:

- API routes
- business logic services
- authentication systems
- middleware pipelines

The backend layer works closely with the database system and other infrastructure services.

---

Database Layer (Atlas)

Najumi.js includes a built-in database system called Atlas.

Atlas provides a structured way to interact with databases while maintaining high performance.

Atlas supports multiple database connectors such as:

- PostgreSQL
- MySQL
- MongoDB

This allows developers to choose the database that best fits their application.

---

Storage Layer (Harbor)

The Harbor storage engine manages file storage and uploads.

Harbor provides a secure and scalable storage system capable of handling large file uploads and high volumes of stored files.

This system can be extended with different storage drivers depending on application needs.

---

Cache System (Pulse)

The Pulse cache engine is designed to improve application performance by reducing database load.

Pulse allows frequently used data to be stored temporarily so it can be retrieved quickly without repeatedly querying the database.

---

Queue System (Orbit)

The Orbit queue system handles background tasks.

Examples of background tasks include:

- sending emails
- processing uploaded files
- scheduled jobs
- asynchronous data processing

Orbit allows applications to perform heavy tasks without blocking the main server.

---

Secret Management (Vault)

The Vault system manages sensitive application data.

Vault securely stores:

- API keys
- authentication secrets
- database credentials
- environment variables

This ensures that sensitive data remains protected.

---

Development Server

Najumi.js includes a development server designed to improve developer productivity.

The development server provides:

- automatic file watching
- hot reload support
- fast request handling
- development diagnostics

This makes the development process faster and more efficient.

---

Production Server

For production environments, Najumi.js provides an optimized server runtime.

The production server is designed for:

- high performance
- stability
- scalability

Applications built with Najumi can be deployed to various server environments using this production runtime.

---

Why This Architecture Matters

The architecture of Najumi.js allows developers to build applications that are:

- scalable
- maintainable
- secure
- high performance

By integrating multiple systems into a unified framework, Najumi reduces complexity while providing powerful capabilities.

---

Next Step

Now that you understand the architecture of Najumi.js, the next step is to learn about the Core Engine.

Next: Core Engine