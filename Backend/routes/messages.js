import router from "express"
import Message from '../Models/Message.js'

const messageRouter = router()

// Add Message

messageRouter.post('/', async (req, res) => {
    const newMessage = new Message(req.body)
    try {
        const saveMessage = await newMessage.save()
        res.status(200).json(saveMessage)
    } catch (error) {
        res.status(500).send(error)
    }
})

// get message

messageRouter.get('/:conversationId', async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId : req.params.conversationId
        })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).send(error)
    }
})



export default messageRouter