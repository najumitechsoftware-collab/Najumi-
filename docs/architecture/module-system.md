Module System

The Module System is one of the most important architectural concepts in Najumi.js.

It provides a structured way to organize application logic by dividing large systems into smaller independent units called modules.

This design helps developers build scalable and maintainable applications.

---

What is a Module?

A module is a self-contained part of an application that focuses on a specific feature or domain.

Instead of placing all logic in a single location, developers can organize their code into modules that handle specific responsibilities.

Examples of modules might include:

- user management
- authentication
- payments
- notifications
- content management

Each module can contain its own logic, routes, services and models.

---

Why Modules Matter

As applications grow, managing all code in a single structure becomes difficult.

The module system solves this problem by allowing applications to be divided into logical components.

Benefits of the module system include:

- better organization
- easier maintenance
- improved scalability
- clearer separation of concerns

Developers can work on different modules without interfering with other parts of the application.

---

Example Module Structure

A typical Najumi application may contain a modules directory.

Example:

modules
│
├ user
│   ├ api
│   ├ services
│   ├ models
│   └ jobs
│
├ payments
│   ├ api
│   ├ services
│   └ models
│
└ notifications
    ├ services
    └ jobs

Each folder represents a module that contains logic related to a specific part of the application.

---

Module Responsibilities

A module can contain several types of components depending on its purpose.

Common module components include:

API Routes
These handle incoming HTTP requests.

Services
These contain business logic.

Models
These represent database structures.

Jobs
These handle background tasks.

Events
These respond to system events.

By grouping related logic together, modules help maintain a clean and scalable architecture.

---

Module Loading

During application startup, the Najumi Core Engine scans the modules directory and loads available modules.

The framework prepares each module so that it can register its functionality with the runtime environment.

Examples of module initialization tasks include:

- registering API routes
- initializing services
- connecting models
- scheduling background jobs

Once modules are loaded, they become part of the application runtime.

---

Module Independence

One important design principle of the module system is independence.

Modules should avoid tightly coupling with each other.

Instead, modules interact through defined interfaces such as:

- services
- events
- shared runtime services

This allows developers to modify or replace modules without breaking the rest of the application.

---

Scaling with Modules

The module system makes it easier to scale large applications.

As new features are added, developers can simply create new modules without restructuring the entire project.

For example:

modules
│
├ auth
├ users
├ payments
├ analytics
└ messaging

Each module can evolve independently while still integrating with the rest of the application.

---

Module Lifecycle

Modules participate in the application lifecycle.

When the application starts:

1. The Core Engine loads the modules.
2. The Runtime System activates them.
3. Each module registers its functionality.

During execution, modules remain active and respond to requests, events and background jobs.

---

Relationship with Other Systems

The module system works closely with several other parts of the framework.

These include:

- Core Engine
- Runtime System
- API System
- Service Layer
- Database System (Atlas)
- Queue System (Orbit)

These systems provide the infrastructure that modules use to perform their tasks.

---

Best Practices

When building modules in Najumi.js, developers should follow a few best practices.

Keep modules focused on a single responsibility.

Avoid tightly coupling modules together.

Use services to encapsulate business logic.

Organize module files clearly to make the structure easy to understand.

These practices help keep large applications maintainable over time.

---

Summary

The Module System is a key part of the Najumi.js architecture.

It allows developers to organize complex applications into smaller independent units.

By structuring applications around modules, Najumi.js enables scalable development while maintaining clarity and maintainability.

---

Next Step

Now that you understand the Module System, the next step is to explore the CLI System, which provides the tools developers use to create and manage Najumi applications.

Next: CLI Overview