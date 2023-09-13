const express = require('express');
const router = express.Router();
const {getOTPController, verifyUser} = require('../controllers/auth.controller') ;

router.get('/api/getOtp/:email', getOTPController);
router.post('/api/verifyUser', verifyUser)
module.exports = router;