Frontend Overview

Najumi.js includes a modern frontend framework called Najumi View.

Najumi View is designed to help developers build fast, secure and scalable user interfaces using a simple and powerful component architecture.

Unlike many traditional frontend frameworks, Najumi View is designed as part of the Najumi full-stack ecosystem. This allows frontend and backend systems to work together seamlessly within a unified architecture.

The goal of Najumi View is to provide a developer experience that is:

- simple to learn
- extremely fast
- secure by design
- scalable for large applications

---

What is Najumi View?

Najumi View is the user interface layer of the Najumi framework.

It allows developers to build interactive applications using components, reactive state management and a fast rendering engine.

Najumi View focuses on performance and simplicity while maintaining strong security protections for browser environments.

Applications built using Najumi View can run in modern browsers without requiring complex configuration.

---

Core Principles

The frontend system of Najumi.js follows several core principles.

Performance First

Najumi View is built with performance as a top priority.

The rendering engine is optimized to minimize unnecessary DOM operations and ensure fast updates when application state changes.

This allows applications to remain responsive even as they grow in complexity.

---

Security First

Security is deeply integrated into the frontend architecture.

Najumi View includes built-in protections such as:

- DOM sanitization
- secure template rendering
- controlled event delegation
- protection against common browser injection attacks

These protections help developers build safer applications by default.

---

Component-Based Architecture

Applications built with Najumi View are composed of reusable components.

A component represents a part of the user interface and contains:

- a template
- local state
- lifecycle behavior

By splitting the interface into components, applications remain organized and easier to maintain.

---

Core Systems

Najumi View is composed of several internal systems that work together to power the frontend framework.

These systems include:

View Engine
Responsible for initializing and managing the frontend application.

Render Engine
Handles efficient rendering of templates into the DOM.

Component System
Manages component registration, mounting and lifecycle behavior.

Router System
Handles client-side navigation and route matching.

State Engine
Provides reactive state management across components.

Layout System
Allows developers to define reusable layout structures for applications.

Hydration Engine
Connects server-rendered HTML with interactive client-side behavior.

Each of these systems works together to create a fast and scalable frontend environment.

---

Rendering Model

Najumi View uses an optimized rendering pipeline designed to reduce unnecessary DOM updates.

When application state changes, the framework calculates what needs to be updated and applies only the required changes.

This approach helps maintain high performance while keeping the code simple and predictable.

---

Application Structure

A typical Najumi frontend application may include the following structure:

src
│
├ pages
├ components
├ layouts
├ state
└ router

Pages define application routes.

Components define reusable UI elements.

Layouts define shared page structures.

State manages reactive data across the application.

Router controls navigation between views.

This structure helps developers organize their frontend applications clearly.

---

Integration with Backend

One of the major advantages of Najumi View is its seamless integration with the backend system.

Frontend components can interact directly with:

- API routes
- backend services
- authentication systems
- database APIs

Because the entire framework is built as a unified ecosystem, frontend and backend systems can communicate efficiently without complex configuration.

---

Why Najumi View Exists

Many frontend frameworks focus only on the client side and require additional tools to integrate with backend systems.

Najumi View is designed differently.

It is built as part of the full Najumi architecture, allowing developers to build complete applications using a single integrated framework.

This approach simplifies development while maintaining flexibility for large-scale applications.

---

Summary

Najumi View provides the frontend foundation for building modern user interfaces within the Najumi ecosystem.

It combines high performance rendering, strong security protections and a component-based architecture to help developers build scalable and maintainable applications.

---

Next Step

Now that you understand the basics of the frontend system, the next step is to explore how components work in Najumi View.

Next: Component System