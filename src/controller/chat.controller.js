const { ObjectId } = require('mongodb');
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
        const userId = req.query._id;

        if(!userId) return res.status(409).send("user's Id is required")

        const conversations = await chatModel.aggregate([
            {
                $match: {
                  $or: [{ from: new ObjectId(userId) }, { to: new ObjectId(userId) }],
                },
              },
              {
                $sort: { time: -1 },
              },
              {
                $group: {
                  _id: {
                    $cond: [
                      { $eq: ['$from', new ObjectId(userId)] },
                      '$to',
                      '$from',
                    ],
                  },
                  lastMsg: { $first: '$$ROOT' },
                },
              },
              {
                $lookup: {
                  from: 'users',
                  localField: '_id',
                  foreignField: '_id',
                  as: 'userDetails',
                },
              },
              {
                $unwind: '$userDetails',
              },
          ]);
          

        return res.status(200).send(conversations);
    }catch(err){
        console.log('err ', err)
        return res.status(400).send('Someting went wrong, Try again later');
    }    
};