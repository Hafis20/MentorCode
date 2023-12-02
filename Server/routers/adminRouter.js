const express = require("express");
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');

// Login an admin
adminRouter.post('/login',adminController.login);

module.exports = adminRouter;