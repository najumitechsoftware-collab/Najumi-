CLI Overview

The Najumi Command Line Interface (CLI) is the primary tool developers use to create, manage and run Najumi.js applications.

The CLI simplifies common development tasks and provides a consistent interface for interacting with the framework.

Using the CLI, developers can:

- create new applications
- start development servers
- build production versions
- run production servers
- manage packages and modules

The CLI is designed to make development with Najumi.js simple and efficient.

---

Why the CLI Exists

Modern frameworks rely on command-line tools to automate repetitive tasks.

Instead of manually configuring projects, developers can run a few commands to generate a working application structure.

The Najumi CLI helps developers:

- start projects quickly
- manage development workflows
- automate build processes
- run production environments

This allows developers to focus on building features rather than configuring tools.

---

Installing the CLI

The Najumi CLI can be installed globally using npm.

Example:

npm install -g najumi

Once installed, developers can run the CLI using the "najumi" command.

To verify installation:

najumi --version

---

Basic CLI Commands

The CLI provides several commands used throughout the development lifecycle.

Common commands include:

najumi create
najumi dev
najumi build
najumi start

Each command serves a specific purpose during development.

---

Creating Applications

The "create" command generates a new Najumi application.

Example:

najumi create app my-project

This command generates a project structure including:

- source directory
- modules directory
- configuration files
- project dependencies

Developers can immediately begin building their application after project creation.

---

Development Server

The "dev" command starts the development environment.

Example:

najumi dev

The development server includes:

- automatic file watching
- hot reload support
- fast request handling
- development diagnostics

This allows developers to see changes instantly while working on their code.

---

Building Applications

The "build" command prepares the application for production.

Example:

najumi build

This process compiles the application and generates optimized output in the "dist" folder.

Production builds include:

- optimized code
- compiled assets
- production-ready server files

---

Running Production Server

After building the application, developers can start the production server.

Example:

najumi start

This command runs the compiled application using the optimized runtime environment.

Production servers are designed for:

- stability
- performance
- scalability

---

Extending the CLI

The Najumi CLI is designed to be extensible.

Future versions may include additional commands for:

- package management
- deployment automation
- module generation
- project scaffolding

This flexibility allows the CLI to evolve as the framework grows.

---

Summary

The CLI is an essential part of the Najumi.js developer experience.

It simplifies project creation, development workflows and deployment preparation.

By providing a consistent set of commands, the CLI helps developers interact with the framework efficiently.

---

Next Step

Now that you understand how the CLI works, the next step is to learn how to create applications using the CLI.

Next: Create Command