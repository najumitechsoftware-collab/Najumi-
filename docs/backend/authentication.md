Authentication System

Authentication is responsible for verifying the identity of users or systems that attempt to access an application.

The Najumi.js authentication system provides multiple secure authentication strategies that developers can use to protect application resources.

Authentication ensures that only authorized users can access protected routes, services and data.

Najumi integrates authentication directly into the backend architecture, allowing developers to implement secure access control without relying on external libraries.

---

Authentication Strategies

Najumi.js supports multiple authentication methods to accommodate different types of applications.

These strategies include:

JWT Authentication
Session Authentication
API Key Authentication
OAuth Authentication

Developers can choose the authentication strategy that best fits their application requirements.

---

JWT Authentication

JWT (JSON Web Token) authentication is commonly used in modern APIs.

With this method, the server generates a signed token after a user successfully logs in.

The client includes this token in future requests to verify its identity.

Example token usage:

Authorization: Bearer <token>

The server verifies the token before granting access to protected resources.

JWT authentication is often used for:

- REST APIs
- mobile applications
- distributed systems

---

Session Authentication

Session authentication stores user login information on the server.

When a user logs in, the server creates a session and assigns a session identifier to the client.

This identifier is stored in a secure cookie.

Each request includes the session identifier, allowing the server to identify the user.

Session authentication is commonly used in:

- traditional web applications
- server-rendered applications
- dashboards and admin panels

---

API Key Authentication

API keys allow applications or services to authenticate themselves when interacting with backend APIs.

An API key is typically generated and assigned to a specific client or service.

Example:

x-api-key: YOUR_API_KEY

The server verifies the key before processing the request.

API keys are often used for:

- service integrations
- internal APIs
- third-party developer access

---

OAuth Authentication

OAuth allows applications to authenticate users through external identity providers.

Examples of OAuth providers include:

- Google
- Microsoft
- GitHub
- Apple

Using OAuth, users can sign in without creating a new account within the application.

The authentication process is handled by the external provider, and the application receives a verified identity.

---

Protecting Routes

Authentication can be applied to API routes to restrict access.

Example route protection:

api.api("/profile", {

  GET(req, res) {

    if (!req.user) {

      res.status(401).json({
        error: "Unauthorized"
      })

      return
    }

    res.json(req.user)

  }

})

If the request is not authenticated, the server returns an unauthorized response.

---

Authentication Middleware

Authentication logic can also be applied through middleware.

Middleware allows authentication checks to run before the request reaches the API route.

This ensures that protected routes remain secure.

Example workflow:

1. Request arrives at server
2. Authentication middleware verifies identity
3. Authorized request continues to API handler
4. Unauthorized request is rejected

---

Token Security

Security is critical when working with authentication tokens.

Najumi integrates several protections including:

- secure token signing
- token validation
- expiration checks
- protection against token tampering

These measures help ensure that authentication credentials cannot be easily abused.

---

Best Practices

Developers should follow several security best practices when implementing authentication.

Use secure token storage methods.

Always validate authentication credentials on the server.

Use HTTPS to protect authentication data during transmission.

Apply authentication checks to sensitive API routes.

Regularly rotate API keys and secrets.

---

Summary

The Najumi.js authentication system provides multiple secure strategies for verifying user and system identities.

By supporting JWT, sessions, API keys and OAuth integrations, Najumi allows developers to build secure applications across a wide range of use cases.

---

Next Step

Now that you understand authentication, the next step is to explore the database system used by the framework.

Next: Najumi Atlas Database System