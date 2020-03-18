const express = require('express');
const bodyParser= require('body-parser');
const mongoose=require('mongoose');

const path=require('path');

const postsRoutes=require('./routes/posts');

const app = express();

mongoose.connect('mongodb+srv://alibulut:LJEpE1QGsRP9fSL4@mean-stack-db-uyxqu.mongodb.net/mean-stack-db?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false })
    .then(()=>{
        console.log("Connected to database!");
    })
    .catch((err)=>{
        console.log("Connection failed! " + err);
    })

app.use(bodyParser.json());

//any requests to /images path will be allowed
app.use("/images", express.static(path.join("backend/images")));

//to fix CORS issue
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods',"GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
})

app.use("/api/posts", postsRoutes);


module.exports = app;