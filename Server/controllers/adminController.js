const { comparePass } = require("../Helper/hashPass");
const Admin = require("../models/adminModel");
const Mentee = require('../models/menteeModel');
const jwt = require('jsonwebtoken');

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
            userId:adminData._id,
         }
         // making a jwt token
         const accessToken = jwt.sign(data,process.env.JWT_ACCESS_TOKEN);
         // Creating admin details
         const accessedMentee = {
            name:adminData.name,
            role:adminData.role,
         }
         res.status(201).json({accessToken,accessedMentee,message:'Login success'});
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

// Get all Mentees
const getAllMentees = async(req,res)=>{
  try {
    console.log('Admin Id : ',req.userId);
    const menteesData = await Mentee.find({},{name:1,email:1,role:1,_id:0});
    console.log(menteesData);
    res.status(200).json({menteesData});
  } catch (error) {
    res.status(500).json({message:'Server side error'});
    console.log(error.message);
  }
}
module.exports = {
   login,
   getAllMentees,
};
