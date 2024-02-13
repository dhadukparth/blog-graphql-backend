const UserRoots = require('./roots/user.root')
const AuthenticationRoots = require('./roots/authentication.root')
const ContactRoots = require('./roots/contact.root')

const rootFunction = {
    ...UserRoots,
    ...AuthenticationRoots,
    // ...ContactRoots
}

module.exports = rootFunction