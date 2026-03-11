export default {

/*
Application name
*/
name: "{{projectName}}",

/*
Server configuration
*/
server: {

port: {{port}},

host: "0.0.0.0"

},

/*
Environment
*/
environment: {

mode: "development"

},

/*
Module system
*/
modules: [

],

/*
Plugin system
*/
plugins: [

],

/*
Backend configuration
*/
backend: {

apiPrefix: "/api"

},

/*
Database configuration (Najumi Atlas)
*/
database: {

provider: "postgres",

url: process.env.DATABASE_URL

},

/*
Storage configuration (Najumi Harbor)
*/
storage: {

driver: "local",

path: "./storage"

},

/*
Cache configuration (Najumi Pulse)
*/
cache: {

driver: "memory"

},

/*
Queue configuration (Najumi Orbit)
*/
queue: {

driver: "memory"

},

/*
Security configuration
*/
security: {

cors: true,

rateLimit: true

}

}