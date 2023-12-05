const express = require("express");
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');

// Login an admin
adminRouter.post('/login',adminController.login);
// Getting all the mentees
adminRouter.get('/getAllMentees',adminAuth,adminController.getAllMentees);
// Getting all the mentors
adminRouter.get('/getAllMentors',adminAuth,adminController.getAllMentors);
// Blocking a mentee
adminRouter.patch('/blockMentee',adminAuth,adminController.blockMentee);
// Unblocking a mentee
adminRouter.patch('/unblockMentee',adminAuth,adminController.unblockMentee);
// Blocking a mentor
adminRouter.patch('/blockMentor',adminAuth,adminController.blockMentor);
// Unblocking a mentor
adminRouter.patch('/unblockMentor',adminAuth,adminController.unblockMentor);

module.exports = adminRouter;