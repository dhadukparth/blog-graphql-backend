const mongoose = require('mongoose')

const UserActivitySchema = mongoose.Schema({
    userLogin: [
        {
            loginDate:{
                type: Date,
                required: true
            },
        }
    ]
})

const UserActivity = mongoose.model('UserActivity', UserActivitySchema)
module.exports = UserActivity