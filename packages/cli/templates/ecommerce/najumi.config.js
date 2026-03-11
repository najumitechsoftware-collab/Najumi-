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
Ecommerce configuration
*/
ecommerce: {

currency: "USD",

cart: {

  enabled: true

},

checkout: {

  enabled: true

}

},

/*
Backend API configuration
*/
backend: {

apiPrefix: "/api"

},

/*
Modules
*/
modules: [

],

/*
Plugins
*/
plugins: [

],

/*
Logging
*/
logging: {

level: "info"

},

/*
Security
*/
security: {

cors: true,

rateLimit: true

}

}