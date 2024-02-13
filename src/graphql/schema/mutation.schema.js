const mutationGraphSchema = `
    type Mutation {
        createUser(inputData: userCreateData): userCreateResponse
        updateUser(inputData: userUpdateData): userBooleanResponse
        removeTempUser(inputData: removeTempUserData): userBooleanResponse
        removePerUser(inputData: removePerUserData): userBooleanResponse
        
        userLogin(inputData: authLoginData): userLoginResponse
    }
    `
module.exports = mutationGraphSchema