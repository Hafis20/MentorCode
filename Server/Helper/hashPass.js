const bcrypt = require('bcrypt');

module.exports ={
   hashedPass:async(password)=>{
      try {
         const hashedPass = await bcrypt.hash(password,10);
         return hashedPass;
      } catch (error) {
         console.log(error.message);
      }
   }
}