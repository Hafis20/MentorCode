const express = require("express");
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');

// Admin crud operations swagger
/**
 * @swagger
 * tags:
 *    name: Admin
 *    description: Admin crud operations
 */

// Admin login
/**
 * @swagger
 * /admin/login:
 *    post:
 *       summary: Used to admin login
 *       description: Admin can login to the application
 *       tags:
 *          - Admin
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 */

// Login an admin
adminRouter.post('/login',adminController.login);
// Get admin details to store
adminRouter.get('/getAdminData',adminAuth,adminController.getAdminData);
// Getting all the mentees
adminRouter.get('/getAllMentees',adminAuth,adminController.getAllMentees);
// Getting all the mentors
adminRouter.get('/getAllMentors',adminAuth,adminController.getAllMentors);
// Blocking a mentee
adminRouter.patch('/blockMentee',adminAuth,adminController.blockMentee);
// Unblocking a mentee
adminRouter.patch('/unblockMentee',adminAuth,adminController.unblockMentee);
// Blocking a mentor
adminRouter.patch('/blockMentor',adminAuth,adminController.blockMentor);
// Unblocking a mentor
adminRouter.patch('/unblockMentor',adminAuth,adminController.unblockMentor);
// Users count for admin dashboard
adminRouter.get('/getStatistics',adminAuth,adminController.getStatistics);

module.exports = adminRouter;