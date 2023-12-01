// JWT webtoken configuration
const jwt = require('jsonwebtoken');
const { generateMail } = require("../Helper/generateOTP");
const { hashedPass, comparePass } = require("../Helper/hashPass");
const Mentee = require("../models/menteeModel");

// Registering the mentee

const register = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    // Checking the email already exists or not
    const mentee = await Mentee.find({ email });
    if (mentee.length > 0) {
      res.status(400).json({ message: "Email Already Exists" });
    } else {
      // getting hashed password
      const hashPass = await hashedPass(password);
      // getting otp from the node mailer
      const otp = await generateMail(email);

      const menteeData = await Mentee.create({
        name: name,
        mobile: mobile,
        email: email,
        password: hashPass,
        otp: otp,
      });
      res.status(201).json({ message: "Check your mail... Verify your otp" });
    }
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};

// Mentee resend OTP
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = await generateMail(email);

    const menteeData = await Mentee.findOneAndUpdate(
      {
        email: email,
      },
      {
        $set: {
          otp: otp,
        },
        $currentDate: {
          otp_updated_at: true,
        },
      }
    );
    res.status(201).json({ message: "Successfully send new otp" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Verify the otp and verify the user
const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;

    const menteeData = await Mentee.findOne({ email: email });

    if (menteeData.otp === Number(otp)) {
      // Checking the otp is expired or not
      const timeDifferenceInSeconds = Math.floor(
        (new Date() - menteeData.otp_updated_at) / 1000
      );
      if (timeDifferenceInSeconds > 30) {
        return res.status(400).json({ message: "OTP Expired" });
      } else {
        menteeData.is_verified = true;
        await menteeData.save();
        return res
          .status(201)
          .json({ message: "Account verified go to Login" });
      }
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server side error" });
  }
};

// Login the mentee
const login = async (req, res) => {
  try {
   const {email,password} = req.body;
   const menteeData = await Mentee.findOne({email:email});

   if(menteeData){
      // Checking the user password is match with saved pass
      const matchPass = await comparePass(password,menteeData.password);
      if(matchPass){
         const data = {
            userId:menteeData._id,
         }
         // Generate jwt token
         const accessToken = jwt.sign(data,process.env.JWT_ACCESS_TOKEN);
         // Send the correct mentee details into store
         const accessedMentee = {
            name:menteeData.name,
            email:menteeData.email,
            mobile:menteeData.mobile,
            role:menteeData.role
         }
         res.status(201).json({accessToken,accessedMentee,message:'Login successfull'});
      }else{
         res.status(400).json({message:'Email or password is invalid'})
      }
   }else{
      res.status(404).json({message:'Invalid Mentee'});
   }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  register,
  login,
  resendOtp,
  verifyOtp,
};
