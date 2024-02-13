const { checkRecordsModel } = require("../../helper/functions/models.function")
const { UserModel, ProtectUserModel, UserProfileModel } = require("../../models")

const checkUserValid = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUserData = await checkRecordsModel(UserModel, { username: inputData.username, removeAt: null })
            const checkProtectData = await checkRecordsModel(ProtectUserModel, { _id: checkUserData?.protect_user, removeAt: null })
            const checkProfileData = await checkRecordsModel(UserProfileModel, { _id: checkUserData?.user_profile, removeAt: null })

            if (!checkUserData || !checkProtectData || !checkProfileData) {
                resolve(setResponse(401, "Sorry, your credentials are invalid.", null))
            }
            else {
                resolve(null)
            }
        }
        catch (err) {
            reject()
        }
    })
}

// const checkUserPassword = (inputData) => {
//     return new Promise(async (resolve, reject) => {
//         try{

//         }
//     })
// }