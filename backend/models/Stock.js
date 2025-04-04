const mongoose=require('mongoose');
const Daily=require('./Daily');
const stockSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    buyingPrice:{
        type:Number,
    },
    currentPrice:{
       type:Number,
    },
    quantity:{
        type:Number,
    },
    buyingDate:{
        type:Date       ,
        default:Date.now(),
    },
    update:{
        type:[],
        ref:'Daily'
    }


})
module.exports=mongoose.model("Stock",stockSchema);