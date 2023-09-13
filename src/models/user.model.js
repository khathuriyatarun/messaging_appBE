const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is mandatory"],
        unique: true
    },
    username: {
        type: String
    },
    displayPicture: {
        type: String
    }
},
    { versionKey: false });

module.exports = mongoose.model("users", userSchema);