const express = require("express");
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');
const authToken = require('../middlewares/auth');

// Login an admin
adminRouter.post('/login',adminController.login);
// Getting all the mentees
adminRouter.get('/getAllMentees',adminController.getAllMentees);
// Getting all the mentors
adminRouter.get('/getAllMentors',adminController.getAllMentors);
// Blocking a mentee
adminRouter.get('/blockMentee',adminController.blockMentee);

module.exports = adminRouter;