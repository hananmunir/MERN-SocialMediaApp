import express from 'express';
import morgan from 'morgan';
import Mongoose  from 'mongoose';
import helmet from 'helmet';
import dotenv from 'dotenv';
import userRouter from './routes/users.js'
import authRouter from './routes/auth.js'
import postsRouter from './routes/posts.js'
import conversationRouter from './routes/conversation.js'
import messagesRouter from './routes/messages.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//app config
dotenv.config();
const app = express();
const port = process.env.Port || 8800



//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/posts', postsRouter)
app.use('/api/conversation', conversationRouter)
app.use('/api/message', messagesRouter)
app.use("/assets", express.static(path.join(__dirname,"public/assets")))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets/post")
    },
    filename: (req,file,cb) =>{
        cb(null, req.body.name)
    },
})
const upload = multer({storage});
app.post('/api/upload', upload.single("file"),(req, res) => {
    try {   
        res.status(200).send("File uploaded successfully")
    } catch (error) {
        res.status(500).send("Couldnot uploaded File")
    }
})


//db config

Mongoose.connect(process.env.MongoDB_URL,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true  
    },
    () => console.log("DB connected"))

//api endpoints
app.get('/', (req,res) =>{
    res.status(200).send("Hey")
})

//listener
app.listen(port, () => console.log("Server started listening on port: ", port))