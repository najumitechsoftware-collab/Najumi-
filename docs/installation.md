Installation

This guide will help you install Najumi.js and start building your first application.

The installation process is designed to be simple and fast so developers can start working immediately.

---

System Requirements

Before installing Najumi.js, ensure that your system meets the following requirements.

Node.js

Najumi.js requires Node.js version 20 or later.

You can verify your Node.js version by running:

node -v

If Node.js is not installed, download it from the official website:

https://nodejs.org

---

Package Manager

Najumi.js works with common JavaScript package managers such as:

- npm
- pnpm
- yarn

Most developers will use npm, which is included with Node.js.

You can check your npm version with:

npm -v

---

Installing the Najumi CLI

Najumi applications are created and managed using the Najumi CLI.

Install the CLI globally using npm:

npm install -g najumi

Once installed, verify the installation:

najumi --version

This command should display the installed CLI version.

---

Creating Your First Project

After installing the CLI, you can create a new Najumi application.

Run the following command:

najumi create app my-project

This command will generate a new project folder with the basic application structure.

Example:

my-project
│
├ src
├ modules
├ public
├ najumi.config.js
└ package.json

---

Entering the Project Directory

Navigate into the project folder:

cd my-project

---

Starting the Development Server

Najumi includes a development server designed for fast development workflows.

Start the development environment using:

najumi dev

Once the server starts, you will see a message similar to:

Najumi Dev Server Started
http://localhost:3000

Open your browser and visit:

http://localhost:3000

You should now see your Najumi application running.

---

Development Workflow

During development, Najumi automatically watches your project files.

When files are modified, the development server will reload the application automatically.

This allows developers to see changes instantly without restarting the server.

---

Building for Production

When your application is ready for deployment, create a production build.

Run:

najumi build

This command compiles the application and generates optimized files in the "dist" folder.

Example:

dist
│
└ index.js

---

Running the Production Server

After building the application, start the production server:

najumi start

This will launch the optimized server version of your application.

---

Next Steps

Now that Najumi.js is installed and running, the next step is to learn the project structure and understand how applications are organized.

Next: Quick Start