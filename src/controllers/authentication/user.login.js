const { encodeJWTToken, decodeJWTToken, setResponse } = require('../../helper/extra/local.functions')
const { checkRecordsModel } = require("../../helper/functions/models.function")
const { UserModel, ProtectUserModel, UserProfileModel } = require("../../models")
const { generateUUIDKey } = require('../../helper/extra/local.functions')
const bcrypt = require('bcrypt')
const { todayDate } = require('../../helper/extra/local.variables')


const AuthLoginUser = async (inputData, context) => {
    try {
        const checkUserData = await checkRecordsModel(UserModel, { username: inputData.username, removeAt: null })
        const checkProtectData = await checkRecordsModel(ProtectUserModel, { _id: checkUserData?.protect_user, removeAt: null })
        const checkProfileData = await checkRecordsModel(UserProfileModel, { _id: checkUserData?.user_profile, removeAt: null })

        if (!checkUserData || !checkProtectData || !checkProfileData) {
            return setResponse(401, "Sorry, your credentials are invalid.", null)
        }

        if (!await bcrypt.compare(inputData.password, checkProtectData.password)) {
            return setResponse(401, "Sorry, your credentials are invalid.", null)
        }

        const userData = {
            firstname: inputData.firstname,
            lastname: inputData.lastname,
            username: inputData.username,
        }

        const generateUserKey = generateUUIDKey()
        await UserModel.findOneAndUpdate(
            { username: inputData.username, removeAt: null }, {
            $set: {
                user_key: generateUserKey,
                updateAt: todayDate,
            },
        });

        const jwt_token = encodeJWTToken({ ...userData, user_key: generateUserKey })
        const jwt_decoded = decodeJWTToken(jwt_token);

        if (jwt_token || jwt_decoded) {
            return setResponse(200, "User login successFully", {
                iat: jwt_decoded.iat,
                exp: jwt_decoded.exp,
                auth_token: jwt_token
            })
        }
        else {
            return setResponse(404, "Sorry! User has been not login", null)
        }
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = AuthLoginUser