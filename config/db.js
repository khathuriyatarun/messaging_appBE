const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect('mongodb://localhost/messagingApp', {useNewUrlParser: true, useUnifiedTopology: true });
  
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};
  
module.exports = connectDB;