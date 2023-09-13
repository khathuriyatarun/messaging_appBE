const otpModel = require("../models/otp.model")

const otpDetailsService = async (req, res) => {
    try {
        const expireTime = new Date(new Date().getTime() + 2 * 60 * 1000).toISOString();

        const newOtp = new otpModel({
            userId: req.userId,
            otp: req.otp,
            expireTime: expireTime
        })
        console.log("New OTP")
        await newOtp.save()
        return newOtp
    }
    catch (err) {
        console.error(err, 'getting error message')
        return false
    }

}

module.exports = otpDetailsService