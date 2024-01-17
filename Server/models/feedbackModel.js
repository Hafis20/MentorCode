const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
   mentor_id:{
      type:mongoose.Types.ObjectId,
      ref:'Mentor'
   },
   feedback:[
      {
         mentee_id:{
            type:mongoose.Types.ObjectId,
            ref:'Mentee'
         },
         rate:{
            type:Number
         },
         comment:{
            type:String,
         }
      }
   ]
})

module.exports = mongoose.model('feedback',feedbackSchema);