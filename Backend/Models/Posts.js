import Mongoose  from "mongoose";

const postsSchema = Mongoose.Schema({
    userId:{
        type: String,
        require: true
    },
    caption: {
        type: String,
        max: 528
    },
    img:{
        type: String,
    },
    likes:{
        type: Array,
        default: []
    },
    hearts:{
        type: Array,
        default: []
    },
    comments:{
        type: Array,
        default: []
    }
    
},  
  { timestamps: true }
);


export default Mongoose.model("Posts", postsSchema)