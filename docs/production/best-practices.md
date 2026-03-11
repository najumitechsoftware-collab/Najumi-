Production Best Practices

Building applications for production environments requires careful planning and disciplined engineering practices.

While Najumi.js provides powerful tools for building scalable and secure applications, developers must also follow best practices to ensure that applications remain stable, secure and performant in real-world environments.

This guide outlines recommended practices for running Najumi applications in production.

---

Secure Configuration

Production systems must protect sensitive configuration data.

Developers should never store secrets directly in application source code.

Instead, sensitive values should be stored using environment variables and accessed through the Vault system.

Examples of secrets include:

- database credentials
- API tokens
- encryption keys
- third-party service credentials

Using Vault helps prevent accidental exposure of sensitive information.

---

Use Production Builds

Applications should always run using optimized production builds.

During development, the framework runs in development mode which includes debugging tools and development features.

Before deploying to production, the application must be built using:

najumi build

Then started with:

najumi start

Production builds remove unnecessary development features and optimize application performance.

---

Enable HTTPS

All production applications should use secure HTTPS connections.

HTTPS ensures that communication between users and servers is encrypted and protected from interception.

This is especially important for applications that handle sensitive user data.

---

Protect API Endpoints

Backend APIs should always enforce proper authentication and authorization.

Developers should ensure that sensitive routes require valid authentication tokens or session validation.

Using the built-in authentication system helps prevent unauthorized access to application resources.

---

Use Caching

Caching can significantly improve application performance.

Developers should cache frequently requested data such as:

- database queries
- configuration values
- API responses

Using the Pulse cache engine reduces database load and improves response times.

---

Process Heavy Tasks in Background Jobs

Long-running tasks should not block incoming requests.

Tasks such as:

- sending emails
- generating reports
- processing uploads

should be handled using the Orbit queue system.

This ensures that user requests remain fast while background tasks are processed asynchronously.

---

Monitor Application Performance

Monitoring production systems is critical for detecting issues early.

Developers should track metrics such as:

- server response times
- CPU usage
- memory usage
- error rates

Monitoring systems help teams identify bottlenecks and maintain stable system performance.

---

Logging

Production systems should include proper logging.

Logs provide insight into application behavior and help diagnose issues.

Important events to log include:

- errors
- authentication failures
- background job activity
- system warnings

Well-structured logs make troubleshooting easier.

---

Database Optimization

Database performance becomes increasingly important as applications grow.

Developers should ensure that database queries are optimized and properly indexed.

Using Atlas query tools and migration management helps maintain efficient database performance.

---

Horizontal Scaling

Production systems should be designed for horizontal scaling.

This means running multiple instances of the application and distributing traffic using load balancing.

Stateless application design allows multiple servers to handle requests without sharing memory state.

---

Secure File Handling

Applications that accept file uploads must carefully validate file content.

Developers should enforce:

- file size limits
- file type validation
- secure file storage

Harbor provides built-in protections that help secure file storage systems.

---

Regular Updates

Applications should be kept up to date with the latest security patches and framework updates.

Regular updates help ensure that applications benefit from improvements and security fixes.

---

Backup Strategies

Production systems must include reliable backup strategies.

Important data such as databases and uploaded files should be backed up regularly.

This ensures that systems can recover from unexpected failures.

---

Summary

Running a Najumi.js application in production requires attention to security, performance and reliability.

By following these best practices, developers can build applications that remain stable, scalable and secure under real-world conditions.