State Management

State management is responsible for handling application data that changes over time.

In modern frontend applications, many parts of the interface depend on shared data. When this data changes, the user interface must update automatically.

Najumi View provides a built-in state management system designed to be simple, reactive and efficient.

The goal of the state system is to allow developers to manage application data without introducing unnecessary complexity.

---

What is State?

State represents the current data used by the application.

Examples of state include:

- user authentication status
- application settings
- UI data such as counters or form values
- fetched data from APIs

Whenever the state changes, the user interface must reflect the updated data.

Najumi's state engine ensures that updates happen efficiently.

---

Local Component State

Each component can maintain its own local state.

Local state is useful when the data is only needed by a single component.

Example:

state() {
  return {
    count: 0
  }
}

The component can update its state using:

component.setState("count", component.getState("count") + 1)

When the state value changes, the component automatically re-renders.

---

Global State

Some application data must be shared across multiple components.

For example:

- logged-in user information
- theme settings
- global notifications
- application configuration

Najumi View allows developers to create global state stores that multiple components can access.

Example:

import { getState } from "najumi/view"

const state = getState()

state.set("user", {
  id: 1,
  name: "Amina"
})

Any component that subscribes to this state will receive updates when the value changes.

---

Subscribing to State

Components can subscribe to state values so they react automatically when data changes.

Example:

state.subscribe("user", (value) => {
  console.log("User updated:", value)
})

When the value of "user" changes, the subscriber function runs automatically.

This allows the interface to update without manually refreshing the page.

---

Batch Updates

Sometimes multiple state values need to be updated at once.

Najumi's state engine supports batch updates to avoid unnecessary rendering.

Example:

state.batch({
  user: { id: 1, name: "Amina" },
  theme: "dark"
})

Batch updates ensure that the application performs state updates efficiently.

---

Resetting State

The entire state store can be cleared when necessary.

Example:

state.reset()

This is useful in situations such as:

- user logout
- application restart
- resetting session data

---

State Performance

Najumi's state engine is designed to be lightweight and fast.

It focuses on:

- minimal memory overhead
- fast update propagation
- efficient subscriber notification

Because of this design, state updates remain fast even in large applications.

---

Best Practices

When working with application state, developers should follow several best practices.

Keep state structures simple.

Avoid storing unnecessary data.

Use local component state whenever possible.

Use global state only when data must be shared across multiple components.

Following these guidelines helps maintain predictable and maintainable applications.

---

Summary

State management is a core part of building interactive applications.

Najumi View provides a built-in state engine that allows developers to manage both local and global application data.

With reactive updates and efficient state handling, developers can build dynamic interfaces without adding unnecessary complexity.

---

Next Step

Now that you understand state management, the next step is to learn how layouts work in Najumi View.

Next: Layout System