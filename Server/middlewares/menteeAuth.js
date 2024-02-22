const jwt = require('jsonwebtoken');

// Mentee token authentication middleware

const menteeAuth = async(req,res,next)=>{
   const authHeader = req.headers['authorization'];
   if(authHeader && authHeader.startsWith('Mentee-Bearer')){
      const token = authHeader.split(' ')[1];    // Getting token from the header

      try {
         const decoded = jwt.verify(token,process.env.JWT_ACCESS_TOKEN,(err,mentee)=>{
            if(err){
               res.status(401).json({message:'Unauthorized'});
            }else{
               req.menteeId = mentee.userId;
               next();
            }
         })
      } catch (error) {
         res.status(401).json({message:'Unauthorized'});
      }
   }else{
      res.status(401).json({message:'Unauthorized'});
   }
}

module.exports = menteeAuth