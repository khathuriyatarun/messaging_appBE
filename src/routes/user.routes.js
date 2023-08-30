const { me, update } = require('../controller/user.controller')
const express = require("express");
const router = express.Router();


router.get('/me', me);
router.put('/', update);

module.exports = router;