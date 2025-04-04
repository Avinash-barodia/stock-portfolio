const jwt= require('jsonwebtoken');
const User=require('../models/User');
require('dotenv').config();
exports.auth=async (req,res,next)=>{
    try{
        console.log("hello");
      //  console.log(req.headers);
      const token= req.headers['authorization'].split('Bearer ')[1]|| req?.body?.token||req?.cookie;
      if(!token)token=req?.body?.token;
     // console.log('cookies from middleware ',req)
        //console.log("token ",token)
      if(!token){
        return res.status(400).json({
            success:false,
            message:"Token not found",
        })
      }
      const data=await jwt.decode(token,process.env.JWT_SECRET);
      console.log("data of token :",data);
      let user=await User.findById(data.id);
      if(!user){
        return res.status(400).json({
            success:false,
            message:'User does not exist',
        })
      }
      user=user.toObject();
      req.user=user;
     // console.log("req in auth ",req);

      next();

     
    }
    catch(error){ 
        return res.status(500).json({
            success:false,
            message:"Error occured while authorization",
            error:error.message,
        })
    }
}
