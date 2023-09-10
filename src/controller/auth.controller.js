const userModel = require('../model/user.model');
const otpModel = require('../model/otp.model');
const { sendMail } = require('../../utils/mailer')
const { otpTemplate } = require('../../utils/otp.template')
var jwt = require('jsonwebtoken');


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
        await generateOtp(user._id, user.email)

        //generate acccess token 
        const accessToken = jwt.sign({
            _id: user._id,
            username: user.username,
            email: user.email
        }, 'considerthisasecretkey', {
            expiresIn: '10m'
        });

        return res.status(200).send({data : {...user._doc, accessToken } });
    }catch(err){
        return res.status(400).send('Something went wrong, Try again later');
    }    
};

// @desc      validate otp
// @route     Post /api/auth/verify
// @access    Public
// @body     _id, pin
exports.verify = async (req, res) => {
    try{
        const { _id, pin } = req.body;

        if(!_id) return res.status(409).send('UserId is required')
        if(!pin) return res.status(409).send('Otp number is required');

        const otp = await otpModel.findOne({ user : _id, pin }, {validTill : 1, _id : 0}).sort({'validTill' : -1})
        console.log('otp is ::: ', otp)

        if(!otp) return res.status(409).send('Invaid Otp')

        if(new Date().getTime() < new Date(otp.validTill).getTime()){
            const refreshToken = jwt.sign({
                _id: _id,
            }, 'considerthisasarefreshtokenkey', { expiresIn: '1d' });
    
            res.cookie('jwt', refreshToken, { httpOnly: true, 
                sameSite: 'None', secure: true, 
                maxAge: 24 * 60 * 60 * 1000 });

            return res.status(200).send('Validated!')
        } 

        return res.status(401).send('Otp expired!')
    }catch(err){
        return res.status(400).send('Something went wrong, Try again later');
    }
}

// @desc      generate new access token
// @route     Post /api/auth/refresh
// @access    Private
// @cookie    jwt
// @body      username, email
exports.refresh = async (req, res) => {
    const refreshToken = req.cookies.jwt;
    if(!refreshToken) return res.status(403).send('Token not found')

    jwt.verify(refreshToken, 'considerthisasarefreshtokenkey', function(err, decoded) {
        if (err) {
          return res.status(403).send('Token Expired!')
        }

        //generate acccess token 
        const accessToken = jwt.sign({
            username: req.body.username,
            email: req.body.email
        }, 'considerthisasecretkey', {
            expiresIn: '10m'
        });

        return res.status(200).send({data : { accessToken } });
    });
}


async function generateOtp(userId, userMail){
    try{
        const otp = generateRandom4DigitNumber()
        const timestamp = new Date(new Date().getTime() + 2 * 60 * 1000).toISOString();

        const newOtp = new otpModel({ pin : otp, validTill : timestamp, user : userId });
        await newOtp.save();
        
        sendMail(userMail, 'OTP to continue on messaging app' ,otpTemplate(userMail, otp))
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