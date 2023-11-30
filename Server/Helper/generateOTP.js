const nodemailer = require("nodemailer");

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateMail = async (email) => {
  const otp = generateOtp();

  let transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: "youremail@gmail.com",
    to: email,
    subject: "OTP for Verification",
    text: `Your OTP from MentorCode application: ${otp}`,
  };

  return new Promise((resolve,reject)=>{
   transpoter.sendMail(mailOptions,(err,info)=>{
      if(err){
         reject(err.message)
      }else{
         resolve(otp)
      }
   })
  })
};

module.exports = {
  generateMail,
};
