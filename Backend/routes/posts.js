import router from "express"
import bcrypt from 'bcrypt'
import Post from '../Models/Posts.js'
import User from "../Models/User.js"

const postRouter = router()

//Api Endpoints

//create post
postRouter.post('/', async (req,res) =>{
    const newPost = new Post(req.body)

    try {
        const post = await newPost.save()
        res.status(200).json(post)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

//edit post
postRouter.put('/:id', async (req,res) =>{

    try {
        //finding post
        const post = await Post.findById(req.params.id);

        //post not found
        !post && res.status(404).json("post not found")

        //user trying to edit the post is valid
        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body})
            res.status(200).json("Post updated")
        }else{
            res.status(403).json("You can only update your post")
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
    
});

//Delete post
postRouter.delete('/:id', async (req,res) =>{

    try {
        //finding post
        const post = await Post.findById(req.params.id);

        //post not found
        !post && res.status(404).json("post not found")

        //user trying to edit the post is valid
        if(post.userId === req.body.userId){
            await post.deleteOne()
            res.status(200).json("Post delete")
        }else{
            res.status(403).json("You can only delete your post")
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
    
});

//like post
postRouter.put('/:id/like', async (req,res) =>{

    try {
        //finding post
        const post = await Post.findById(req.params.id);

        //post not found
        if(!post){
            res.status(404).json("post not found")
        }

        //user trying to edit the post is valid
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}})
            res.status(200).json("Post Liked")
        }else{
            await post.updateOne({$pull: {likes: req.body.userId}})
            res.status(200).json("Post disliked")
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
    
});

//get a post
postRouter.get('/:id', async (req,res) =>{

    try {
        //finding post
        const post = await Post.findById(req.params.id);

        //post not found
        !post && res.status(404).json("post not found")

        res.status(200).json(post)
        
    } catch (error) {
        res.status(500).json(error)
    }
    
});

//get timeline posts
postRouter.get('/timeline/:userId', async (req,res) =>{
        
    try {
        
        //current user  
        const currentUser = await User.findById(req.params.userId)
        
        //finding post
        const userPosts = await Post.find({userId : currentUser._id});
        const friendsPost = await Promise.all(
            currentUser.following.map((friendId) =>{
                return Post.find({userId: friendId})
            })
        )
        

        res.status(200).json(userPosts.concat(...friendsPost))
        
    } catch (error) {
        res.status(500).json(error)
    }
    
});

//get users posts
postRouter.get('/profile/:username', async (req,res) =>{  
    try {
       
        //current user  
        const currentUser = await User.findOne({username: req.params.username})
        
        //finding post
        const userPosts = await Post.find({userId : currentUser._id});

        res.status(200).json(userPosts)
        
    } catch (error) {
        res.status(500).json(error)
    }
    
});
export default postRouter