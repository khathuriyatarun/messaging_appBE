const express = require('express')
const {getChatMessages, addMessage, getLastMessages} = require('../controllers/chat.controller')
const router = express.Router()

router.get('/api/getMessages/:fromId/:toId', getChatMessages)
router.post('/api/addMessage', addMessage)
router.get('/api/getLastMessages/:userId', getLastMessages)



module.exports = router