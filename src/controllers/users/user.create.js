const { encodeJWTToken, decodeJWTToken, setResponse } = require('../../helper/extra/local.functions')
const { UserModel, UserProfileModel, ProtectUserModel } = require('../../models')
const { checkRecordsModel } = require('../../helper/functions/models.function')
const bcrypt = require('bcrypt')

const generate_hash_password = async (password) => {
    if (password !== "") {
        const salt = await bcrypt.genSalt(10);
        const generate_hash = await bcrypt.hash(password, salt);
        return generate_hash;
    }
}

const createUserRecords = (Model, Data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userProfile = Model.UserProfileModel()
            const protectUser = Model.ProtectUserModel(Data.protectUserData)
            const user = Model.UserModel(Data.userData)
            user.user_profile = userProfile;
            user.protect_user = protectUser;

            if(userProfile.save() && protectUser.save() && user.save()){
                resolve(user)
            }
            else{
                resolve(null)
            }
        }
        catch (err) {
            reject()
        }
    })
}

const userCreate = async (inputData) => {
    try {
        const generate_hash = await generate_hash_password(inputData.password)

        const userData = {
            firstname: inputData.firstname,
            lastname: inputData.lastname,
            username: inputData.username,
        }

        const protectUserData = {
            email: inputData.email,
            password: generate_hash,
        }

        const checkMail = await checkRecordsModel(ProtectUserModel, { email: inputData.email })
        if (checkMail) {
            return setResponse(403, "Email address already exists", null)
        }

        if (await checkRecordsModel(UserModel, { username: inputData.username })) {
            return setResponse(403, "Username already exists", null)
        }

        const res = await createUserRecords({ UserModel, UserProfileModel, ProtectUserModel }, { userData, protectUserData })
        const jwt_token = encodeJWTToken({ ...userData, user_key: res.user_key })
        const jwt_decoded = decodeJWTToken(jwt_token);

        if (res) {
            return setResponse(201, "User create successFully", {
                iat: jwt_decoded.iat,
                exp: jwt_decoded.exp,
                auth_token: jwt_token
            })
        }
        else {
            return setResponse(404, "Sorry! User has been not created", null)
        }
    }
    catch (err) {
        console.log(err);
    }
}



module.exports = userCreate