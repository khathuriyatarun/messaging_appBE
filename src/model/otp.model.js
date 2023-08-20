const mongoose = require("mongoose");
const User = require('./user.model')

const otpSchema = new mongoose.Schema({
    pin: {
        type: String,
    },
    validTill: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : User
    }
},
{ versionKey: false });

module.exports = mongoose.model("otp", otpSchema);