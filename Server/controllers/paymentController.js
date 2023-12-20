const Booking = require('../models/bookingModel');

// Razorpay configuration
const razorpay = require('razorpay');
const razorID_Key = process.env.RAZORPAY_KEY_ID;
const razorSEC_Key = process.env.RAZORPAY_SECRET_ID;


const razorpayInstance = new razorpay({
   key_id:razorID_Key,
   key_secret:razorSEC_Key
})

const bookingSlotPayment = async(req,res)=>{
   try {
      const {fee} = req.body;

      const options = {
         amount:fee*100,
         currency:'INR',
         receipt:'razorUser@gmail.com'
      }

      razorpayInstance.orders.create(options,(err,order)=>{
         if(!err){
            res.status(200).json({
               success:true,
               fee:order.amount,
               key_id:razorID_Key,
               order_id:order.id
            })
         }else{
            console.log(err)
            res.status(400).json({success:false,message:err});
         }
      })
   } catch (error) {
      res.status(500).json({message:'Internal server error'})
   }
}


module.exports = {
   bookingSlotPayment,
}