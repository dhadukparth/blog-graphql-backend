const { UserModel, UserProfileModel, ProtectUserModel } = require("../../models");
const { setResponse, decodeJWTToken } = require("../extra/local.functions");
const { checkRecordsModel } = require("./models.function");

const checkAuthentication = (context) => {
    return new Promise(async (resolve, reject) => {
        try {
            const authToken = context.headers.auth_token;
            if (!authToken) {
                resolve(setResponse(404, "Sorry! Authentication token is not found.", null))
            }
            const decodedTokenData = decodeJWTToken(authToken);

            const checkUserData = await checkRecordsModel(UserModel, {username: decodedTokenData.username, user_key: decodedTokenData.user_key, removeAt: null})
            const checkProfileData = await checkRecordsModel(UserProfileModel, { _id: checkUserData?.user_profile, removeAt: null })
            const checkProtectData = await checkRecordsModel(ProtectUserModel, { _id: checkUserData?.protect_user, removeAt: null })

            if (!checkUserData || !checkProtectData || !checkProfileData) {
                resolve(setResponse(498, "Sorry! Invalid authentication token", null))
            }
            resolve(null)
        }
        catch (err) {
            if (err.name === 'JsonWebTokenError') {
                resolve(setResponse(498, "Sorry! Invalid authentication token", null))
            } else {
                resolve(setResponse(500, "Sorry! Server Error", null))
            }
        }
    })
}

module.exports = checkAuthentication