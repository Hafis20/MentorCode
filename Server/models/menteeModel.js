const mongoose = require('mongoose');

const menteeSchema = new mongoose.Schema({
   name:{
      type:String
   },
   mobile:{
      type:String
   },
   email:{
      type:String
   },
   password:{
      type:String
   },
   otp:{
      type:Number,
   },
   otp_updated_at: {
      type: Date,
   },
   is_verified:{
      type:Boolean,
      default:false,
   },
   role:{
      type:String,
      default:'mentee'
   },
   is_blocked: {
      type: Boolean,
      default: false,
   }
})

module.exports = mongoose.model('Mentee',menteeSchema);