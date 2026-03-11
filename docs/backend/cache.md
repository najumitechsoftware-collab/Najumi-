Cache System (Pulse)

Najumi Pulse is the caching engine integrated into the Najumi.js backend system.

Caching is a technique used to store frequently accessed data in fast memory so that the application can retrieve it quickly without repeating expensive operations such as database queries or heavy computations.

By reducing the need to repeatedly process the same data, caching significantly improves application performance and scalability.

Najumi Pulse is designed to provide a fast, lightweight and flexible caching system for modern applications.

---

Why Caching is Important

In many applications, the same data is requested multiple times.

Examples include:

- frequently accessed database records
- application configuration data
- user session information
- API responses

Without caching, the application would repeatedly perform the same operations, increasing response times and server load.

Caching helps solve this problem by storing data in a temporary storage layer that can be accessed much faster than the original source.

---

Cache Architecture

The Pulse caching system is composed of several internal components that work together to manage cached data.

These components include:

Cache Manager
Responsible for managing cache entries and coordinating cache operations.

Memory Layer
Stores cached data in memory for extremely fast access.

Invalidation System
Ensures that outdated data is automatically removed or refreshed.

Distributed Layer
Allows cache data to be shared across multiple servers in distributed environments.

Together, these components create a powerful caching system capable of supporting both small applications and large distributed systems.

---

Basic Cache Usage

Applications can store values in the cache for quick retrieval.

Example storing data in the cache:

await pulse.set("users_list", users)

Retrieving cached data:

const users = await pulse.get("users_list")

If the value exists in the cache, the application can return the cached data immediately.

---

Cache Expiration

Cache entries may include expiration times.

This ensures that cached data does not remain outdated.

Example:

await pulse.set("users_list", users, {

  ttl: 60

})

In this example, the cached value will expire after 60 seconds.

Once expired, the data will be removed or refreshed.

---

Automatic Cache Invalidation

Pulse includes an automatic cache invalidation system.

When application data changes, the cache system can automatically invalidate affected cache entries.

For example:

- database updates
- record creation
- record deletion

Automatic invalidation ensures that cached data remains accurate while still providing performance benefits.

---

Distributed Caching

In large-scale applications, multiple servers may handle incoming requests.

Pulse supports distributed caching so that cached data can be shared across multiple instances of the application.

This allows:

- consistent cache behavior
- improved scalability
- reduced database load across distributed systems

---

Cache Performance

Pulse is optimized for high performance.

The caching engine focuses on:

- extremely fast memory access
- efficient cache lookup operations
- minimal processing overhead

This ensures that cache operations remain extremely fast even under heavy load.

---

Cache Use Cases

Caching can be applied in many different areas of an application.

Common use cases include:

- caching database query results
- caching API responses
- storing application configuration
- temporary storage for computation results

Using caching effectively can dramatically improve application performance.

---

Security Considerations

Cached data must be managed carefully to avoid exposing sensitive information.

Developers should follow best practices such as:

- avoiding caching sensitive user data
- limiting cache access to authorized components
- applying expiration policies to cached values

These practices help ensure that caching does not introduce security risks.

---

Summary

Najumi Pulse provides a powerful caching system designed to improve the performance of backend applications.

By storing frequently accessed data in fast memory and supporting automatic invalidation and distributed caching, Pulse helps applications scale efficiently while maintaining fast response times.

---

Next Step

Now that you understand the caching system, the next step is to explore the queue system used for background job processing.

Next: Queue System (Orbit)