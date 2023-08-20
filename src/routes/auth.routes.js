const { authenticateOrRegister, verify } = require('../controller/auth.controller')
const express = require("express");
const router = express.Router();


router.get('/', authenticateOrRegister);
router.post('/verify', verify);

module.exports = router;