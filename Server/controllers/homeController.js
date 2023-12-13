const Mentor = require('../models/mentorModel');
const Slot = require('../models/slotModel');

// Take the data from db and send to the home of (find a mentor) mentee
const getAvailableMentors = async(req,res)=>{
   try {
      const mentors = await Mentor.aggregate([
         {
            $match:{
               is_blocked:false,
               is_verified:true
            }
         },
         {
            $project:{
               name:1,
               experience:1,
               fee:1,
               image:1
            }
         }
      ]);
      res.status(200).json(mentors);
   } catch (error) {
      res.status(500).json({message:'Server side error'});
   }
}

// Get the mentee prefered mentor
const getMentor = async(req,res)=>{
   try {
      const mentorId = req.query.id;
      const mentorData = await Mentor.findById(mentorId,{name:1,fee:1,experience:1});
      res.status(201).json(mentorData);
   } catch (error) {
      res.status(500).json({message:'Internal Server Error'});
      console.log(error.message);
   }
}

// Get the available slots of the mentor
const getMentorSlots = async(req,res) =>{
   try {
      const mentorId = req.query.id;   // Getting the mentor id from query
      const mentorSlots = await Slot.find({mentor_id:mentorId},{_id:0,mentor_id:0,createdAt:0,updatedAt:0});
      const filterSlots = mentorSlots.filter((slots)=>slots.added_slots.length > 0)
      const response = filterSlots.map((doc)=>{
         return {slot_date:doc.slot_date,slots:doc.added_slots}
      })
      res.status(201).json({message:'Successfull find data',response});
   } catch (error) {
      res.status(500).json({message:'Internal server error'});
   }
}

module.exports = {
   getAvailableMentors,
   getMentor,
   getMentorSlots,
}