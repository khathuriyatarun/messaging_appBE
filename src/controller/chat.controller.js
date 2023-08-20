const chatModel = require('../model/chat.model');

// @desc      one to one chats
// @route     Get /api/chats
// @access    Private
// @query     to, from      
exports.chats = async (req, res) => {
    try{
        const { from, to } = req.query;

        if(!from) return res.status(409).send("from user's Id is required")
        if(!to) return res.status(409).send("to user's Id is required");

        const chats = await chatModel.find({
            $or: [
              { $and: [{ from: from }, { to: to }] },
              { $and: [{ from: to }, { to: from }] }
            ],
        })

        return res.status(200).send({data : chats});
    }catch(err){
        return res.status(400).send('Someting went wrong, Try again later');
    }    
};

// @desc     add new chat
// @route    Post /api/chats
// @access   Private
// @body
exports.add = async (req, res) => {
    try{
        if(!req.body.from) return res.status(409).send("from user's Id is required")
        if(!req.body.to) return res.status(409).send("to user's Id is required");

        const chat = new chatModel({ ...req.body, time : new Date().toISOString() });
        await chat.save();

        return res.status(200).send('Added');
    }catch(err){
        return res.status(400).send('Someting went wrong');
    }    
};

// @desc      Get all chat lists
// @route     Get /api/chats/all
// @access    Private
// @query     _id  
exports.list = async (req, res) => {
    try{
        const { _id } = req.query;

        if(!_id) return res.status(409).send("user's Id is required")

        
        const conversations = await chatModel.aggregate([
            {
              $match: {
                $or: [{ from: _id }, { to: _id }],
              },
            },
            {
              $sort: { time: -1 }, // Sort chats by time in descending order
            }
        ])

        console.log("conversations :::: ", conversations)
          

        return res.status(200).send('hey hey hey');
    }catch(err){
        return res.status(400).send('Someting went wrong, Try again later');
    }    
};