Create Command

The "create" command is used to generate a new Najumi.js application.

This command initializes a new project with the required structure and configuration so developers can begin building immediately.

---

Basic Usage

To create a new Najumi project, run the following command:

najumi create app my-project

This command will generate a new directory named "my-project" containing the basic application structure.

Example output:

my-project
│
├ src
├ modules
├ public
├ najumi.config.js
└ package.json

Once the project is created, you can enter the project folder and start the development server.

---

Project Structure

The "create" command generates a standard project structure designed for scalable applications.

Example structure:

my-project
│
├ src
│   ├ pages
│   ├ components
│   ├ api
│   └ services
│
├ modules
│
├ public
│
├ najumi.config.js
│
└ package.json

Each folder has a specific role within the application.

---

Source Directory

The "src" directory contains the main application code.

Typical contents include:

- pages
- components
- API routes
- services

This directory is where most development work takes place.

---

Modules Directory

The "modules" directory allows developers to organize complex applications into independent modules.

Modules can contain:

- APIs
- services
- models
- background jobs

This modular structure helps keep large applications organized.

---

Public Directory

The "public" directory stores static assets that are served directly by the server.

Examples include:

- images
- fonts
- static files
- public assets

Files placed in this directory are accessible without processing.

---

Configuration File

The "create" command generates a configuration file:

najumi.config.js

This file contains project configuration settings such as:

- server configuration
- database settings
- storage configuration
- environment options

Developers can modify this file to customize application behavior.

---

Package Configuration

The project also includes a "package.json" file.

This file manages project dependencies and scripts used during development.

It allows developers to install packages and manage project dependencies.

---

Starting the Project

After creating the project, navigate into the project directory:

cd my-project

Then start the development server:

najumi dev

This will launch the development environment and start the application.

---

Customizing the Project

After the project is created, developers can begin modifying the structure based on their application needs.

Typical next steps include:

- creating pages
- building components
- defining API routes
- creating services
- defining database models

The generated structure serves as a starting point for building scalable applications.

---

Summary

The "create" command is the first step when working with Najumi.js.

It generates a ready-to-use project structure and prepares the development environment so developers can begin building their applications immediately.

---

Next Step

Now that you know how to create a project, the next step is to learn how to start the development server.

Next: Dev Command