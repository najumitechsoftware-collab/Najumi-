export default {

/*
Application settings
*/

port: 3000,

app: {

name: "{{projectName}}",

type: "blog"

},

/*
Database configuration
*/

database: {

provider: "postgres",

url: process.env.DATABASE_URL

},

/*
Blog settings
*/

blog: {

postsPerPage: 10,

enableComments: false,

enableSearch: true

},

/*
Framework modules
*/

modules: [

],

/*
Framework plugins
*/

plugins: [

]

}