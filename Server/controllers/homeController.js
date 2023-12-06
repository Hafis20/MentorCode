const Mentor = require('../models/mentorModel');

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
               fee:1
            }
         }
      ]);
      res.status(200).json(mentors);
   } catch (error) {
      res.status(500).json({message:'Server side error'});
   }
}

module.exports = {
   getAvailableMentors,
}