const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
   user_id:{
      type:mongoose.Types.ObjectId,
   },
   balance:{
      type:Number
   },
   transaction_history:[]
})

module.exports = mongoose.model('wallet',walletSchema);