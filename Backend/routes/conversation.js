import router from "express"
import Conversation from '../Models/Conversation.js'

const conversationRouter = router()


//New Convo
conversationRouter.post('/', async (req,res) =>{
    const newConversation = Conversation({
        members: [req.body.senderId, req.body.recieverId]
    })

    try {
        const savedConvo = await newConversation.save();
        res.status(200).json(savedConvo)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Get Convos

conversationRouter.get('/:userId', async (req,res) => {
    try {
        const conversations = await Conversation.find({
            members: {$in : [req.params.userId]}
        })
        res.status(200).json(conversations)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default conversationRouter