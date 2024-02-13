const mongoose = require('mongoose')
const { todayDate } = require('../../helper/extra/local.variables')

const protectUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: todayDate
    },
    updateAt: {
        type: Date,
        default: ""
    },
    removeAt: {
        type: Date,
        default: ""
    }
})

const ProtectUserModel = mongoose.model('ProtectUser', protectUserSchema)
module.exports = ProtectUserModel;