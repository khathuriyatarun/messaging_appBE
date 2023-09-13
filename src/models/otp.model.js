const mongoose = require('mongoose');
const user = require('./user.model');

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user
        // required: [true, 'userId is required'],
    },
    otp: {
        type: String,
        // required: [true, 'otp is required'],
    },
    expireTime: {
        type: String,
        // required: [true, 'expiry time of otp is required'],
    }
},
    { versionKey: false });

module.exports = mongoose.model('otp', otpSchema);