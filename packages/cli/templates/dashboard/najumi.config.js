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
Frontend configuration
*/
frontend: {

framework: "najumi-view",

mountElement: "#app"

},

/*
Modules system
*/
modules: [

],

/*
Plugins system
*/
plugins: [

],

/*
Dashboard configuration
*/
dashboard: {

title: "{{projectName}} Dashboard",

sidebar: true,

analytics: true

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