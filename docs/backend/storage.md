Storage System (Harbor)

Najumi Harbor is the storage engine used by the Najumi.js framework for managing files and assets.

Modern applications frequently need to store and retrieve files such as images, documents and user uploads. Managing these files efficiently requires a reliable storage system.

Harbor provides a unified interface for storing, retrieving and managing files within a Najumi application.

The storage system is designed to be secure, scalable and high-performance.

---

Why a Storage System is Needed

Many applications rely on file storage for essential functionality.

Examples include:

- user profile images
- uploaded documents
- application-generated files
- media assets
- backups and exports

Without a proper storage system, managing files can become complex and difficult to maintain.

Harbor simplifies file management while ensuring that file operations remain efficient and secure.

---

Harbor Architecture

The Harbor storage system is composed of several components that work together to manage file storage.

These components include:

Harbor Engine
The main engine responsible for coordinating file storage operations.

Upload Manager
Handles file upload processing and manages large uploads.

File Manager
Provides methods for accessing, organizing and retrieving stored files.

Security Layer
Applies security protections to ensure safe file handling.

Storage Drivers
Allow the storage system to work with different storage backends.

This modular architecture allows Harbor to support multiple storage environments.

---

File Uploads

Harbor allows applications to upload files through the upload manager.

Example:

const file = await harbor.upload(req.file)

The uploaded file is processed and stored using the configured storage driver.

The system automatically manages file metadata and storage paths.

---

Retrieving Files

Stored files can be retrieved using the file manager.

Example:

const file = await harbor.get("uploads/profile.png")

The storage system resolves the correct file location and returns the requested file.

---

File Management

Harbor provides utilities for managing stored files.

These operations include:

- listing files
- deleting files
- moving files
- organizing storage directories

Example deleting a file:

await harbor.delete("uploads/profile.png")

These tools allow developers to maintain organized storage structures.

---

Storage Drivers

Harbor supports multiple storage drivers, allowing applications to store files in different environments.

Examples of storage drivers include:

Local Storage
Files are stored on the application server.

Cloud Storage
Files may be stored on remote cloud storage services.

Custom Drivers
Developers can implement their own storage drivers for specialized storage systems.

This flexibility allows Harbor to adapt to different infrastructure environments.

---

Large File Uploads

Large file uploads can place significant strain on servers if not handled properly.

The Harbor upload manager supports efficient handling of large uploads by processing files in controlled streams.

This approach helps prevent memory overload while ensuring reliable upload processing.

---

Storage Security

File storage systems must be carefully secured to prevent abuse or unauthorized access.

Harbor includes multiple security protections including:

- file type validation
- upload size limits
- secure file path handling
- controlled file access

These protections help prevent common security risks such as malicious file uploads.

---

Storage Performance

Harbor is optimized for fast file operations.

The storage system focuses on:

- efficient file streaming
- minimal memory usage
- optimized file access operations

These optimizations allow Harbor to manage large numbers of files efficiently.

---

Storage Use Cases

The Harbor storage system can be used for many types of application functionality.

Common use cases include:

- user uploads
- document management
- image hosting
- media libraries
- data exports

By providing a flexible storage interface, Harbor supports a wide range of application requirements.

---

Summary

Najumi Harbor provides a secure and scalable file storage system for Najumi applications.

Through its modular architecture and flexible storage drivers, Harbor enables developers to manage files efficiently while maintaining strong security protections.

---

Next Step

Now that you understand how file storage works, the next step is to explore the secret management system used for protecting sensitive application data.

Next: Secret Management (Vault)