const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required: true,
    },
    aadharNumber : {
        type : Number,
        required: true
    },
    panCardNumber : {
        type : String,
        required: true
    },
    whatsappNumber : {
        type : Number,
        required: true
    },
    emailId: {
        type : String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type : String,
        required: true
    },
    isApprove : {
        type: Boolean,
        default: false
    }

},{timestamps: true});

module.exports = mongoose.model("employee", userSchema);
