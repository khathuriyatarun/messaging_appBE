const userModel = require('../model/user.model');

// @desc      Should return user's profile
// @route     get /api/user/me
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

// @desc      Update user's profile details
// @route     Put /api/user
// @access    Private
// @query     _id
// @body      displayPicture or username or both     
exports.update = async (req, res) => {
    try{
        if(!req.query?._id) return res.status(409).send('User id is required');
        if(req.body?.email) return res.status(409).send('User email can not be updated');

        const user = await userModel.findOneAndUpdate(
            { _id: req.query._id },
            { ...req.body },
            { new: true }
        )

        if(user == null) return res.status(400).send('Something went wrong');
        return res.status(200).send({data : user});
    }catch(err){
        return res.status(400).send('Something went wrong, Try again later');
    }    
};