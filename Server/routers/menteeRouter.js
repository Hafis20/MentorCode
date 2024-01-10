const express = require("express");
const menteeRouter = express.Router();
const menteeController = require("../controllers/menteeController");
const homeController = require("../controllers/homeController");
const menteeAuth  = require('../middlewares/menteeAuth');
const upload = require('../Helper/multer');
// Tag name definition
/**
 * @swagger
 * tags:
 *    name: Mentee
 *    description: Mentee crud operations
 */

// Components schema defining
/**
 * @swagger
 * components:
 *    schemas:
 *       ResponseMessage:
 *          type: object
 *          properties:
 *             message:
 *                type: string
 *       RegisterMentee:
 *          type: object
 *          properties:
 *             name:
 *                type: string
 *             email:
 *                type: string
 *             mobile:
 *                type: string
 *             password:
 *                type: string
 *       GetMentors:
 *          type: object
 *          properties:
 *             _id:
 *                type: string
 *             name:
 *                type: string
 *             experience:
 *                type: string
 *             fee:
 *                type: integer
 *       LoginMentee:
 *          type: object
 *          properties:
 *             email:
 *                type: string
 *             password:
 *                type: string
 *       LoginResponse:
 *          type: object
 *          properties:
 *             accessedToken:
 *                type: string
 *             accessedUser:
 *                type: object
 *                properties:
 *                   name:
 *                      type: string
 *                   email:
 *                      type: string
 *                   role:
 *                      type: string
 *             message:
 *                type: string
 */

// Get available mentors doc
/**
 * @swagger
 * /mentee/getAvailableMentors:
 *    get:
 *       summary: Used to Fetch mentor data
 *       description: Fetch the mentor data for showing the mentee side
 *       tags:
 *          - Mentee
 *       responses:
 *          200:
 *             description: Fetch Success
 *             content:
 *                application/json:
 *                   schema:
 *                      type: array
 *                      items:
 *                         $ref: '#components/schemas/GetMentors'
 */

menteeRouter.get("/getAvailableMentors", homeController.getAvailableMentors); // Getting whole data into mentee page

// Mentee register doc
/**
 * @swagger
 * /mentee/register:
 *    post:
 *       summary: Used to register mentee
 *       description: Register the mentee and store the data into mongdb
 *       tags:
 *          - Mentee
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/RegisterMentee'
 *       responses:
 *          201:
 *             description: Check your mail...verify your otp
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/ResponseMessage'
 */
menteeRouter.post("/register", menteeController.register); // For registering a mentee

// Mentee Resend otp doc
/**
 * @swagger
 * /mentee/resendOtp:
 *    post:
 *       summary: Used to resend mentee otp
 *       description: When the mentee clicks on resend otp we should provide them 
 *       tags:
 *          - Mentee
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      email:
 *                         type: string
 *       responses:
 *          201:
 *             description: Successfully send new otp
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/ResponseMessage'
 *          404:
 *             description: Mentee data not found
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/ResponseMessage'
 *          500:
 *             description: Internal Server
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/ResponseMessage'
 */
menteeRouter.post("/resendOtp", menteeController.resendOtp); // For resending the otp
menteeRouter.post("/verifyOtp", menteeController.verifyOtp); // For verifying the mentee otp

// Mentee Login doc
/**
 * @swagger
 * /mentee/login:
 *    post:
 *       summary: Used to Mentee Login
 *       description: Mentee can login using with email and password
 *       tags:
 *          - Mentee
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/LoginMentee'
 *       responses:
 *          201:
 *             description: Successfull Login
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/LoginResponse'
 */
menteeRouter.post("/login", menteeController.login); // mentee login

// Forgot password doc
/**
 * @swagger
 * /mentee/forgot-password:
 *    post:
 *       summary: Used to forgot password
 *       description: When the mentee click on the forgot password we will get one email and send an otp
 *       tags:
 *          - Mentee
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      email:
 *                         type: string
 *       responses:
 *          201:
 *             description: Otp sended to your email
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/ResponseMessage'
 *          404:
 *             description: Mentee data is not found
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/ResponseMessage'
 *          500:
 *             description: Internal Server error
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/ResponseMessage'
 */

menteeRouter.post('/forgot-password',menteeController.forgotPassword);   // Mentee forgot password
menteeRouter.patch('/change-password',menteeController.changePassword); // For changing the password
menteeRouter.get('/getMentor',homeController.getMentor);  // Get the mentor for mentee
menteeRouter.get('/getMentorSlots',homeController.getMentorSlots); // For getting the slots of the particular user
menteeRouter.get('/getMentee',menteeAuth,menteeController.getMenteeDetails);  // Get mentor details for store
menteeRouter.get('/getProfile',menteeAuth,menteeController.getProfile); // Get the profile details of the mentee
menteeRouter.post('/editProfile',menteeAuth,upload.single('image'),menteeController.editProfile); // Editing the mentee profile
menteeRouter.post('/setFeedback',menteeAuth,menteeController.setFeedback); // Setting the feedback of the mentor
module.exports = menteeRouter;
