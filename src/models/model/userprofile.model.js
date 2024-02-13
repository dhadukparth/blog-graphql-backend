const mongoose = require('mongoose')
const { todayDate } = require('../../helper/extra/local.variables')

const UserProfileSchema = new mongoose.Schema({
    profile: {
        type: String,
        default: ""
    },
    phone: {
        type: Number,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    dob: {
        type: Date,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
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

const UserProfileModel = mongoose.model("UserProfile", UserProfileSchema)
module.exports = UserProfileModel