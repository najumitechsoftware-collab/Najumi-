Deployment Overview

Deployment is the process of preparing and running a Najumi.js application in a production environment.

After an application is developed and tested locally, it must be deployed to a server so that users can access it.

Najumi.js is designed to support flexible deployment strategies, allowing applications to run on different types of infrastructure including cloud platforms, virtual servers and container environments.

The framework provides a production-ready runtime that ensures applications remain stable, secure and scalable.

---

Development vs Production

During development, applications run using the development server.

Example:

najumi dev

The development server focuses on developer experience and includes features such as:

- file watching
- hot reload
- debugging tools

However, production environments require optimized and stable application execution.

Before deploying an application, it must be built using the production build system.

Example:

najumi build

This command generates an optimized production version of the application.

---

Production Deployment Workflow

A typical Najumi deployment process follows these steps.

1. Build the application

najumi build

2. Transfer the project to a production server.

3. Install dependencies if required.

4. Start the production server.

najumi start

Once started, the application will begin listening for incoming requests.

---

Production Server Environment

Najumi applications can run on many different types of server environments.

Common deployment environments include:

Virtual Private Servers
Dedicated application servers running Linux or other operating systems.

Cloud Platforms
Applications can be deployed to cloud infrastructure providers.

Container Platforms
Applications can run inside containers using technologies such as Docker.

Platform-as-a-Service Systems
Some hosting platforms provide managed environments for running web applications.

The flexibility of the Najumi runtime allows developers to choose the infrastructure that best fits their needs.

---

Application Configuration

Production environments often require different configuration settings than development environments.

These configurations are usually stored in environment variables.

Examples include:

- database connection strings
- API keys
- secret tokens
- external service endpoints

The Najumi Vault system securely loads these values during application startup.

---

Storage Configuration

Applications often require file storage for user uploads and application assets.

Najumi Harbor provides a unified interface for managing file storage.

Harbor supports multiple storage backends including:

Local Storage
Files stored directly on the application server.

Cloud Storage
Files stored using external storage services.

Custom Storage Drivers
Developers may implement their own storage systems.

This flexibility allows applications to adapt to different infrastructure environments.

---

Scaling Applications

As application traffic increases, additional infrastructure may be required.

Scaling strategies may include:

Running multiple application instances
Using load balancers to distribute traffic
Separating background workers from web servers
Using distributed caching systems

The modular architecture of Najumi.js allows applications to scale as demand grows.

---

Monitoring and Logging

Production applications should include monitoring and logging systems to track performance and detect issues.

Monitoring tools can track:

- server health
- application performance
- error rates
- resource usage

Logging systems help developers diagnose and resolve production issues quickly.

---

Security in Production

Security is especially important in production environments.

Developers should ensure that production deployments follow security best practices such as:

- using HTTPS connections
- protecting environment variables
- restricting server access
- rotating credentials regularly

Najumi integrates several security layers that help protect applications from common threats.

---

Summary

Deployment is the final step in making a Najumi application available to users.

By building the application, configuring the production environment and starting the optimized server runtime, developers can run stable and scalable applications in real-world environments.

---

Next Step

Now that you understand how deployment works, the next step is to explore advanced scaling and infrastructure strategies for large applications.

Next: Scaling Applications