import router from "express"
import User from '../Models/User.js'
import bcrypt from 'bcrypt'

const authRouter = router()

//api endpoints

//Register
authRouter.post("/register", async (req,res) =>{
    try{
        const data = req.body

        const salt = await bcrypt.genSalt(12)
        const hashedPass = await bcrypt.hash(data.password, salt)
        const newUser = await new User({
            username : data.username,
            email: data.email.toLowerCase(),
            password: hashedPass,
            profilePic : data.profilePic,
            coverPic : data.coverPic    
        });

        await newUser.save();
        res.status(200).json("User Created");
   
    }catch(e){
        res.status(500).json(e)
    }
})

//Login 
authRouter.post("/login", async (req,res) =>{
    try{
        const data = req.body
        const user = await User.findOne({email : data.email.toLowerCase()})

        // User Doesnot Exist
        !user && res.status(404).json("User Not Found")

        // Check Password
        const validPass = await bcrypt.compare(data.password, user.password)
        !validPass && res.status(400).send("Invalid password")

        res.status(200).json(user);
   
    }catch(e){
        res.status(500).json(e)
    }
})
export default authRouter