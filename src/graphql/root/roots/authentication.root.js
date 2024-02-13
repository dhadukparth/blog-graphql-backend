const AuthLoginUser = require("../../../controllers/authentication/user.login")

const AuthenticationRoots = {
    userLogin: (args, context) => AuthLoginUser(args.inputData, context)
}

module.exports = AuthenticationRoots