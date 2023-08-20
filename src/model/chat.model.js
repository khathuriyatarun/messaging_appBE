const mongoose = require("mongoose");
const User = require('./user.model')

const chatSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref : User
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref : User
    },
    time: {
        type: String
    }
},
{ versionKey: false });

module.exports = mongoose.model("chat", chatSchema);