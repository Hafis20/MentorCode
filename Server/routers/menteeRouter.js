const express = require("express");
const menteeRouter = express.Router();
const menteeController = require("../controllers/menteeController");
const homeController = require("../controllers/homeController");

// Components schema defining
/**
 * @swagger
 * components:
 *    schemas:
 *       LoginMentee:
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
 */

/**
 * @swagger
 * /mentee/getAvailableMentors:
 *    get:
 *       summary: Used to Fetch mentor data
 *       description: Fetch the mentor data for showing the mentee side
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

/**
 * @swagger
 * /mentee/register:
 *    post:
 *       summary: Used to register mentee
 *       description: Register the mentee and store the data into mongdb
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/LoginMentee'
 *       responses:
 *          201:
 *             description: Check your mail...verify your otp
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         message:
 *                            type: string
 */
menteeRouter.post("/register", menteeController.register); // For registering a mentee
menteeRouter.post("/resendOtp", menteeController.resendOtp); // For resending the otp
menteeRouter.post("/verifyOtp", menteeController.verifyOtp); // For verifying the mentee otp
menteeRouter.post("/login", menteeController.login); // mentee login
module.exports = menteeRouter;
