const jwt = require('jsonwebtoken');

const mentorAuth = async(req,res,next)=>{
   const authHeader = req.headers["authorization"]; 
   if(authHeader && authHeader.startsWith('Mentor-Bearer')){
      const token = authHeader.split(' ')[1] // Getting token from token

      try {
         const decoded = jwt.verify(token,process.env.JWT_ACCESS_TOKEN,(err,mentor)=>{
            if(err){
               console.log(err);
               return res.status(404).json({message: 'Unauthorized'})
            }else{
               req.mentorId = mentor.userId;
               next();
            }
         })
      } catch (error) {
         res.status(500).json({message:'Unauthorized'});
      }
   }else{
      res.status(500).json({message:'Unauthorized'});
   }
   
}

module.exports = mentorAuth;