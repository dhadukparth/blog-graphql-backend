const { setResponse } = require('../../helper/extra/local.functions');
const { checkRecordsModel, updateRecordModel } = require('../../helper/functions/models.function');
const { UserModel, UserProfileModel, ProtectUserModel } = require('../../models')
const checkAuthentication = require('../../helper/functions/authToken.function')

const userUpdate = async (inputData, context) => {
    try {
        const response = await checkAuthentication(context)
        if (response) {
            const checkUserData = await checkRecordsModel(UserModel, { username: inputData.oldUsername, removeAt: null })
            const checkProtectData = await checkRecordsModel(ProtectUserModel, { _id: checkUserData?.protect_user, removeAt: null })
            const checkProfileData = await checkRecordsModel(UserProfileModel, { _id: checkUserData?.user_profile, removeAt: null })

            if (!checkUserData || !checkProtectData || !checkProfileData) {
                return setResponse(401, "Sorry, your credentials are invalid.", null)
            }

            const responseUser = await updateRecordModel(UserModel, { username: inputData.oldUsername, removeAt: null }, {
                $set: {
                    firstname: inputData.firstname,
                    lastname: inputData.lastname,
                    username: inputData.newUsername === "" ? inputData.oldUsername : inputData.newUsername,
                }
            })

            const responseUserProfile = await updateRecordModel(UserProfileModel, { _id: responseUser?.user_profile, removeAt: null }, {
                $set: {
                    phone: inputData.phone,
                    bio: inputData.bio,
                    dob: inputData.dob,
                    gender: inputData.gender,
                    address: inputData.address,
                    city: inputData.city,
                    state: inputData.state,
                    country: inputData.country
                },
            });

            if (responseUser && responseUserProfile) {
                return setResponse(200, "This User Update successfully", true)
            }
            else {
                return setResponse(503, "Sorry! This user has been not updated", false)
            }
        }
        return response;
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = { userUpdate }