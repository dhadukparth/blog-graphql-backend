const { todayDate } = require("../extra/local.variables")

const checkRecordsModel = (Model, Data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkRecord = await Model.findOne(Data)
            if (checkRecord) {
                resolve(checkRecord)
            }
            resolve(null)
        }
        catch (err) {
            console.log(err)
            reject()
        }
    })
}

const fetchRecordModel = (Model, Data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fetchResponse;
            if (Data) {
                fetchResponse = await Model.findOne(Data)
            }
            else {
                fetchResponse = await Model.find({ removeAt: null })
            }
            if (fetchResponse) {
                resolve(fetchResponse)
            }
            resolve(null)
        }
        catch (err) {
            console.log(err)
            reject()
        }
    })
}

const createRecordModel = (Model, Data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const createResponse = Model(Data)
            createResponse.save()
            if (createResponse) {
                resolve(createResponse)
            }
            resolve(null)
        }
        catch (err) {
            console.log(err)
            reject()
        }
    })
}

const updateRecordModel = (Model, findData, updateData) => {
    return new Promise(async (resolve, reject) => {
        try {
            updateData.$set.updateAt= todayDate
            const updateResponse = Model.findOneAndUpdate(findData, updateData)
            if (updateResponse) {
                resolve(updateResponse)
            }
            resolve(null)
        }
        catch (err) {
            console.log(err)
            reject()
        }
    })
}


const removeTempModel = (Model, Data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const removeData = await Model.findOneAndUpdate(Data)
            if (removeData) {
                resolve(true)
            }
            resolve(false)
        }
        catch (err) {
            console.log(err)
            reject()
        }
    })
}

const removePerModel = (Model, Data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const removeData = await Model.deleteOne(Data)
            if (removeData) {
                resolve(true)
            }
            resolve(false)
        }
        catch (err) {
            console.log(err)
            reject()
        }
    })
}

module.exports = {
    checkRecordsModel,
    fetchRecordModel,
    createRecordModel,
    updateRecordModel,
    removeTempModel,
    removePerModel
}