{{projectName}}

This project was created using the Najumi.js Dashboard Starter Template.

Najumi.js is a modern full-stack framework designed for building scalable, secure and high-performance applications.

This template provides a ready-to-use admin dashboard interface for building management systems and analytics panels.

---

Getting Started

After creating your dashboard project, navigate into the project directory:

cd {{projectName}}

Start the development server:

najumi dev

The dashboard will be available at:

http://localhost:3000

---

Project Structure

The dashboard template includes a modular architecture designed for scalability.

public
 └ index.html

src
 ├ pages
 │  ├ index.js
 │  ├ users.js
 │  └ analytics.js
 │
 ├ components
 │  ├ sidebar.js
 │  └ header.js
 │
 └ services
    └ dashboard-service.js

najumi.config.js
.env.example

---

Dashboard Pages

The template includes the following pages:

Dashboard

/

Displays system statistics and overview metrics.

---

Users

/users

User management page where administrators can view user accounts.

---

Analytics

/analytics

Displays application analytics and system metrics.

---

Components

The dashboard UI is built using reusable components.

Sidebar

Handles dashboard navigation.

src/components/sidebar.js

---

Header

Displays user info, notifications and logout actions.

src/components/header.js

---

Services Layer

Dashboard services handle data fetching and API communication.

src/services/dashboard-service.js

This layer is responsible for:

- retrieving analytics data
- loading users
- fetching dashboard metrics

---

Environment Configuration

Create an environment file from the example template:

cp .env.example .env

Edit the ".env" file to configure:

- API endpoints
- authentication secrets
- analytics settings

---

Production Build

To build the dashboard for production:

najumi build

Start the production server:

najumi start

---

Extending the Dashboard

You can extend the dashboard by adding:

- new pages inside "src/pages"
- new UI components inside "src/components"
- new services inside "src/services"

---

Built with Najumi.js

This dashboard uses the Najumi ecosystem:

- Najumi View (Frontend framework)
- Najumi Router (Routing system)
- Najumi State (State management)
- Najumi Security (Frontend protection)

---

License

MIT License

---

Najumi Tech

Najumi.js is developed by Najumi Tech.

Our mission is to build powerful tools for the next generation of software development.