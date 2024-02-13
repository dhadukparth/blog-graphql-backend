const mongoose = require('mongoose');
const { todayDate } = require('../../helper/extra/local.variables');
const { generateUUIDKey } = require('../../helper/extra/local.functions')
const generateUserKey = generateUUIDKey()

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    user_key: {
        type: String,
        required: true,
        unique: true,
        default: generateUserKey
    },
    protect_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProtectUser',
        required: true
    },
    user_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile',
        required: true
    },
    user_activity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserActivity',
        required: true
    },
    user_status: {
        type: Boolean,
        default: false
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
});

const UserModel = mongoose.model("Users", UserSchema)
module.exports = UserModel