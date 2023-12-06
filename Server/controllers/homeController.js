const Mentor = require('../models/mentorModel');

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

module.exports = {
   getAvailableMentors,
}