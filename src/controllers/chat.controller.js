const chatModel = require("../models/chat.model")

const getChatMessages = async (req, res) => {
    try {
        const { fromId, toId } = req.params
        const messages = await chatModel.find({ from: fromId, to: toId })
        console.log("in get chat mesages", messages)
        if (messages.length > 0) res.status(200).json({ message: messages })
    } catch {
        res.status(404).json({ error: "Not found" })
    }
}

const addMessage = async (req, res) => {
    try {
        const { from, to, message, time } = req.body
        const output = await chatModel.create({ from: from, to: to, message: message, time: time })
        if (output) res.status(200).json({ message: "messge successfully added", data: output })
    } catch (err) {
        res.status(400).json({ error: 'Bad request' })
    }
}


const getLastMessages = async (req, res) => {
    try{
        const {userId} = req.params
    }catch(err){
        res.status(404).json({ error: err.message })
    }
}

module.exports = { getChatMessages, addMessage, getLastMessages }