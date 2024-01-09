const { generateMail } = require("../Helper/generateOTP");
const { hashedPass, comparePass } = require("../Helper/hashPass");
const Mentor = require("../models/mentorModel");
const jwt = require("jsonwebtoken");
const Skills = require("../models/skillsModel");
const BookedSlot = require("../models/bookingModel");
const { default: mongoose } = require("mongoose");

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
      const mentorSkills = await Skills.create({
        // creating the skills db
        mentor_id: mentorData._id,
        skills: ["Html", "Css", "Javascript"],
        about: `My name is ${name} I am a software developer of ${experience} year experience`,
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
      if (matchPass) {
        // Checking the password is available in mentor data
        if (mentorData.is_blocked) {
          return res
            .status(401)
            .status({ message: "Your account is blocked by Admin" });
        } else {
          const data = {
            userId: mentorData._id,
          };

          const accessToken = jwt.sign(data, process.env.JWT_ACCESS_TOKEN);
          const accessedUser = {
            _id: mentorData._id,
            name: mentorData.name,
            email: mentorData.email,
            image: mentorData.image,
            role: mentorData.role,
          };
          res
            .status(201)
            .json({ accessToken, accessedUser, message: "Login Success" });
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
// Forgot password for mentor
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const mentorData = await Mentor.findOne({ email: email }); // Checking the mentee is available with this mail

    if (mentorData) {
      // If available
      const otp = await generateMail(email); // generate the otp for user verification
      mentorData.otp = otp;
      mentorData.otp_updated_at = new Date();
      mentorData.save(); // Updated the mentee data
      res.status(201).json({ message: "Otp Sended into your email" });
    } else {
      // If mentee data is not available
      res.status(404).json({ message: "Mentor data is not available" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// For changing the mentor password
const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Sorry Password Not changed" });
    } else {
      const hashPass = await hashedPass(password);
      const mentor = await Mentor.findOneAndUpdate(
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
      if (mentor) {
        return res
          .status(201)
          .json({ message: "Password changed please login" }); // Password is changed
      } else {
        return res.status(404).json({ message: "Mentor data not found" }); // If there is no data
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error.message);
  }
};

// Getting the mentor data for store purpose
const getMentorDetails = async (req, res) => {
  try {
    const mentorId = req.mentorId;
    const mentor = await Mentor.findById(mentorId);
    if (mentor) {
      const mentorData = {
        _id: mentor._id,
        name: mentor.name,
        email: mentor.email,
        image: mentor.image,
        role: mentor.role,
      };
      res.status(201).json(mentorData);
    } else {
      res.status(404).json({ message: "Mentor Data not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error.message);
  }
};

// Getting the profile of the mentor
const getMentorProfile = async (req, res) => {
  try {
    // const {mentorId} = req.body;
    const mentorId = req.mentorId;
    let skills = await Skills.findOne({ mentor_id: mentorId });
    if (!skills) {
      skills = await new Skills({
        // If the particular mentor has no skills collection we are creating one,
        mentor_id: mentorId,
        skills: ["Html", "CSS", "Javascript"],
        about: "",
      }).save();
    }
    const mentorData = await Skills.aggregate([
      {
        $match: {
          mentor_id: new mongoose.Types.ObjectId(mentorId),
        },
      },
      {
        $lookup: {
          from: "mentors",
          localField: "mentor_id",
          foreignField: "_id",
          as: "MentorDetails",
        },
      },
      {
        $unwind: "$MentorDetails",
      },
      {
        $project: {
          skills: 1,
          about: 1,
          mentor_id: 1,
          "MentorDetails.name": 1,
          "MentorDetails.experience": 1,
          "MentorDetails.image": 1,
          "MentorDetails.mobile": 1,
          "MentorDetails.fee": 1,
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$MentorDetails", "$$ROOT"],
          },
        },
      },
      {
        $project: {
          MentorDetails: 0,
        },
      },
    ]);

    res.status(201).json(mentorData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Editing the profile of the mentor
const editProfile = async (req, res) => {
  try {
    const mentorId = req.mentorId;
    const { name, mobile, fee, skills, about, experience } = req.body;
    const mentorskill = JSON.parse(skills);
    let mentorDetails = await Mentor.findById(mentorId);

    let imgUrl = mentorDetails.image; // If there is no image in the req.file

    if (req.file) {
      imgUrl = `http://localhost:7000/${req.file.originalname}`;
    }
    const updateMentorSkills = await Skills.findOneAndUpdate(
      // Updating the skills
      {
        mentor_id: mentorId,
      },
      {
        $set: {
          about: about,
          skills: mentorskill,
        },
      },
      {
        new: true,
      }
    );
    if (mentorDetails) {
      mentorDetails.name = name;
      mentorDetails.image = imgUrl;
      mentorDetails.fee = fee;
      mentorDetails.mobile = mobile;
      mentorDetails.experience = experience;
      await mentorDetails.save();
    }
    res.status(200).json({ message: "Edit Success" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error.message);
  }
};

// Data for mentor dashboard
const getStatistics = async (req, res) => {
  try {
    // const {mentorId} = req.body;
    const mentorId = req.mentorId;
    const bookings = await BookedSlot.aggregate([
      {
        $unwind: "$details",
      },
      {
        $match: {
          "details.mentorId": new mongoose.Types.ObjectId(mentorId),
        },
      },
      {
        $group:{
          _id:'$details.status',
          'count':{$sum:1}
        }
      },
    ]);
    let totalSessions;
    Object.entries(bookings).forEach(([key, value]) => {
      // console.log(key, value);
      if (value._id === 'completed') {
        totalSessions = value.count;
      }
    });
    if(!totalSessions){
      totalSessions = 0;
    }
    res.status(200).json({totalSessions,bookings});
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  register,
  login,
  verifyOtp,
  resendOtp,
  forgotPassword,
  changePassword,
  getMentorDetails,
  getMentorProfile,
  editProfile,
  getStatistics,
};
