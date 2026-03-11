/*
Najumi API Application Entry Point
*/

import { bootNajumi } from "najumi"

/*
Start the application
*/
async function start() {

try {

await bootNajumi()

} catch (error) {

console.error("Failed to start Najumi application")

console.error(error)

process.exit(1)

}

}

start()