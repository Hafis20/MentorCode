const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
   menteeId:{
      type:mongoose.Schema.ObjectId,
      ref: 'Mentee'
   },
   details:[
      {
         mentorId:{
            type:mongoose.Schema.ObjectId,
            ref: 'Mentor'
         },
         date:{
            type:String
         },
         time:{
            type:String
         },
         fee:{
            type:Number
         },
         status:{
            type:String,
            default:'pending'
         }
      }
   ]
})

module.exports = mongoose.model('booking',bookingSchema);