import Mongoose  from "mongoose";

const conversationSchema = Mongoose.Schema({
    members:{
        type: Array, 
    },
   
},  
  { timestamps: true }
);


export default Mongoose.model("Conversation", conversationSchema)