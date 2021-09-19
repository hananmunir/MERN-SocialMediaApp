const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000"
    }
})

let users = []

const addUser = (userId, socketId) =>{
    !users.some( user => user.userId === userId) && users.push({userId, socketId})
}

const removeUser = (socketId) =>{
    users = users.filter((user) => user.socketId !== socketId);
}
const getUser = (userId) =>{
    return users.find( user => user.userId === userId)
}
io.on("connection", (socket) =>{
    console.log("A user Connected")
    
    //Add A User
    socket.on("addUsers", (userId) =>{
        addUser(userId, socket.id);
        io.emit("getUsers", users)
    })

    //Send Message
    socket.on("sendMessage",({senderId, receiverId, message}) =>{
        const user = getUser(receiverId);
        console.log("here is the user",user)
        io.to(user.socketId).emit("getMessage", {
            senderId,
            message
        })
        console.log("message Send")
    })

    //Goes Offline
    socket.on("disconnect", ()=>{

        console.log("User disconnected")
        removeUser(socket.id)
        io.emit("getUsers", users)

    })
})