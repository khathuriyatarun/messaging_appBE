const userModel = require('../model/user.model');
const otpModel = require('../model/otp.model');


// @desc      Authenticate or register user
// @route     Post /api/auth
// @access    Public
// @query     email
exports.authenticateOrRegister = async (req, res) => {
    try{
        if(!req.query.email) return res.status(409).send('Email is required');

        const user = await userModel.findOneAndUpdate(
            { email: req.query.email },
            { $setOnInsert: { email: req.query.email } },
            { upsert: true, new: true }
        )

        if(user == null) return res.status(409).send('Something went wrong');
        await generateOtp(user._id)

        return res.status(200).send({data : user});
    }catch(err){
        return res.status(400).send('Something went wrong, Try again later');
    }    
};

// @desc      validate otp
// @route     Post /api/verify
// @access    Public
// @body     _id, pin
exports.verify = async (req, res) => {
    try{
        const { _id, pin } = req.body;

        if(!_id) return res.status(409).send('UserId is required')
        if(!pin) return res.status(409).send('Otp number is required');

        const otp = await otpModel.findOne({ _id, pin }, {validTill : 1, _id : 0}).sort({'validTill' : -1})

        if(!otp) return res.status(409).send('Invaid Otp')

        if(new Date().getTime() < new Date(otp.validTill).getTime()) return res.status(200).send('Validated!')

        return res.status(401).send('Otp expired!')
    }catch(err){
        return res.status(400).send('Something went wrong, Try again later');
    }
}

async function generateOtp(userId){
    try{
        const otp = generateRandom4DigitNumber()
        const timestamp = new Date(new Date().getTime() + 2 * 60 * 1000).toISOString();

        const newOtp = new otpModel({ pin : otp, validTill : timestamp, user : userId });
        await newOtp.save();
        return
    }catch(err){
        throw err
    }
}

// Generate a random 4-digit number
function generateRandom4DigitNumber() {
    const min = 1000; // Minimum value (inclusive)
    const max = 9999; // Maximum value (inclusive)
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
}