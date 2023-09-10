const { authenticateOrRegister, verify, refresh } = require('../controller/auth.controller')
const express = require("express");
const router = express.Router();


router.get('/', authenticateOrRegister);
router.post('/verify', verify);
router.post('/refresh', refresh);

module.exports = router;