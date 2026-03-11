/*
Najumi Blog Application Entry
*/

import initNavbar from "./components/navbar.js"
import initPostCard from "./components/post-card.js"

import initHomePage from "./pages/index.js"
import initPostPage from "./pages/post.js"

/*
Initialize components
*/

initNavbar()
initPostCard()

/*
Simple router
*/

function loadPage() {

const path = window.location.pathname

if (path === "/") {

initHomePage()

}

else if (path.startsWith("/post")) {

initPostPage()

}

}

/*
Listen navigation events
*/

window.addEventListener("najumi:navigate", loadPage)

/*
First page load
*/

loadPage()