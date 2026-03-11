Frontend Router

The Najumi View Router is responsible for handling client-side navigation in a Najumi application.

It allows developers to build modern single-page applications (SPAs) where navigation between pages happens without full page reloads.

The router listens for URL changes and renders the correct page component based on the matched route.

This creates a fast and smooth user experience.

---

What is Client-Side Routing?

Client-side routing allows applications to update the page content without refreshing the entire browser page.

Instead of requesting a new page from the server each time a user navigates, the router dynamically updates the user interface.

This approach provides several benefits:

- faster navigation
- smoother user experience
- reduced server load
- improved application responsiveness

---

Defining Routes

Routes define how URLs map to specific components or pages.

Example route configuration:

import { createRouter } from "najumi/view"

const router = createRouter({

  routes: [

    {
      path: "/",
      component: "home-page"
    },

    {
      path: "/about",
      component: "about-page"
    },

    {
      path: "/profile",
      component: "profile-page"
    }

  ]

})

Each route contains:

- a URL path
- the component responsible for rendering that page

---

Starting the Router

Once routes are defined, the router must be initialized.

Example:

router.start()

This activates the routing system and begins listening for navigation events.

---

Navigation

Applications can navigate between routes programmatically.

Example:

router.navigate("/profile")

This updates the URL and renders the corresponding component.

Navigation happens instantly without reloading the page.

---

Link Navigation

Developers can also create navigation links inside templates.

Example:

<a href="/about" data-router-link>About</a>

The router intercepts these links and performs client-side navigation.

---

Route Parameters

Routes may include dynamic parameters.

Example:

{
  path: "/users/:id",
  component: "user-profile"
}

Example URL:

/users/42

The router extracts the parameter value and makes it available to the component.

---

Accessing Route Parameters

Inside a component, parameters can be accessed through the router context.

Example:

const userId = router.params.id

This allows components to render dynamic data based on the current route.

---

Route Guards

The router supports route guards to control access to certain pages.

For example, some pages may require authentication.

Example:

{
  path: "/dashboard",
  component: "dashboard-page",
  guard: "auth"
}

Route guards help enforce application security by preventing unauthorized access.

---

Nested Routes

Applications may contain nested routes for complex layouts.

Example:

{
  path: "/dashboard",
  component: "dashboard-layout",
  children: [

    {
      path: "analytics",
      component: "analytics-page"
    },

    {
      path: "settings",
      component: "settings-page"
    }

  ]

}

Nested routes help structure large applications while maintaining a clear navigation hierarchy.

---

Router Performance

The Najumi router is designed to be lightweight and efficient.

It focuses on:

- fast route matching
- minimal memory usage
- efficient DOM updates

This ensures that navigation remains fast even in large applications.

---

Summary

The Najumi View Router enables fast and dynamic client-side navigation.

By mapping URLs to components, it allows developers to build modern single-page applications with smooth transitions between pages.

---

Next Step

Now that you understand routing, the next step is to learn how application state is managed in Najumi View.

Next: State Management