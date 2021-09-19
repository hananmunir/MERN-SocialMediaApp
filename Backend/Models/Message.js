import Mongoose  from "mongoose";

const messageSchema = Mongoose.Schema({
    conversationId:{
        type: String,
        require: true
    },
    senderId:{
        type: String,
    },
    message: {
        type: String,
    }, 
},      
  { timestamps: true }
);


export default Mongoose.model("Message", messageSchema)