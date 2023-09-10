const express = require('express');
const app = express();
const hpp = require('hpp');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db');
const { clearOTPs } = require('./utils/cronJobs')
const { verify } = require('./utils/auth.verify')

const AuthRoutes = require('./src/routes/auth.routes')
const UserRoutes = require('./src/routes/user.routes')
const ChatRoutes = require('./src/routes/chat.routes')

// Connect to database
connectDB();

//mounting cronjobs
clearOTPs()

// Body parser
app.use(express.json());

//parsing cookie
app.use(cookieParser())

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

app.use(morgan('dev'));

//mounting middleware to authenticate user
app.use(verify)


// Mount routers
app.use('/api/auth', AuthRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/chats', ChatRoutes);

const PORT = 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT}`.yellow.bold
  )
);


// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    // server.close(() => process.exit(1));
});