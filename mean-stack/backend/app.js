const express = require('express');
const bodyParser= require('body-parser');
const mongoose=require('mongoose');


//models
const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://alibulut:LJEpE1QGsRP9fSL4@mean-stack-db-uyxqu.mongodb.net/mean-stack-db?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false })
    .then(()=>{
        console.log("Connected to database!");
    })
    .catch((err)=>{
        console.log("Connection failed! " + err);
    })

app.use(bodyParser.json());


//to fix CORS issue
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods',"GET, POST, PATCH, DELETE, OPTIONS");
    next();
})

app.post("/api/posts", (req,res,next) => {
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

app.get('/api/posts' ,(req,res,next) => {
    //to list all of our posts which are coming from database
    Post.find().then(documents => {
        res.status(200).json({
            message:'Posts fetched succesfully!',
            posts:documents
        });
    });
    
})

app.delete('/api/posts/:id', (req,res,next) => {
    // Post.findByIdAndRemove(req.params.id).then(result=>{
    //     res.status(200).json({message:'The Post deleted!'})
    // });

    //to delete post from database
    Post.deleteOne({_id:req.params.id}).then(result=>{
        res.status(200).json({message:'The Post deleted!'})
    })
})

module.exports = app;