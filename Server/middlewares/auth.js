const jwt = require('jsonwebtoken');

const authToken = async(req,res,next)=>{
   try {
      const authHeader = req.headers['Authorization'];
      const token = authHeader &&  authHeader.split(' ')[1];

      if(token == null) return res.status(401).json({error:'Token Error'});
      const ptok=JSON.parse(token)

      // Verify the token
      jwt.verify(ptok,process.env.ACCESS_TOKEN_SECRET,(err,userId)=>{
         if(err) {
            console.log(err.message);
            return res.status(403).json({error:'Token Error'})
         }
         req.userId = userId;
         next()
      });
   } catch (error) {
      res.status(500).json({error:'Server side error'});
   }
}

module.exports = authToken;