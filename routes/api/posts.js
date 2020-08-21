const express= require('express');
const post_db = require('../../models/Post');
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator')
const posts = express.Router();
const profile_db = require("../../models/Profile");
const user_db = require("../../models/User")

posts.get('/',auth,async (req,res)=>{
    try{
        const _posts = await post_db.find().sort({date:-1})
        if(!_posts){
          res.status(404).send("No posts")
        }
        res.json(_posts)
    }catch(err){
      res.status(500).json({message:"something went wrong"})
    }
})



posts.post('/',
      [auth,[check('text','Text is required').not().isEmpty()]],
      async (req,res) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(500).json({errors})
        }
        try{
        const user = await user_db.findById(req.user.id).select('-password')
        const newPost = new post_db({
          text:req.body.text,
          name:user.name,
          avatar:user.avatar,
          user:req.user.id
        })

        const post = await newPost.save();
        res.json(post);

      }catch(err){
        console.error(err)
        res.status(500).json({message:"something went wrong"})
      }

});

posts.get("/post/:post_id",auth,async(req,res)=>{
    try{
    const post_ = await post_db.findOne({_id:req.params.post_id})
    if(!post_){
      return res.status(404).send("No Such post")
    }
    res.json({post_})
  }catch(err){
    console.error(err)
    res.status(500).json({message:"something went wrong"})
  }
})

posts.delete("/delete/:post_id",auth,async(req,res)=>{
    try{
      const post_ = await post_db.findById(req.params.post_id);
      console.log(post_.user,req.user)
      if(post_.user != req.user.id){
        console.log("unauthorised")
        return res.status(400).json({msg:"Unauthorised Action"})}
      await post_db.findOneAndDelete({_id:req.params.post_id})
      res.json({message:"post deleted"})

  }catch(err){
    console.error(err)
    res.status(500).json({message:"something went wrong"})
  }
})


  posts.put("/like/:post_id",auth,async(req,res)=>{
      try{
        console.log("entered posts")
        const post_ = await post_db.findById(req.params.post_id);
        if(post_.likes.filter(like => like.user.toString()=== req.user.id).length>0){
          return res.status(400).json({msg:'Post already liked'})
        }

        post_.likes.unshift({user:req.user.id});

        await post_.save();
        res.json(post_.likes)

    }catch(err){
      console.error(err)
      res.status(500).json({message:"something went wrong"})
    }
  })

  posts.delete('/unlike/:post_id',auth,async(req,res)=>{
      try{
        const post_ = await post_db.findById(req.params.post_id);
        const removeIndex = post_.likes.map(item => item.user).indexOf(req.user.id);
        if(removeIndex != -1){
          post_.likes.splice(removeIndex,1);
          await post_.save();
          res.json(post_)}
        else{
          res.send("Invalid action")
        }

      }catch(err){
        console.error(err.message)
        res.status(500).send('Serve Eror')
      }
  })

  posts.put('/comment/:post_id',
        [auth,[check('text','Text is required').not().isEmpty()]],
        async (req,res) =>{
          const errors = validationResult(req)
          if(!errors.isEmpty()){
              return res.status(500).json({errors})
          }
          try{
          const user = await user_db.findById(req.user.id).select('-password')
          const post_ = await post_db.findById(req.params.post_id)
          const newComment = {
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id
          }

          post_.comments.unshift(newComment)
          await post_.save();
          res.json(post_);

        }catch(err){
          console.error(err)
          res.status(500).json({message:"something went wrong"})
        }

  });

posts.delete("/comment/delete/:post_id/:com_id",auth,async(req,res)=>{
      try{
        const post_ = await post_db.findOne({_id:req.params.post_id})
        if(!post_){
          return res.status(404).send("No Such post")
        }

        const removeIndex = post_.comments.map(comment => comment.id.toString()).indexOf(req.params.com_id);
        if(removeIndex === -1){
          return res.status(404).send("No Such comment")
        }
        if(post_.comments[removeIndex].user.toString() !== req.user.id){
          return res.status(404).send("Invalid Action")
        }
          post_.comments.splice(removeIndex,1);
          await post_.save();
          res.json(post_)
    }catch(err){
      console.error(err)
      res.status(500).json({message:"something went wrong"})
    }
  })


module.exports = posts;
