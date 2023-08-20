const { me } = require('../controller/user.controller')
const express = require("express");
const router = express.Router();


router.get('/me', me);

module.exports = router;