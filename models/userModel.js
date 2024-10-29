const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    // username: {
    //     type: String,
    //     required: true
    // },
    password: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    businessType: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Seller",
    },
    location: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Vendor', userSchema)