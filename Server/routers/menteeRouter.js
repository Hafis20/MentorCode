const express = require('express');
const menteeRouter = express.Router();
const menteeController = require('../controllers/menteeController');
const homeController = require('../controllers/homeController');

menteeRouter.post('/register',menteeController.register); // For registering a mentee
menteeRouter.post('/resendOtp',menteeController.resendOtp);  // For resending the otp
menteeRouter.post('/verifyOtp',menteeController.verifyOtp);  // For verifying the mentee otp
menteeRouter.post('/login',menteeController.login);  // mentee login
menteeRouter.get('/getAvailableMentors',homeController.getAvailableMentors); // Getting whole data into mentee page

module.exports = menteeRouter;