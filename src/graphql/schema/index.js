const { buildSchema } = require('graphql');
const queryGraphSchema = require('./query.schema');
const mutationGraphSchema = require('./mutation.schema');
const userSchema = require('./schemas/user.schema');
const authenticationSchema = require('./schemas/authentication.schema');
const contactSchema = require('./schemas/contact.schema');


const mainSchema = buildSchema(`
    ${userSchema}
    ${authenticationSchema}
    ${queryGraphSchema}
    ${mutationGraphSchema}
`);
// ${contactSchema}

module.exports = mainSchema;
