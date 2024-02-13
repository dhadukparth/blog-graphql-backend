const queryGraphSchema = `
    type Query {
        getUsers: userAllResponse
        getUser(username: String!): userDefaultResponse
    }
`
module.exports = queryGraphSchema