Core Engine

The Core Engine is the foundation of the Najumi.js framework.

It is responsible for initializing the framework and preparing the application runtime environment before any request is processed.

Every Najumi application starts by booting the Core Engine.

---

Purpose of the Core Engine

The Core Engine ensures that all internal systems of the framework are properly initialized.

Its responsibilities include:

- validating the runtime environment
- loading configuration files
- initializing lifecycle systems
- loading application modules
- starting the runtime environment

By performing these tasks during startup, the Core Engine guarantees that the application is ready to handle requests.

---

Boot Process

When a Najumi application starts, the framework executes a boot process.

This process initializes the entire system in a controlled sequence.

The boot process can be represented as:

Start Application
        │
        ▼
Environment Validation
        │
        ▼
Configuration Loading
        │
        ▼
Lifecycle Initialization
        │
        ▼
Module Loading
        │
        ▼
Runtime Startup

Each step prepares the framework for the next stage.

---

Environment Validation

The first step in the boot process is environment validation.

The framework checks that the runtime environment meets the required conditions.

Examples of validation include:

- Node.js version compatibility
- environment variables
- required configuration files

This ensures that the application does not start under invalid conditions.

---

Configuration Loading

After the environment is validated, Najumi loads the application configuration.

Configuration files allow developers to define important settings such as:

- server port
- database connections
- storage configuration
- environment settings

Example configuration file:

najumi.config.js

The configuration system makes it possible to adjust application behavior without modifying the framework itself.

---

Lifecycle Initialization

Najumi.js uses a lifecycle system to manage important stages of application execution.

Lifecycle events allow the framework and modules to perform actions during specific phases of the application startup.

Examples of lifecycle stages include:

- framework initialization
- module activation
- runtime startup

This structured lifecycle makes the system predictable and extensible.

---

Module Loading

Najumi applications can be organized into modules.

Modules allow developers to structure large applications into smaller, manageable components.

During the boot process, the Core Engine loads and prepares these modules.

Modules may contain:

- API routes
- services
- database models
- background jobs
- event handlers

Once loaded, modules become part of the application runtime.

---

Runtime Startup

The final stage of the boot process is starting the runtime system.

The runtime system provides the execution environment for the application.

This includes:

- service container
- dependency injection
- module execution
- application context

After the runtime starts, the application is fully initialized and ready to process requests.

---

Why the Core Engine Matters

The Core Engine provides structure and reliability to the framework.

Instead of allowing different parts of the system to initialize independently, the Core Engine coordinates the startup process.

This ensures that:

- systems start in the correct order
- dependencies are properly loaded
- the application runs in a stable environment

Without a structured boot process, complex applications can become difficult to maintain and debug.

---

Relationship with Other Systems

The Core Engine interacts closely with several other framework systems.

These include:

- Runtime System
- Module System
- CLI
- Development Server
- Production Server

Each of these systems relies on the Core Engine to initialize and configure them properly.

---

Summary

The Core Engine is the starting point of every Najumi application.

It is responsible for preparing the framework environment and ensuring that all internal systems are ready to run.

By managing the boot process and coordinating system initialization, the Core Engine provides a stable foundation for the entire framework.

---

Next Step

Now that you understand how the Core Engine initializes the framework, the next step is to explore the Runtime System.

Next: Runtime System