const mongoose=require('mongoose');
const Stock=require('./Stock')
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String,
    },
    portfolio:{
        type:[],
        ref:'Stock'
    }


})
module.exports=mongoose.model('User',userSchema);