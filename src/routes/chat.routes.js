const { chats, add, list } = require('../controller/chat.controller')
const express = require("express");
const router = express.Router();


router.get('/', chats);
router.post('/', add);
router.get('/all', list);

module.exports = router;