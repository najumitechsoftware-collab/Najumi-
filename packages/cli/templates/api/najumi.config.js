export default {

/*
Application name
*/
name: "{{projectName}}",

/*
Server configuration
*/
server: {

host: "0.0.0.0",

port: {{port}}

},

/*
Environment
*/
environment: {

mode: "development"

},

/*
Backend API configuration
*/
backend: {

apiPrefix: "/api",

jsonLimit: "1mb"

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
Database configuration (Najumi Atlas)
*/
database: {

provider: "postgres",

url: process.env.DATABASE_URL

},

/*
Authentication configuration
*/
auth: {

jwtSecret: process.env.JWT_SECRET,

sessionSecret: process.env.SESSION_SECRET

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
Logging
*/
logging: {

level: "info"

},

/*
Security configuration
*/
security: {

cors: true,

rateLimit: true

}

}