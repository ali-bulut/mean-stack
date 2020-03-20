const mongoose = require('mongoose');

const postSchema=mongoose.Schema({
    title: { type:String, required:true },
    content: { type:String, required:true },
    imagePath: {type:String, required:true},
    //ref means indicate that which model will use this creator field(it is equal to in User table _id field)
    creator: {type:mongoose.Schema.Types.ObjectId, ref: "User", required:true}
});

//our collection name which will be in database will be posts because we wrote Post for our model name
//and mongodb will automatically add the name as the plural and lower case type of our model name.
module.exports = mongoose.model('Post', postSchema);