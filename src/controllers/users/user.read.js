const { setResponse, decodeJWTToken } = require("../../helper/extra/local.functions");
const { checkRecordsModel } = require("../../helper/functions/models.function");
const { UserModel, ProtectUserModel, UserProfileModel } = require("../../models");
const checkAuthentication = require('../../helper/functions/authToken.function')

const getAllUsers = async (args, context) => {
    try {
        const response = await checkAuthentication(context)
        if (!response) {
            const res = await UserModel.find({ removeAt: null }).populate('user_profile protect_user');
            if (res) {
                return setResponse("200", "Show the users data", res)
            }
            else {
                return setResponse("503", "Sorry! Internal Server Error", null)
            }
        }
        return response
    }
    catch (err) {
        console.log(err);
    }
}

const getSingleUser = async (inputData, context) => {
    try {
        const response = await checkAuthentication(context)
        if (!response) {
            const checkUserData = await checkRecordsModel(UserModel, { username: inputData.username, removeAt: null })
            const checkProtectData = await checkRecordsModel(ProtectUserModel, { _id: checkUserData?.protect_user, removeAt: null })
            const checkProfileData = await checkRecordsModel(UserProfileModel, { _id: checkUserData?.user_profile, removeAt: null })

            if (!checkUserData || !checkProtectData || !checkProfileData) {
                return setResponse(401, "Sorry, your credentials are invalid.", null)
            }

            const res = await UserModel.findOne({ username: inputData.username, removeAt: null }).populate('user_profile protect_user');
            if (res) {
                return setResponse("200", "Show the user data", res);
            } else {
                return setResponse("503", "Sorry! Internal Server Error", null);
            }
        }
        return response;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { getAllUsers, getSingleUser }