const { setResponse } = require('../../helper/extra/local.functions');
const { checkRecordsModel } = require('../../helper/functions/models.function');
const { todayDate } = require('../../helper/extra/local.variables');
const { UserModel, ProtectUserModel, UserProfileModel } = require('../../models')
const checkAuthentication = require('../../helper/functions/authToken.function')
const bcrypt = require('bcrypt')

// temporary remove records
const userTemporaryRemove = async (inputData, context) => {
    try {
        const response = await checkAuthentication(context)
        if (!response) {

            if (!await checkRecordsModel(UserModel, { username: inputData.username, removeAt: null }) && !await checkRecordsModel(ProtectUserModel, { email: inputData.email })) {
                return setResponse(401, "Sorry, your credentials are invalid.", null)
            }

            const resUser = await UserModel.findOneAndUpdate({ username: inputData.username }, { $set: { removeAt: todayDate } });
            const resUserProfile = await UserProfileModel.findOneAndUpdate({ _id: resUser.user_profile }, { $set: { removeAt: todayDate } });
            const resUserProtect = await ProtectUserModel.findOneAndUpdate({ _id: resUser.protect_user }, { $set: { removeAt: todayDate } });

            if (resUser && resUserProfile && resUserProtect) {
                return setResponse(200, "This User Delete successfully", true)
            }
            else {
                return setResponse(503, "Sorry! This user has been not deleted", false)
            }
        }
        return response;
    }
    catch (err) {
        console.log(err);
    }
}


// permanent remove records
const userPermanentRemove = async (inputData, context) => {
    try {
        const response = await checkAuthentication(context)
        if (!response) {

            const checkUserModel = await checkRecordsModel(UserModel, { username: inputData.username, removeAt: null })
            if (!checkUserModel) {
                return setResponse(401, "Sorry, your credentials are invalid.", null)
            }

            const checkProtectData = await checkRecordsModel(ProtectUserModel, { email: inputData.email, removeAt: null })
            if (!checkProtectData) return setResponse(401, "Sorry, your credentials are invalid.", null)

            if (!await bcrypt.compare(inputData.password, checkProtectData.password)) {
                return setResponse(401, "Sorry, your credentials are invalid.", null)
            }

            if (await ProtectUserModel.deleteOne({ _id: checkUserModel.protect_user }) && await UserProfileModel.deleteOne({ _id: checkUserModel.user_profile }) && await UserModel.deleteOne({ _id: checkUserModel._id })) {
                return setResponse(200, "User permanently deleted successfully.", true)
            }
            else {
                return setResponse(503, "Sorry! This user has not been permanently deleted.", false)
            }
        }
        return response;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { userTemporaryRemove, userPermanentRemove }