const chatModel = require("../models/chat.model")
const userModel = require("../models/user.model")

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
    try {
        const { userId } = req.params
        const data = await chatModel.find({ from: userId })
        let tempArr = []
        data.forEach((ele) => {
            let id = userId == ele.from ? ele.to : ele.from
            if(!tempArr.includes(id)){
                tempArr.push(id)  
            } 
        })
        let tempArr2 = []
        tempArr.map((item) => {
            let tempData = []
            data.forEach((ele) => {
                if (ele.from == item || ele.to == item) tempData.push(ele)
            })
        tempArr2.push(tempData.sort((a, b) => a.time - b.time).pop())
        })
        let finalData = await Promise.all(tempArr2.map(async (message) => {
            let id = userId == message.from ? message.to : message.from
            let userDetails = await userModel.findOne({_id : id})
            return {message, userDetails}
        }))
        return res.status(200).json({data : finalData, success : true })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

module.exports = { getChatMessages, addMessage, getLastMessages }