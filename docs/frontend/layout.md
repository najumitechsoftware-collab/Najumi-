Layout System

The Layout System in Najumi View allows developers to define reusable page structures that can be shared across multiple pages.

Layouts help maintain consistent user interface structure across an application while avoiding duplicated code.

Common examples of layout structures include:

- navigation bars
- side menus
- page headers
- page footers
- dashboard containers

By using layouts, developers can build large applications with a consistent design.

---

What is a Layout?

A layout is a reusable page structure that wraps around page components.

Instead of repeating the same page structure across different pages, developers can define the structure once and reuse it.

For example, a dashboard layout might include:

- a sidebar navigation
- a header
- a content area

Each page inside the dashboard would be rendered inside that layout.

---

Basic Layout Example

Example layout definition:

Najumi.layout("main-layout", {

  template: `
    <div class="layout">

      <header>
        <h1>My Application</h1>
      </header>

      <main id="layout-content"></main>

      <footer>
        © Application
      </footer>

    </div>
  `

})

This layout defines the main structure of the page.

The actual page content will be rendered inside the "layout-content" area.

---

Using Layouts with Pages

Pages can specify which layout they use.

Example:

Najumi.page("home-page", {

  layout: "main-layout",

  template: `
    <div>
      <h2>Home Page</h2>
      <p>Welcome to the application.</p>
    </div>
  `

})

When the page is rendered, the page content will automatically appear inside the layout.

---

Nested Layouts

Large applications may require multiple layout levels.

Najumi View supports nested layouts, allowing layouts to contain other layouts.

Example structure:

layouts
│
├ main-layout
│
└ dashboard-layout

A dashboard layout may include additional components such as:

- sidebar navigation
- dashboard header
- content panels

This helps organize complex applications.

---

Layout Rendering

When a page is requested, the framework resolves the layout hierarchy and renders the layout before inserting the page component.

Rendering flow:

1. Router matches the requested page.
2. The framework checks the layout assigned to the page.
3. The layout is rendered.
4. The page content is injected into the layout.

This process ensures consistent page structures across the application.

---

Layout Performance

Najumi's layout engine is optimized for performance.

It focuses on:

- minimal DOM updates
- efficient layout resolution
- lightweight rendering logic

Because layouts are reused, the framework avoids unnecessary DOM reconstruction.

---

Layout Best Practices

When building layouts, developers should follow several best practices.

Keep layouts focused on structure rather than business logic.

Avoid placing heavy logic inside layout templates.

Use layouts only for shared UI structures.

Create separate layouts for different parts of the application such as dashboards or public pages.

Following these guidelines keeps the application architecture clean and scalable.

---

Summary

Layouts provide a way to create reusable page structures in Najumi View.

By defining layouts once and reusing them across multiple pages, developers can maintain consistent UI design while keeping their code organized.

---

Next Step

Now that you understand how layouts work, the next step is to learn about hydration, which connects server-rendered HTML with interactive client-side behavior.

Next: Hydration System