require("dotenv/config")
const express = require("express")
const app = express()
const { graphqlHTTP } = require('express-graphql')
const port = process.env.PORT || 8800

require('./src/config/database.config')
require('./src/models')


const schema = require('./src/graphql/schema')
const root = require('./src/graphql/root')
const { checkAuthentication } = require("./src/helper/extra/local.functions")


const createContext = (req, res, next) => ({
    headers: req.headers,
})


app.use(
    '/graphql',
    graphqlHTTP((request) => ({
        schema: schema,
        rootValue: root,
        graphiql: true,
        context: createContext(request),
    }))
)


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})