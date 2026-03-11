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
Environment configuration
*/
environment: {

mode: "development"

},

/*
Backend configuration
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
Authentication configuration
*/
auth: {

jwtSecret: process.env.JWT_SECRET,

sessionSecret: process.env.SESSION_SECRET,

tokenExpiration: "7d"

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
Logging configuration
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