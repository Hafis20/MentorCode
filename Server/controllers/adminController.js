const { comparePass } = require("../Helper/hashPass");
const Admin = require("../models/adminModel");
const Mentee = require("../models/menteeModel");
const Mentor = require("../models/mentorModel");
const BookedSlots = require('../models/bookingModel');
const jwt = require("jsonwebtoken");

// Login Admin
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminData = await Admin.findOne({ email: email });
    // Checking the all possibilities
    if (adminData) {
      // checking the password is correct
      const matchPass = await comparePass(password, adminData.password);
      if (matchPass) {
        if (adminData.role === "admin") {
          // creating a body
          const data = {
            userId: adminData._id,
          };
          // making a jwt token
          const accessToken = jwt.sign(data, process.env.JWT_ACCESS_TOKEN);
          // Creating admin details
          const accessedUser = {
            _id: adminData._id,
            name: adminData.name,
            role: adminData.role,
          };
          res
            .status(201)
            .json({ accessToken, accessedUser, message: "Login success" });
        } else {
          res.status(404).json({ message: "Invalid Credentials" });
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

// Get admin details for store action
const getAdminData = async (req, res) => {
  try {
    // console.log(req.adminId);
    const adminId = req.adminId;
    const adminData = await Admin.findById(adminId);
    if (adminData) {
      const admin = {
        _id: adminData._id,
        name: adminData.name,
        role: adminData.role,
      };
      res.status(200).json( admin );
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all Mentees
const getAllMentees = async (req, res) => {
  try {
    // console.log('Admin Id : ',req.adminId);
    const menteesData = await Mentee.find(
      {},
      { password: 0, otp: 0, otp_updated_at: 0 }
    );
    // console.log(menteesData);
    res.status(200).json(menteesData);
  } catch (error) {
    res.status(500).json({ message: "Server side error" });
    console.log(error.message);
  }
};

// Get all mentors
const getAllMentors = async (req, res) => {
  try {
    const mentorsData = await Mentor.find(
      {},
      { password: 0, otp: 0, otp_updated_at: 0 }
    );
    res.status(200).json(mentorsData);
  } catch (error) {
    res.status(500).json({ message: "Server side error" });
  }
};

// Block a mentee
const blockMentee = async (req, res) => {
  try {
    const { menteeId } = req.body;
    const updatedMenteeData = await Mentee.findByIdAndUpdate(
      menteeId,
      {
        $set: {
          is_blocked: true,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Successfully Blocked" });
  } catch (error) {
    res.status(500).json({ message: "Server side error" });
    console.log(error.message);
  }
};

// Unblocking a mentee
const unblockMentee = async (req, res) => {
  try {
    const { menteeId } = req.body;
    const updatedMenteeData = await Mentee.findByIdAndUpdate(
      menteeId,
      {
        $set: {
          is_blocked: false,
        },
      },
      {
        new: true,
      }
    );
    console.log(updatedMenteeData)
    res.status(200).json({ message: "Successfull Unblock" });
  } catch (error) {
    res.status(500).json({ message: "Server side error" });
  }
};

// Block a mentee
const blockMentor = async (req, res) => {
  try {
    const { mentorId } = req.body;
    console.log(req.body)
    const updatedMenteeData = await Mentor.findByIdAndUpdate(
      mentorId,
      {
        $set: {
          is_blocked: true,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Successfully Blocked" });
  } catch (error) {
    res.status(500).json({ message: "Server side error" });
    console.log(error.message);
  }
};

// Unblocking a mentee
const unblockMentor = async (req, res) => {
  try {
    const { mentorId } = req.body;
    const menteeData = await Mentor.findByIdAndUpdate(
      mentorId,
      {
        $set: {
          is_blocked: false,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({ message: "Successfull Unblock" });
  } catch (error) {
    res.status(500).json({ message: "Server side error" });
  }
};

//Count of mentee and mentor in admin side
const getStatistics = async(req,res)=>{
  try {
    const noOfMentors = await Mentor.find().countDocuments();
    const noOfMentees = await Mentee.find().countDocuments();

    // Booking details
    const bookingDetails = await BookedSlots.aggregate([
      {
        $unwind:'$details',
      },
      {
        $group:{
          _id:'$details.status',
          'count':{$sum:1}
        }
      },
    ]);
    
    res.status(200).json({noOfMentors,noOfMentees,bookingDetails});
  } catch (error) {
    res.status(500).json({message:'Internal Server error'});
  }
}

// Get the booking details for the admin side table
const getBookingDetails = async(req,res)=>{
  try {
    const bookingDetails = await BookedSlots.aggregate([
      {
        $unwind:'$details',
      },
      {
        $lookup:{
          from:'mentors',
          localField:'details.mentorId',
          foreignField:'_id',
          as:'MentorDetails'
        }
      },
      {
        $lookup:{
          from:'mentees',
          localField:'menteeId',
          foreignField:'_id',
          as:'MenteeDetails'
        }
      },
      {
        $unwind:'$MenteeDetails',
      },
      {
        $unwind:'$MentorDetails',
      },
      {
        $project:{
          '_id':1,
          'details.date':1,
          'details.time':1,
          'details.fee':1,
          'details.status':1,
          'MentorDetails.name':1,
          'MenteeDetails.name':1,
        }
      }
    ]);
    res.status(200).json(bookingDetails)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message:'Internal server error'});
  }
}
module.exports = {
  login,
  getAllMentees,
  getAllMentors,
  blockMentee,
  unblockMentee,
  blockMentor,
  unblockMentor,
  getAdminData,
  getStatistics,
  getBookingDetails,
};
