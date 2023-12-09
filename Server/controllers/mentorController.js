const { generateMail } = require("../Helper/generateOTP");
const { hashedPass, comparePass } = require("../Helper/hashPass");
const Mentor = require("../models/mentorModel");
const jwt = require("jsonwebtoken");

// Registering the mentor controller
const register = async (req, res) => {
  try {
    const { name, email, password, mobile, experience } = req.body; // Getting the whole mentor data

    // Checking the email is already existing or not
    const mentor = await Mentor.find({ email });
    if (mentor.length > 0) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      const hPass = await hashedPass(password); // Hashing the password for security
      const otp = await generateMail(email); // Sending the otp into the mentor mail
      // Creating a mentor
      const mentorData = await Mentor.create({
        name: name,
        email: email,
        password: hPass,
        mobile: mobile,
        experience: experience,
        otp: otp,
        otp_updated_at: new Date(),
      });
      res.status(201).json({ message: "Check your mail... Verify your otp" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server side error" });
    console.log(error.message);
  }
};

// Resend otp
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = await generateMail(email);

    const updateMentorData = await Mentor.findOneAndUpdate(
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
    res.status(201).json({ message: "Check your mail... Otp sended" });
  } catch (error) {
    res.status(500).json({ message: "Server side error" });
  }
};

// Verifying the mentor otp or Validating the otp
const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;

    const mentorData = await Mentor.findOne({ email: email });

    if (mentorData.otp !== Number(otp)) {
      return res.status(400).json({ message: "Incorrect OTP" });
    } else {
      const OTP_EXPIRY_SECONDS = 30;

      // Checking the timer
      const timeDifferenceInSeconds = Math.floor(
        (new Date() - mentorData.otp_updated_at) / 1000
      );

      if (timeDifferenceInSeconds > OTP_EXPIRY_SECONDS) {
        return res.status(400).json({ message: "OTP Expired" });
      } else {
        mentorData.is_verified = true;
        await mentorData.save();
        return res
          .status(201)
          .json({ message: "Account verified go to Login" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server side error" });
    console.log(error.message);
  }
};

// Login the mentor controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Destructuring the data from body

    const mentorData = await Mentor.findOne({ email }); // Searching this user is avaliable in the database
    if (mentorData) {
      const matchPass = await comparePass(password, mentorData.password); // Checking the passwords are same
      if (matchPass) {  // Checking the password is available in mentor data
        if(mentorData.is_blocked){
          return res.status(401).status({message:'Your account is blocked by Admin'})
        }else{
          const data = {
            userId: mentorData._id,
          };
  
          const accessToken = jwt.sign(data, process.env.JWT_ACCESS_TOKEN);
          const accessedUser = {
            _id:mentorData._id,
            name: mentorData.name,
            email: mentorData.email,
            role: mentorData.role,
          };
          res.status(201).json({accessToken,accessedUser,message:'Login Success'});
        }
        
      } else {
        res.status(404).json({ message: "Invalid Credentials" });
      }
    } else {
      res.status(404).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server side error" });
  }
};

// Forgot password
// Forgot password for mentee
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const menteeData = await Mentor.findOne({ email: email }); // Checking the mentee is available with this mail

    if (menteeData) {
      // If available
      const otp = await generateMail(email); // generate the otp for user verification
      menteeData.otp = otp;
      menteeData.otp_updated_at = new Date();
      menteeData.save(); // Updated the mentee data
      res.status(201).json({ message: "Otp Sended into your email" });
    } else {
      // If mentee data is not available
      res.status(404).json({ message: "Mentee data is not available" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// For changing the mentor password
const changePassword = async(req,res)=>{
  try {
    const {email,password} = req.body;
    if(!email){
      return res.status(400).json({message:'Sorry Password Not changed'});
    }else{
      const hashPass = await hashedPass(password);
      const mentor = await Mentor.findOneAndUpdate({email:email},
        {
          $set:{
            password:hashPass
          }
        },
        {
          new:true
        }
      )
      if(mentor){
        return res.status(201).json({message:'Password changed please login'});  // Password is changed
      }else{
        return res.status(404).json({message:'Mentor data not found'});   // If there is no data
      }
    }

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error.message);
  }
}

module.exports = {
  register,
  login,
  verifyOtp,
  resendOtp,
  forgotPassword,
  changePassword
};
