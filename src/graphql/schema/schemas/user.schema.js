const UserSchema = `
    type UserProfile {
        profile: String
        phone: String
        bio: String
        dob: String
        gender: String
        address: String
        city: String
        state: String
        country: String
    }

    type UserProtect{
        email: String
    }

    type User {
        firstname: String
        lastname: String
        username: String
        user_profile: UserProfile
        protect_user: UserProtect
    }

    type UserCreateToken {
        iat: String
        exp: String
        auth_token: String
    }

    type userCreateResponse {
        status: Int,
        message: String
        data: UserCreateToken
    }

    type userAllResponse {
        status: Int,
        message: String
        data: [User]
    }

    type userDefaultResponse {
        status: Int,
        message: String
        data: User
    }

    type userBooleanResponse {
        status: Int,
        message: String
        data: Boolean
    }

    input userCreateData {
        firstname: String!
        lastname: String!
        email: String!
        username: String!
        password: String!
    }

    input userUpdateData {
        firstname: String
        lastname: String
        oldUsername: String!
        newUsername: String
        profile: String
        phone: String
        bio: String
        gender: String
        dob: String
        address: String
        city: String
        state: String
        country: String
    }

    input removeTempUserData {
        email: String!
        username: String!
    }

    input removePerUserData {
        email: String!
        username: String!
        password: String!
    }
`

module.exports = UserSchema