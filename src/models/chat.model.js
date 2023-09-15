const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from : {
        type : 'string',
        required : true
    },
    to : {
        type : 'string',
        required: true
    },
    message : {
        type : 'string',
        required: true
    },
    time : {
        type : Date,
        required : true
    }
});

module.exports = mongoose.model('chat', chatSchema);
