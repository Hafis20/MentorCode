const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
   user_id:{
      type:mongoose.Types.ObjectId,
   },
   balance:{
      type:Number
   },
   transactionHistory:[
      {
         amount:{
            type:Number
         },
         dateOfTransaction:{
            type:Date
         }
      }
   ]
})

module.exports = mongoose.model('wallet',walletSchema);