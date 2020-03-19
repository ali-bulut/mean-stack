const express= require('express');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

const User=require('../models/user');

const router=express.Router();


router.post("/signup", (req,res,next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user=new User({
                email:req.body.email,
                password:hash
            });
            user.save()
                .then(result=>{
                    res.status(201).json({
                        message:"User created!",
                        result:result
                    });
                })
                .catch(err => {
                    res.status(500).json({error:err});
                });
        })
})

router.post('/login', (req,res,next)=>{
    let fetchedUser;
    User.findOne({ email:req.body.email })
        .then(user => {
            if(!user){
                return res.status(401).json({
                    message:'Auth failed!'
                });
            }
            fetchedUser=user;
            //return boolean
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result=>{
            if(!result){
                return res.status(401).json({
                    message:'Auth failed!'
                });
            }
            //1. parameter -> payload(a part of the user's information)
            //2.parameter -> our secret key (we can define it whatever we want)
            //3.parameter -> options about token
            const token=jwt.sign({email:fetchedUser.email, userId:fetchedUser._id}, 'secret_key_that_should_be_longer', 
            {
                //1 hour
                expiresIn:"1h"
            });
            res.status(200).json({
                token:token,
                //1 hour
                expiresIn:3600
            });
        })
        .catch(err=>{
            return res.status(401).json({
                message:'Auth failed!'
            });
        });
})


module.exports=router;