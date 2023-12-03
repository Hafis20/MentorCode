const express = require('express');
const mentorRouter = express.Router();
const mentorController = require('../controllers/mentorController');

mentorRouter.post('/register',mentorController.register); // Register the mentor
mentorRouter.post('/verify-otp',mentorController.verifyOtp); // Verifying the otp of the mentor
mentorRouter.post('/login',mentorController.login); // Login the mentor

module.exports = mentorRouter;