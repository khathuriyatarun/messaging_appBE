const express = require("express");
const app = express();
const cors = require('cors');
const PORT = 3000;
const mongoSanitize = require('express-mongo-sanitize');
const http = require("http").createServer();
const connectDB = require('./config/db');
const AuthRoutes= require('./src/routes/auth.routes')
// const io = require("socket.io")(http, {
//     cors: {
//         origin: "http://localhost:3001",
//         methods: ["GET", "POST"]
//     }
// });
connectDB();
app.use(cors())
app.use(express.json());
app.use(mongoSanitize());
app.use(AuthRoutes);

const server = app.listen(
    PORT,
    console.log(
      `Server running on port ${PORT}`
    )
  );
// //Listen for a client connection 
// io.on("connection", (socket) => {
//     //Socket is a Link to the Client 
//     console.log("New Client is Connected!");
//     socket.on("welcome", (msg) => console.log(msg))
//     //Here the client is connected and we can exchanged 
//     //Send Message 
//     //We need to use the Socket (the link between the server and the connected user(s)).
// });
// http.listen(port, () => {
//     console.log("Server Is Running Port: " + port);
// });