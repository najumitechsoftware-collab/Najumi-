Build Command

The "build" command is used to generate a production-ready version of a Najumi.js application.

During development, applications run using the development server which focuses on speed and rapid feedback.

However, production environments require optimized code and a stable runtime environment.

The build command prepares the application for production deployment.

---

Basic Usage

To create a production build, run the following command inside your project directory:

najumi build

The build process compiles and prepares the application for production.

After the build process finishes, the output will be generated inside the "dist" directory.

Example:

dist
│
└ index.js

This folder contains the optimized server application that can be deployed.

---

What Happens During the Build

The build process performs several important tasks.

These include:

- scanning project files
- compiling application code
- optimizing assets
- generating production server files

The goal is to produce a clean and efficient build that runs reliably in production environments.

---

Build Output

After the build completes, the "dist" directory will contain the compiled application.

Example structure:

dist
│
├ index.js
└ assets

The "index.js" file acts as the main entry point for the production server.

---

Build Performance

Najumi.js is designed to generate builds quickly while maintaining high performance.

The build system focuses on:

- minimal overhead
- optimized code generation
- efficient file processing

This ensures that production builds are both fast to generate and efficient to run.

---

Running the Production Build

Once the build process is complete, the application can be started using the production server.

Run:

najumi start

This command launches the optimized server using the files generated in the "dist" directory.

---

When to Use the Build Command

The "build" command should be used when preparing an application for:

- production deployment
- staging environments
- performance testing

It ensures that the application runs using optimized code instead of development mode.

---

Development vs Build Mode

During development:

najumi dev

The application runs in development mode with hot reload and file watching.

During production:

najumi build
najumi start

The application runs using optimized production code.

---

Summary

The "build" command prepares a Najumi.js application for production.

It compiles the project, optimizes the code and generates the files required to run the application in a production environment.

---

Next Step

Now that you know how to create a production build, the next step is to learn how to run the production server.

Next: Start Command