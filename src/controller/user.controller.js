const userModel = require('../model/user.model');

// @desc      Should return user's profile
// @route     Post /api/user/me
// @access    Private and only should be later returned using jwt key
// @query     id      
exports.me = async (req, res) => {
    try{
        const profile = await userModel.findOne({ _id: req.query._id })
        if(!profile) res.status(409).send('Wrong token');

        return res.status(200).send({data : profile});
    }catch(err){
        return res.status(400).send('Someting went wrong, Try again later');
    }    
};