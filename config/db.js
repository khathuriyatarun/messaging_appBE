const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect('mongodb://0.0.0.0:27017/messagingApp', {useNewUrlParser: true, useUnifiedTopology: true });
  
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};
  
module.exports = connectDB;