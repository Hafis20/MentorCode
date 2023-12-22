const express = require('express');
const menteeSlotRouter = express.Router();
const menteeSlotController = require('../controllers/menteeSlotController');
const menteeAuth = require('../middlewares/menteeAuth');  // For mentee authentication

menteeSlotRouter.post('/bookSlot',menteeAuth,menteeSlotController.bookSlot); // For booking mentor slot
menteeSlotRouter.get('/getBookingDetails',menteeAuth,menteeSlotController.getBookingDetails);  // For getting the mentee booking details for showing in the details page
menteeSlotRouter.post('/completeMentorShip',menteeAuth,menteeSlotController.completeMentorShip);  // Completion of mentoring

module.exports = menteeSlotRouter;