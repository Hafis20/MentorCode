const Slot = require('../models/slotModel');

const createSlot = async(req,res)=>{
   try {
      const {date,time} = req.body;
      
      res.status(201).json({message:'Slot Added'});
   } catch (error) {
      res.status(500).json({message:'Internal server error'});
   }
}

module.exports = {
   createSlot,
}