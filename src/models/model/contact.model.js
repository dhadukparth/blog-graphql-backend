const mongoose = require('mongoose')
const { todayDate } = require('../../helper/extra/local.variables')

const contactSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
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

const ContactModel = mongoose.model('contact', contactSchema)
module.exports = ContactModel