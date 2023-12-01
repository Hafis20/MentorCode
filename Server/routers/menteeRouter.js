const express = require('express');
const menteeRouter = express.Router();
const menteeController = require('../controllers/menteeController');

menteeRouter.post('/register',menteeController.register);
menteeRouter.post('/resendOtp',menteeController.resendOtp);
menteeRouter.post('/verifyOtp',menteeController.verifyOtp);
menteeRouter.post('/login',menteeController.login);

module.exports = menteeRouter;