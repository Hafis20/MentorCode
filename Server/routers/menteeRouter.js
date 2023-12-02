const express = require('express');
const menteeRouter = express.Router();
const menteeController = require('../controllers/menteeController');

menteeRouter.post('/register',menteeController.register); // For registering a mentee
menteeRouter.post('/resendOtp',menteeController.resendOtp);  // For resending the otp
menteeRouter.post('/verifyOtp',menteeController.verifyOtp);  // For verifying the mentee otp
menteeRouter.post('/login',menteeController.login);  // mentee login

module.exports = menteeRouter;