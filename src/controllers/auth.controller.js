const getUserDetails = require('../controllers/user.controller')
const { sendMail } = require('../helpers/sendMail')
const otpDetailsService = require("../controllers/otp.controller")
const otpModel = require('../models/otp.model')

const getOTPController = async (req, res) => {
  try {
    const userData = await getUserDetails(req.params.email)
    const otp = Math.floor(1000 + Math.random() * 9000);
    const Mail = userData && sendMail(req.params.email, otp)
    if (Mail) {
      const otpData = await otpDetailsService({ userId: userData._id.toString(), otp: otp })
      // const token = 
      if (otpData) return res.status(200).json({ success: true, data: userData });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


const verifyUser = async (req, res) => {
  const { otp, userId } = req.body
  const OtpDetails = await otpModel.findOne({ userId: userId }).sort({ _id: -1 })
  if (OtpDetails) {
    return (OtpDetails.otp == otp && new Date(OtpDetails.expireTime).toString() > new Date().toString())
      ?
      res.status(200).json({ success: true, message: 'user is loggedIn' }) :
      res.status(400).json({ error: "invalid credentials" });
  }
  else {
    return res.status(500).json({ error: "Internal user reference" });
  }

}

module.exports = { getOTPController, verifyUser }