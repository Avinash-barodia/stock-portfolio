const Stock=require('../models/Stock')
const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.signup=async(req,res)=>{
    try{
     const {firstName,lastName,email,password}=req.body;
     if(!firstName || !lastName || !email ||!password){
        return res.status(400).json({
            success:false,
            message:"All fields are required to sign up",
        })
     }
     const hashedPassword=await bcrypt.hash(password,10);

     const response=await User.create({
        firstName,
        lastName,
        email,
        password:hashedPassword,
     })
     return res.status(200).json({
        success:true,
        message:"User signup successfull",
        data:response,
     })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"An error occured while sign up",
            error:error.message,
        })

    }
}
exports.login=async(req,res)=>{
    try{
          const {email,password}=req.body;
          if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"all fields are required for login",
            })
          }
          let user=await User.findOne({email:email});
          if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not exist",
            })
          }
          if(await !bcrypt.compare(user.password,password)){
            return res.status(400).json({
                success:false,
                message:"Invalid password entered"
            })
          }
          const token=await jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"72h"
          })
          const options={
            expires: new Date(Date.now()+1000*60*60*24*30),
            httpOnly:true,
          }
          user=user.toObject();
          user.password=undefined;
          user.token=token;
    
          res.cookie("token", token, options).status(200).json({
            success:true,
            token,
            user,
            message:'User Logged in successfully',
        });

    }
    catch(error){
      return res.status(500).json({
        success:false,
        message:"An error occured while logging the user in",
        error:error.message,
      })
    }
}



