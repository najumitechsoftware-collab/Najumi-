Quick Start

This guide will help you create and run your first Najumi.js application.

The goal of this section is to get a working application running in just a few minutes.

---

Step 1: Create a New Project

Create a new Najumi project using the CLI.

Run the following command:

najumi create app my-app

This command will generate a new project folder with the basic application structure.

Example:

my-app
│
├ src
├ modules
├ public
├ najumi.config.js
└ package.json

---

Step 2: Enter the Project Folder

Navigate into the project directory:

cd my-app

---

Step 3: Start the Development Server

Start the Najumi development server:

najumi dev

After the server starts, you should see output similar to this:

Najumi Dev Server Started
http://localhost:3000
Hot Reload Enabled

Open your browser and visit:

http://localhost:3000

Your Najumi application is now running.

---

Step 4: Create Your First Page

Najumi applications organize pages inside the src/pages folder.

Create a new file:

src/pages/home.view

Example page:

<div>
  <h1>Welcome to Najumi.js</h1>
  <p>Your application is running.</p>
</div>

Save the file.

The development server will automatically reload the page.

Now visit:

http://localhost:3000/home

---

Step 5: Create a Component

Najumi View allows developers to build reusable components.

Create a component inside:

src/components/Counter.view

Example component:

<template>
  <button>{{count}}</button>
</template>

<script>
export default {
  state() {
    return { count: 0 }
  }
}
</script>

Components help organize UI into reusable pieces.

---

Step 6: Create an API Route

Najumi allows developers to build backend APIs inside the same project.

Create a new file:

src/api/hello.js

Example API:

export default function handler(req, res) {
  res.json({
    message: "Hello from Najumi API"
  })
}

Now open:

http://localhost:3000/api/hello

You should see the JSON response from the server.

---

Step 7: Build the Application

When your application is ready for deployment, create a production build.

Run:

najumi build

This command compiles your application into the dist folder.

---

Step 8: Run the Production Server

After building the application, start the production server:

najumi start

Your application will now run using the optimized production build.

---

What You Learned

In this quick start guide you learned how to:

- create a Najumi project
- run the development server
- create pages
- create components
- create API routes
- build and run a production server

These are the basic building blocks of a Najumi application.

---

Next Step

Now that you have created your first application, the next step is to understand how Najumi applications are structured.

Next: Architecture Overview