const express= require('express');

const router=express.Router();

//models
const Post = require('../models/post');

router.post("", (req,res,next) => {
    const post=new Post({
        title:req.body.title,
        content:req.body.content
    });

    //to save post to database
    post.save().then(createdPost => {
        res.status(201).json({
            message:'Post added successfully!',
            postId:createdPost._id
        });
    });

    
});

router.put('/:id', (req,res,next)=>{
    const post=new Post({
        _id:req.body.id,
        title:req.body.title,
        content:req.body.content
    });
    Post.updateOne({_id: req.params.id}, post).then(result=>{
        res.status(200).json({message:'Update successful!'});
    });
})

router.get('/:id', (req,res,next)=>{
    Post.findById(req.params.id).then(post=>{
        if(post){
            res.status(200).json(post);
        }
        else{
            res.status(404).json({message:'Post not found!'});
        }
    })
})


router.get('' ,(req,res,next) => {
    //to list all of our posts which are coming from database
    Post.find().then(documents => {
        res.status(200).json({
            message:'Posts fetched succesfully!',
            posts:documents
        });
    });
    
})

router.delete('/:id', (req,res,next) => {
    // Post.findByIdAndRemove(req.params.id).then(result=>{
    //     res.status(200).json({message:'The Post deleted!'})
    // });

    //to delete post from database
    Post.deleteOne({_id:req.params.id}).then(result=>{
        res.status(200).json({message:'The Post deleted!'})
    })
})

module.exports=router;