const express = require('express');
const walletRouter = express.Router();   // for wallet routing to controller
const walletController = require('../controllers/walletController');

walletRouter.get('/getWallet',walletController.getUserWallet);

module.exports = walletRouter; 