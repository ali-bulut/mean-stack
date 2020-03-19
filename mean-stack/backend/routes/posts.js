const express= require('express');
const multer=require('multer');

const router=express.Router();

//middlewares
const checkAuth=require('../middlewares/check-auth');

const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg'
};

//models
const Post = require('../models/post');

const storage=multer.diskStorage({
    destination:(req,file, cb)=>{
        const isValid=MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if(isValid){
            error=null;
        }
        cb(error,"backend/images");
    },
    filename: (req,file,cb) => {
        const name=file.originalname.toLowerCase().split(' ').join('-');
        const ext=MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

router.post("", checkAuth, multer({storage:storage}).single("image"), (req,res,next) => {
    const url=req.protocol + '://' + req.get("host");
    const post=new Post({
        title:req.body.title,
        content:req.body.content,
        imagePath:url + "/images/" + req.file.filename,
        //we can access the userId from checkAuth middleware.
        creator:req.userData.userId
    });
    //to save post to database
    post.save().then(createdPost => {
        res.status(201).json({
            message:'Post added successfully!',
            post:{
                //instead of using that we can simply use that;
                ...createdPost,
                id:createdPost._id
                // title:createdPost.title,
                // content:createdPost.content,
                // imagePath:createdPost.imagePath
            }
        });
    });

    
});

router.put('/:id', checkAuth, multer({storage:storage}).single("image"), (req,res,next)=>{
    let imagePath=req.body.imagePath;
    if(req.file){
        const url=req.protocol + '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    const post=new Post({
        _id:req.body.id,
        title:req.body.title,
        content:req.body.content,
        imagePath:imagePath
    });
    Post.updateOne({_id: req.params.id}, post).then(result=>{
        res.status(200).json({message:'Update successful!', post:{...post, id:req.params.id}});
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
    // + means converting string to int
    const pageSize= +req.query.pagesize;
    const currentPage= +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;
    if(pageSize && currentPage){
        postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    //to list all of our posts which are coming from database
    postQuery.then(documents => {
        fetchedPosts=documents;
        return Post.countDocuments(); 
    }).then(count => {
        res.status(200).json({
            message:'Posts fetched succesfully!',
            posts:fetchedPosts,
            maxPosts:count
        });
    });
    
})

router.delete('/:id', checkAuth, (req,res,next) => {
    // Post.findByIdAndRemove(req.params.id).then(result=>{
    //     res.status(200).json({message:'The Post deleted!'})
    // });

    //to delete post from database
    Post.deleteOne({_id:req.params.id}).then(result=>{
        res.status(200).json({message:'The Post deleted!'})
    })
})

module.exports=router;