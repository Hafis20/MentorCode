const express = require('express');
const paymentRouter = express.Router();
const paymentController = require('../controllers/paymentController')

paymentRouter.post('/bookingPayment',paymentController.bookingSlotPayment);

module.exports = paymentRouter;