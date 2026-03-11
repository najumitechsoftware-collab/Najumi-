Package Manager

Najumi.js includes a built-in package management system that allows developers to install, manage and update framework modules.

The package manager helps developers extend their applications by adding new functionality without manually configuring dependencies.

Using the package manager, developers can:

- install modules
- remove modules
- update modules
- search available packages
- view installed packages

This system helps maintain a clean and organized development environment.

---

Installing Packages

The "install" command is used to add a package or module to a Najumi application.

Example:

najumi install auth

This command downloads and installs the specified package and registers it within the project.

Installed packages may provide functionality such as:

- authentication systems
- database integrations
- UI components
- utility libraries

Once installed, the package becomes available within the application.

---

Removing Packages

If a package is no longer needed, it can be removed using the "remove" command.

Example:

najumi remove auth

This command removes the package and updates the project configuration accordingly.

Removing unused packages helps keep the application lightweight and maintainable.

---

Updating Packages

The "update" command is used to update installed packages to their latest versions.

Example:

najumi update

Updating packages ensures that applications benefit from improvements such as:

- bug fixes
- performance optimizations
- new features
- security updates

Regular updates are recommended to maintain a healthy project environment.

---

Searching Packages

Developers can search for available packages using the "search" command.

Example:

najumi search auth

This command searches the package registry and returns matching packages that can be installed in the project.

This makes it easier to discover extensions and tools built for the Najumi ecosystem.

---

Listing Installed Packages

To view the packages currently installed in a project, use the "list" command.

Example:

najumi list

This command displays all installed modules along with their versions.

Developers can quickly review the dependencies used by the application.

---

Package Registry

Najumi packages are distributed through a package registry.

The registry acts as a central location where developers can publish and share modules.

This allows the ecosystem to grow as more developers contribute tools and extensions.

Packages published to the registry can be discovered and installed by other developers using the CLI.

---

Why Package Management Matters

Package management allows developers to extend the capabilities of their applications without modifying the core framework.

This makes it possible to:

- add features quickly
- reuse existing solutions
- maintain a modular architecture
- keep applications flexible

A strong package ecosystem helps frameworks grow and become more powerful over time.

---

Summary

The Najumi Package Manager provides a simple way to manage modules and dependencies within a project.

Using commands such as "install", "remove", "update", "search" and "list", developers can easily control the packages used in their applications.

---

Next Step

Now that you understand how to manage packages and modules using the CLI, the next step is to explore the frontend system used to build user interfaces.

Next: Frontend Overview