const Admin = require('../models/adminModel');

const getAdminData = async()=>{
   let adminData = await Admin.findOne({role:'admin'});   // Take the admin data
   return adminData;
}

module.exports = getAdminData;