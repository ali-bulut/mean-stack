const express = require('express');
const bodyParser= require('body-parser');

const app = express();

app.use(bodyParser.json());


//to fix CORS issue
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods',"GET, POST, PATCH, DELETE, OPTIONS");
    next();
})


app.post("/api/posts", (req,res,next) => {
    const post=req.body;
    console.log(post);
    res.status(201).json({
        message:'Post added successfully!'
    });
});

app.get('/api/posts' ,(req,res,next) => {
    const posts=[
        {id:'dgskgdskl1341', title:'First server-side post', content:'This is coming from the server!'},
        {id:'jknknjkn14144', title:'Second server-side post', content:'This is also coming from the server!'},
    ];
    res.status(200).json({
        message:'Posts fetched succesfully!',
        posts:posts
    });
})

module.exports = app;