const express = require('express');
const menteeSlotRouter = express.Router();
const menteeSlotController = require('../controllers/menteeSlotController');
const menteeAuth = require('../middlewares/menteeAuth');  // For mentee authentication


menteeSlotRouter.post('/bookSlot',menteeAuth,menteeSlotController.bookSlot);

module.exports = menteeSlotRouter;