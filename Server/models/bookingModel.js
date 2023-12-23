const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
   menteeId:{
      type:mongoose.Schema.ObjectId,
      ref: 'Mentee'
   },
   details:[
      {
         mentorId:{
            type:mongoose.Types.ObjectId,
            ref: 'Mentor'
         },
         slot_id:{
            type:mongoose.Types.ObjectId,
            ref:'slots.added_slots'
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
         payment_id:{
            type:String
         },
         status:{
            type:String,
            default:'pending'
         }
      }
   ]
})

module.exports = mongoose.model('booking',bookingSchema);