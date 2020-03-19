const mongoose = require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');

const userSchema=mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
});

//now we can get an error if we try to enter email that is already exists.
//only unique which is in schema code block don't throw an error. So we should use this plugin in order to
//get an error.
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);