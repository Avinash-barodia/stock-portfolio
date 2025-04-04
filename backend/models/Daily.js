const mongoose =require('mongoose');

const dailySchema=new mongoose.Schema({
  
   time:{
    type:Date,
    default:Date.now(),
   },
   value:{
    type:Number,
   }
})
module.exports=mongoose.model('Daily',dailySchema);