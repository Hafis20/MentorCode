const express = require("express");
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');
const authToken = require('../middlewares/auth');

// Login an admin
adminRouter.post('/login',adminController.login);
// Getting all the mentees
adminRouter.get('/getAllMentees',authToken,adminController.getAllMentees);

module.exports = adminRouter;