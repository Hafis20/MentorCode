const Slot = require('../models/slotModel');
const BookedSlot = require('../models/bookingModel');

const bookSlot = async(req,res)=>{
   try {
      const menteeId = req.menteeId;
      const {mentorId,slotDate,slotTime} = req.body
      let bookedSlot = await BookedSlot.findOne({menteeId:menteeId});  // We are checking the mentee have already a doc
      let slot = await Slot.findOneAndUpdate({mentor_id:mentorId, slot_date:slotDate});    //Taking the slot 
      if(slot){
         slot.added_slots.map((date)=>{    // We are taking the slot to change the feild of is_booked into true;
            if(date.time === slotTime){
               date.is_booked = true;
            }
         }); 
         await slot.save();
      }else{
         return res.status(404).json({message:'Slot not available'});
      }
      const data = {   //it is the data for adding it is slot details
         mentorId:mentorId,
         date:slotDate,
         time:slotTime
      };

      if(bookedSlot){  // if already exists
         bookedSlot.details.push(data);
      }else{
         bookedSlot = new BookedSlot({
            menteeId:menteeId,
            details:[data],
         })
      }
      let updatedData = await bookedSlot.save();
      res.status(201).json({message:'Slot booked'});
   } catch (error) {
      res.status(500).json({message:'Internal Server Error'});
      console.log(error.message);
   }
}

module.exports = {
   bookSlot,
}