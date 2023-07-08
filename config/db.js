const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect('mongodb://localhost/messagingApp');
  
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};
  
module.exports = connectDB;