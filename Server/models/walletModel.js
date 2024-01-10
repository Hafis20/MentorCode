const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
   user_id:{
      type:mongoose.Types.ObjectId,
   },
   balance:{
      type:Number
   },
   transaction_history:[
      {
         amount:{
            type:Number
         },
         date_of_transaction:{
            type:Date
         }
      }
   ]
})

module.exports = mongoose.model('wallet',walletSchema);