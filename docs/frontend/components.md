Component System

Components are the fundamental building blocks of user interfaces in Najumi View.

A component represents a reusable part of the user interface that contains its own structure, behavior and state.

Using components allows developers to divide complex interfaces into smaller, manageable pieces. This makes applications easier to build, maintain and scale.

---

What is a Component?

A component is a self-contained unit of UI logic.

Each component typically contains:

- a template
- local state
- behavior or methods
- lifecycle hooks

Components can be reused across different parts of an application, helping developers avoid duplicating code.

---

Basic Component Example

A component in Najumi View can be defined using a simple object structure.

Example:

Najumi.component("counter", {

  state() {
    return {
      count: 0
    }
  },

  template: `
    <div>
      <h2>Counter</h2>
      <p>{{ count }}</p>
      <button onclick="increment">Increase</button>
    </div>
  `,

  mounted(component) {
    console.log("Component mounted")
  }

})

This component defines:

- local state ("count")
- a template
- lifecycle behavior

---

Mounting a Component

After registering a component, it can be mounted into the DOM.

Example:

Najumi.mount("counter", "#app")

This attaches the component to the element with the selector "#app".

Once mounted, the component becomes active and begins rendering its template.

---

Component State

Each component manages its own local state.

State values can be accessed and modified within the component instance.

Example:

component.setState("count", component.getState("count") + 1)

When state changes, the component automatically re-renders.

This reactive behavior keeps the user interface synchronized with application data.

---

Lifecycle Hooks

Components support lifecycle hooks that allow developers to run logic at specific stages of the component lifecycle.

Common lifecycle hooks include:

beforeMount
Called before the component is rendered.

mounted
Called after the component is inserted into the DOM.

beforeDestroy
Called before the component is removed.

Lifecycle hooks allow developers to perform tasks such as:

- loading data
- initializing services
- cleaning up resources

---

Component Templates

Component templates define the visual structure of the UI.

Templates are written using HTML-like syntax and can include dynamic values.

Example:

<h1>{{ title }}</h1>
<p>{{ description }}</p>

Dynamic expressions inside templates automatically update when the component state changes.

---

Component Reusability

Components are designed to be reusable across the application.

For example, a button component or navigation component can be used in multiple pages.

This reduces duplicated code and ensures consistent UI design.

---

Component Communication

Components may interact with other parts of the application through:

- shared state
- events
- services

These communication patterns help keep applications modular and organized.

---

Best Practices

When building components in Najumi View, developers should follow several best practices.

Keep components focused on a single responsibility.

Avoid overly complex components.

Reuse components whenever possible.

Organize components in a clear directory structure.

Following these practices helps maintain clean and scalable frontend code.

---

Summary

The component system is the foundation of the Najumi View frontend framework.

By organizing applications into reusable UI components, developers can build complex interfaces while maintaining clarity and scalability.

---

Next Step

Now that you understand components, the next step is to learn how routing works in the frontend system.

Next: Frontend Router