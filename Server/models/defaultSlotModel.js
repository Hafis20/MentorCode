const mongoose = require('mongoose');

const defaultSlotSchema = new mongoose.Schema({
   mentorId:{
      type:mongoose.Types.ObjectId,
      ref:'mentor'
   },
   defaultSlots:[],
})

module.exports = mongoose.model('defaultSlot',defaultSlotSchema);