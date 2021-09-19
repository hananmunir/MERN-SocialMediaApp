import Mongoose  from "mongoose";

const userSchema = Mongoose.Schema({
    username:{
        type: String,
        require: true,
        min: 3,
        max: 25,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 8
    },
    profilePic: {
        type: String,
        default : ""
    },
    coverPic: {
        type: String,
        default : ""
    },
    followers: {
        type: Array,
        default : []
    },
    following: {
        type: Array,
        default : []
    },
    DOB: {
        type: Date,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String,
        max: 75
    },
    city: {
        type: String,
        max: 40,
    },
    from: {
        type: String,
        max: 50
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3]
    }
},
    {timestamps: true}
);

/*userSchema.path('DOB').validate( (DOB) => {
    const date1 = DOB
    const date2 = new Date().toLocaleDateString()
    const diffTime = Math.abs(date2 - date1);

    if(diffTime < 13){
        alert("Too Young")
    }
    else if(diffTime > 150){
        alert("Invalid")
    }

})*/

export default Mongoose.model("User", userSchema)