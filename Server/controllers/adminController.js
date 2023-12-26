const { comparePass } = require("../Helper/hashPass");
const Admin = require("../models/adminModel");
const Mentee = require("../models/menteeModel");
const Mentor = require("../models/mentorModel");
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
    const { id } = req.body;
    const updatedMenteeData = await Mentee.findByIdAndUpdate(
      id,
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
    const { id } = req.body;
    const menteeData = await Mentee.findByIdAndUpdate(
      id,
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

// Block a mentee
const blockMentor = async (req, res) => {
  try {
    const { id } = req.body;
    const updatedMenteeData = await Mentor.findByIdAndUpdate(
      id,
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
    const { id } = req.body;
    const menteeData = await Mentor.findByIdAndUpdate(
      id,
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

module.exports = {
  login,
  getAllMentees,
  getAllMentors,
  blockMentee,
  unblockMentee,
  blockMentor,
  unblockMentor,
  getAdminData,
};
