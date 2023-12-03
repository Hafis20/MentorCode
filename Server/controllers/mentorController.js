const Mentor = require('../models/mentorModel');
const jwt = require('jsonwebtoken');


// Registering the mentor controller
const register  = async(req,res)=>{
   try {
      
   } catch (error) {
      res.status(500).json({message:'Server side error'});
   }
}

// Verifying the mentor otp or Validating the otp
const verifyOtp = async(req,res)=>{
   try {
      console.log(req.body);
   } catch (error) {
      res.status(500).json({message:'Server side error'});
   }
}


// Login the mentor controller
const login = async(req,res)=>{
   try {
      res.status(201).json({});
   } catch (error) {
      res.status(500).json({message:'Server side error'});
   }
}


module.exports =  {
   register,
   login,
   verifyOtp
}