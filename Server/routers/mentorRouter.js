const express = require('express');
const mentorRouter = express.Router();
const mentorController = require('../controllers/mentorController');

mentorRouter.post('/register',mentorController.register); // Register the mentor
mentorRouter.post('/resendOtp',mentorController.resendOtp); // Resend the otp
mentorRouter.post('/verifyOtp',mentorController.verifyOtp); // Verifying the otp of the mentor
mentorRouter.post('/login',mentorController.login); // Login the mentor
mentorRouter.post('/forgot-password',mentorController.forgotPassword);
mentorRouter.patch('/change-password',mentorController.changePassword);

module.exports = mentorRouter;