const express = require('express');
const mentorRouter = express.Router();
const mentorController = require('../controllers/mentorController');
const mentorAuth = require('../middlewares/mentorAuth');
const upload = require('../Helper/multer');

/**
 * @swagger
 * tags:
 *    name: Mentor
 *    description: Mentor crud operations
 */
/**
 * @swagger
 * components:
 *    schemas:
 *       MentorLogin:
 *          type: object
 *          properties:
 *             email:
 *                type: string
 *             password:
 *                type: string
 *       MentorLoginResponse:
 *          type: object
 *          properties:
 *             accessToken:
 *                type: string
 *             accessedUser:
 *                type: object
 *                properties:
 *                   _id:
 *                      type: string
 *                   name:
 *                      type: string
 *                   email:
 *                      type: string
 *                   role:
 *                      type: string
 *             message:
 *                type: string
 */

mentorRouter.post('/register',mentorController.register); // Register the mentor
mentorRouter.post('/resendOtp',mentorController.resendOtp); // Resend the otp
mentorRouter.post('/verifyOtp',mentorController.verifyOtp); // Verifying the otp of the mentor

/**
 * @swagger
 * /mentor/login:
 *    post:
 *       summary: Used to mentor login
 *       description: Using email and password mentor can login 
 *       tags:
 *          - Mentor
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/MentorLogin'
 *       responses:
 *          201:
 *             description: Login success
 *             content:
 *                applcation/json:
 *                   schema:
 *                      $ref: '#components/schemas/MentorLoginResponse'
 */
mentorRouter.post('/login',mentorController.login); // Login the mentor
mentorRouter.post('/forgot-password',mentorController.forgotPassword);
mentorRouter.patch('/change-password',mentorController.changePassword);
mentorRouter.get('/getMentor',mentorAuth,mentorController.getMentorDetails);
mentorRouter.get('/getMentorProfile',mentorAuth,mentorController.getMentorProfile);
mentorRouter.post('/editProfile',mentorAuth, upload.single('image'), mentorController.editProfile);
mentorRouter.get('/getStatistics',mentorAuth,mentorController.getStatistics);


module.exports = mentorRouter;