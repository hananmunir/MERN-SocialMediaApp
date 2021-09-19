import router from "express"
import bcrypt from 'bcrypt'
import User from '../Models/User.js'

const userRouter = router()

//api endpoints

//Add User
userRouter.put("/:id", async (req,res) =>{
    try {
        if(req.body.userId === req.params.id || req.body.isAdmin){
            try {
                if(req.body.password){
                    const salt = await bcrypt.genSalt(12)
                    req.body.password = await bcrypt.hash(req.body.password, salt)
                }
            } catch (error) {
                res.status(500).json(error)
            }
            
            try {
                const user = User.findByIdAndUpdate(req.params.id, {
                    $set : req.body
                })
                res.status(200).json("Data Updated")
            } catch (error) {
                res.status(500).json(error)
            }
            
        }
    } catch (error) {
        req.status(403).json("You Can Only update your own account")
    }
})

//User Delete
userRouter.delete("/:id", async (req,res) =>{
    try {
        if(req.body.userId === req.params.id || req.body.isAdmin){
            
            
            try {
                const user = User.findByIdAndDelete(req.params.id)
                res.status(200).json("User Deleted")
            } catch (error) {
                res.status(500).json(error)
            }
            
        }
    } catch (error) {
        req.status(403).json("You Can Only delete your own account")
    }
})

//Get a user
userRouter.get("/", async (req,res) =>{
    const userId = req.query.userId
    const username = req.query.username
    try {
        try {
            
            const user = userId ?
            await User.findById(userId):
            await User.findOne({username: username})
            const {password, updateAt, ...other} = user._doc
            res.status(200).json(other)
        } catch (error) {
            res.status(500).json(error)
        }
        
    } catch (error) {
        req.status(500).json(error)
    }
})

//Follow people
userRouter.put("/:id/follow", async (req,res) =>{
    
    if(req.body.userId !== req.params.id ){
        try {
            const user = User.findById(req.params.id)
            const currentUser = User.findById(req.body.userId)
            
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push : {followers : req.body.userId}});
                await currentUser.updateOne({ $push: {following: req.params.id}})
                res.status(200).json("User has been followed")
            }else{
                //await user.updateOne({$pull : {followers : req.body.userId}});
                //await currentUser.updateOne({ $pull: {following: req.params.id}})
                res.status(403).json("You already follow that user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
    
})

export default userRouter