const express = require('express')
const {getChatMessages, addMessage, getLastMessages} = require('../controllers/chat.controller')
const router = express.Router()

router.get('/getMessages/:fromId/:toId', getChatMessages)
router.post('/addMessage', addMessage)
router.get('/getLastMessages/:userId', getLastMessages)



module.exports = router