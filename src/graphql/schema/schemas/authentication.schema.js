const AuthSchema = `
    type UserLoginToken {
        iat: String
        exp: String
        auth_token: String
    }

    type userLoginResponse {
        status: Int,
        message: String
        data: UserLoginToken
    }

    input authLoginData {
        username: String!
        password: String!
    }
`;

module.exports = AuthSchema;