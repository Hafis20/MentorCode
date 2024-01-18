// JWT webtoken configuration
const jwt = require("jsonwebtoken");
const { generateMail } = require("../Helper/generateOTP");
const { hashedPass, comparePass } = require("../Helper/hashPass");
const Mentee = require("../models/menteeModel");
const Feedback = require("../models/feedbackModel");
const Bookings = require('../models/bookingModel');
const { default: mongoose } = require("mongoose");

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
const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ message: "Sorry Password Not changed" });
    } else {
      const hashPass = await hashedPass(password);
      const mentee = await Mentee.findOneAndUpdate(
        { email: email },
        {
          $set: {
            password: hashPass,
          },
        },
        {
          new: true,
        }
      );
    }
    res.status(201).json({ message: "Password changed please login" }); // Password is changed
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
  }
};

// Get mentee data
const getMenteeDetails = async (req, res) => {
  try {
    const menteeId = req.menteeId;
    const menteeData = await Mentee.findById(menteeId);
    // console.log(menteeData);
    const mentee = {
      _id: menteeData._id,
      name: menteeData.name,
      email: menteeData.email,
      role: menteeData.role,
    };
    res.status(201).json(mentee);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get mentee profile
const getProfile = async(req,res)=>{
  try {
    const menteeId = req.menteeId;
    const menteeProfile = await Mentee.findById(menteeId);
    const data = {
      _id:menteeProfile._id,
      name:menteeProfile.name,
      mobile:menteeProfile.mobile,
      email:menteeProfile.email,
      image:menteeProfile.image,
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({message:'Internal server error'});
  }
}

// edit profile mentee
const editProfile = async(req,res)=>{
  try {
    const menteeId = req.menteeId;
    const {name,mobile} = req.body;
    let menteeDetails = await Mentee.findById(menteeId);

    let imgUrl = menteeDetails.image;

    if(req.file){
      imgUrl = `http://localhost:7000/${req.file.originalname}`;
    }
    
    const updateData = await Mentee.findByIdAndUpdate(
      menteeId,
      {
        $set:{
          name:name,
          mobile:mobile,
          image:imgUrl,
        }
      },
      {
        new:true,
      }
    )
    res.status(200).json({message:'Edit success'})
  } catch (error) {
    res.status(500).json({message:"Internal server error"});
  }
}

// Once session completed
const onceCompleted = async(req,res)=>{
  try {
    // console.log(req.body);
    const { mentorId,menteeId} = req.body;
    
    const bookingData = await Bookings.aggregate([
      {
        $match:{
          menteeId:new mongoose.Types.ObjectId(menteeId)
        }
      },
      {
        $unwind:'$details'
      },
      {
        $match:{
          'details.mentorId':new mongoose.Types.ObjectId(mentorId),
          'details.status':'completed'
        }
      },
    ])
    if(bookingData.length > 0){
      res.status(200).json({btnEnable:true});
    }else{
      res.status(200).json({btnEnable:false});
    }
  } catch (error) {
    res.status(500).json({message:'Internal Server Error'});
  }
}

// Set feedback for mentor
const setFeedback = async (req, res) => {
  try {
    // console.log(req.body);
    const { rate, comment, mentorId, menteeId } = req.body;
    const rateInNum = parseInt(rate);

    const data = {
      mentee_id: menteeId,
      rate: rateInNum,
      comment: comment,
    };

    let mentorFeedback = await Feedback.findOne({ mentor_id: mentorId });
    if (!mentorFeedback) {
      mentorFeedback = new Feedback({
        mentor_id: mentorId,
        feedback: [data],
      });
    } else {
      let item = 0;
      mentorFeedback.feedback.forEach((feedback) => {
        if (feedback.mentee_id.equals(menteeId)) {
          feedback.rate = rate;
          feedback.comment = comment;
          item++;
        }
      });
      if (item === 0) {
        mentorFeedback.feedback.push(data);   // IF no data available
      }
    }
    await mentorFeedback.save();

    res.status(200).json({ message: "Thank you for your feedback"});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get the feedback and mentor
const getFeedback = async(req,res)=>{
  try {
    const {mentorId} = req.body;
    const feedback = await Feedback.findOne({mentor_id:mentorId}).populate('feedback.mentee_id');
    
    let totalRating = 0;
    let totalComments = [];
    let totalReview = 0;
    if(feedback){
      totalRating = (feedback.feedback.reduce((acc,rate)=>acc+rate.rate,0))/feedback.feedback.length ;
      totalComments = feedback.feedback.map((user)=>{
        return {
          mentee:user.mentee_id.name,
          image:user.mentee_id.image,
          comment:user.comment,
        }
      });
      totalReview = feedback.feedback.length;
    }

    const data = {
      rating:totalRating,
      comments:totalComments,
      totalPersons:totalReview
    }
    console.log(data)
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({message:'Internal server error'});
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
  getProfile,
  editProfile,
  onceCompleted,
  setFeedback,
  getFeedback
};
