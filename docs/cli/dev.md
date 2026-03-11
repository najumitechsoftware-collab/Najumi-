Dev Command

The "dev" command starts the Najumi.js development server.

This command launches a local server that allows developers to build and test their applications during development.

The development server is optimized for fast feedback and includes features such as file watching and hot reload.

---

Basic Usage

To start the development server, run:

najumi dev

This command starts the application in development mode.

Example output:

🚀 Najumi Dev Server Started
🌐 http://localhost:3000
🔥 Hot Reload Enabled

Once the server starts, open your browser and navigate to:

http://localhost:3000

Your Najumi application will be running locally.

---

Development Server Features

The development server includes several features designed to improve the developer experience.

These include:

File Watching
The server automatically watches project files for changes.

Hot Reload
When files are updated, the server reloads the application automatically.

Fast Startup
The development server is optimized to start quickly so developers can begin working immediately.

Error Reporting
Errors during development are displayed in the terminal to help developers debug issues.

---

Automatic Reloading

Najumi automatically detects changes to files in important directories such as:

src/
modules/
public/

When a file changes, the development server reloads the application.

This allows developers to see the results of their changes instantly.

---

Development Workflow

A typical development workflow looks like this:

1. Start the development server.

najumi dev

2. Edit application files.

3. Save changes.

4. The server reloads automatically.

5. Refresh the browser if needed.

This rapid feedback cycle helps developers build applications faster.

---

Using the Development Server

While the development server is running, developers can work on:

- pages
- components
- API routes
- services
- modules

Changes will be reflected immediately without restarting the server.

---

Stopping the Development Server

To stop the development server, press:

Ctrl + C

This will terminate the running process.

---

Development vs Production

The development server is intended only for development.

It provides tools that improve developer productivity, but it is not optimized for production environments.

For production deployments, applications should be built using:

najumi build

Then started using:

najumi start

---

Summary

The "dev" command is used to start the Najumi development server.

It provides a fast development environment with automatic file watching and hot reload, allowing developers to build applications efficiently.

---

Next Step

Now that you know how to run the development server, the next step is to learn how to create production builds.

Next: Build Command