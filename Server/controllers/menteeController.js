// JWT webtoken configuration
const jwt = require("jsonwebtoken");
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
        otp_updated_at: new Date(),
      });
      res.status(201).json({ message: "Check your mail... Verify your otp" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server side error" });
    console.log(error.message);
  }
};

// Mentee resend OTP
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = await generateMail(email);

    const updateMenteeData = await Mentee.findOneAndUpdate(
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
    if (updateMenteeData) {
      res.status(201).json({ message: "Successfully send new otp" });
    } else {
      res.status(404).json({ message: "Mentee Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

// Verify the otp and verify the user
const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;

    const menteeData = await Mentee.findOne({ email: email });

    if (menteeData.otp !== Number(otp)) {
      return res.status(400).json({ message: "Incorrect OTP" });
    } else {
      const OTP_EXPIRY_SECONDS = 30;

      // Checking the timer
      const timeDifferenceInSeconds = Math.floor(
        (new Date() - menteeData.otp_updated_at) / 1000
      );

      if (timeDifferenceInSeconds > OTP_EXPIRY_SECONDS) {
        return res.status(400).json({ message: "OTP Expired" });
      } else {
        menteeData.is_verified = true;
        await menteeData.save();
        return res
          .status(201)
          .json({ message: "Account verified go to Login" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server side error" });
  }
};

// Login the mentee
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const menteeData = await Mentee.findOne({ email: email });

    if (menteeData) {
      // Checking the user password is match with saved pass
      const matchPass = await comparePass(password, menteeData.password);
      if (matchPass) {
        // Checking the user is blocked or not if blocked throw error message;
        if (menteeData.is_blocked) {
          return res
            .status(401)
            .json({ message: "Your account is blocked by Admin" });
        } else {
          const data = {
            userId: menteeData._id,
          };
          // Generate jwt token
          const accessToken = jwt.sign(data, process.env.JWT_ACCESS_TOKEN);
          // Send the correct mentee details into store
          const accessedUser = {
            name: menteeData.name,
            email: menteeData.email,
            role: menteeData.role,
          };
          res.status(201).json({
            accessToken,
            accessedUser,
            message: "Login successfull",
          });
        }
      } else {
        res.status(400).json({ message: "Email or password is invalid" });
      }
    } else {
      res.status(404).json({ message: "Email or password is invalid" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server side error" });
  }
};

// Forgot password for mentee
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const menteeData = await Mentee.findOne({ email: email }); // Checking the mentee is available with this mail

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

// change password of the mentee from forgot password
const changePassword = async(req,res)=>{
  try {
    const {email,password} = req.body;
    if(!email){
      res.status(400).json({message:'Sorry Password Not changed'});
    }else{
      const hashPass = await hashedPass(password);
      const mentee = await Mentee.findOneAndUpdate({email:email},
        {
          $set:{
            password:hashPass
          }
        },
        {
          new:true
        }
      )
    }
    res.status(201).json({message:'Password changed please login'});  // Password is changed
  } catch (error) {
    res.status(500).json({message:'Internal Server Error'});
    console.log(error.message)
  }
}

// Get mentee data
const getMenteeDetails = async(req,res)=>{
  try {
    const menteeId = req.menteeId;
    const menteeData = await Mentee.findById(menteeId);
    // console.log(menteeData);
    const mentee = {
      _id:menteeData._id,
      name:menteeData.name,
      email:menteeData.email,
      role:menteeData.role
    }
    res.status(201).json(mentee);
  } catch (error) {
    res.status(500).json({message:'Internal Server Error'});
  }
}

module.exports = {
  register,
  login,
  resendOtp,
  verifyOtp,
  forgotPassword,
  changePassword,
  getMenteeDetails,
};
