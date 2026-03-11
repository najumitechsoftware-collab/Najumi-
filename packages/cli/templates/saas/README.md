{{projectName}}

This project was created using the Najumi.js SaaS Starter Template.

Najumi.js is a modern full-stack framework designed for building scalable, secure and high-performance applications.

This template provides a complete starting point for building a SaaS platform, including:

- authentication system
- dashboard interface
- API endpoints
- service layer
- database-ready architecture

---

Getting Started

After creating your SaaS project, navigate into the project directory:

cd {{projectName}}

Start the development server:

najumi dev

The application will be available at:

http://localhost:3000

---

Project Structure

The SaaS template includes a clean architecture designed for scalable applications.

public
 └ index.html

src
 ├ pages
 │  ├ index.js
 │  └ dashboard.js
 │
 ├ api
 │  ├ auth-register.js
 │  └ auth-login.js
 │
 ├ services
 │  └ user-service.js

najumi.config.js
.env.example

---

Authentication

The template includes basic authentication endpoints.

Register user

POST /api/register

Example request:

{
  "email": "user@example.com",
  "password": "123456"
}

---

Login user

POST /api/login

Example response:

{
  "success": true,
  "token": "example-token",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}

---

Dashboard

The template includes a simple dashboard interface.

/dashboard

This page can be extended to include:

- analytics
- billing
- account settings
- team management

---

Environment Configuration

Copy the example environment file:

cp .env.example .env

Update the configuration with your own values.

Important variables:

DATABASE_URL
JWT_SECRET
SESSION_SECRET

---

Production Build

To build your SaaS application:

najumi build

Start the production server:

najumi start

---

Next Steps

You can extend your SaaS platform by adding:

- database models using Najumi Atlas
- background jobs using Najumi Orbit
- caching with Najumi Pulse
- file storage using Najumi Harbor
- secrets management with Najumi Vault

---

Built with Najumi.js

This project uses the Najumi ecosystem:

- Najumi View (Frontend UI framework)
- Najumi Atlas (Database system)
- Najumi Harbor (Storage engine)
- Najumi Orbit (Queue system)
- Najumi Pulse (Caching engine)
- Najumi Vault (Secret management)

---

License

MIT License

---

Najumi Tech

Najumi.js is developed by Najumi Tech.

Our mission is to build powerful tools for the next generation of software development.