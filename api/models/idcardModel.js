const mongoose = require("mongoose")

const idcardSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },
    contactNumber1: {
        type: Number,
        required: true
    },
    contactNumber2: {
        type: Number,
        required: false
    },
    photo: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("idcard", idcardSchema);