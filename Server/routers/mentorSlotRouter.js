const express = require('express');
const mentorSlotRouter = express.Router();
const mentorSlotController = require('../controllers/mentorSlotController');
const mentorAuth = require('../middlewares/mentorAuth');

// Router name in swagger
/**
 * @swagger
 * tags:
 *    name: MentorSlotCreate
 *    description: Crud operation of mentor slot
 */

// Schemas
/**
 * @swagger
 * components:
 *    securitySchemes:
 *       BearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *    schemas:
 *       CreateSlot:
 *          type: object
 *          properties:
 *             date:
 *                type: string
 *             time:
 *                type: string
 *       CreateSlotResponse:
 *          type: object
 *          properties:
 *             message:
 *                type: string
 *             responseTimeArray:
 *                type: array
 *                items:
 *                   type: string
 */

// Create slots
/**
 * @swagger
 * /mentorslot/createSlot:
 *    post:
 *       security: 
 *          - BearerAuth: []
 *       summary: Used to create slot 
 *       description: Mentor can create their own free time slots
 *       tags:
 *          - MentorSlotCreate
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/CreateSlot'
 *       responses:
 *          201:
 *             description: Created success
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/CreateSlotResponse'
 *       
 */
 
mentorSlotRouter.post('/createSlot',mentorSlotController.createSlot)  // For mentor can create their slots
mentorSlotRouter.post('/deleteSlot',mentorSlotController.deleteSlot); // For mentor can delete their slots
// get slots by date
/**
 * @swagger
 * /mentorslot/getSlotsByDate:
 *    post:
 *       summary: Used to get the slots by date
 *       description: When the user clicks on a date in the calender at that time we show the slots of that day
 *       tags:
 *          - MentorSlotCreate
 *       requestBody:
 *          required: true
 *          content:
 *             applcation/json:
 *                schema:
 *                   type: object
 *                properties:
 *                   date:
 *                      type: string
 *       responses:
 *          201:
 *             description: Successfully get the slots
 */

mentorSlotRouter.post('/getSlotsByDate',mentorAuth,mentorSlotController.getSlotsByDate);  // Get the date in begining
mentorSlotRouter.get('/getSlotsOfMentor',mentorAuth,mentorSlotController.getSlotsOfMentor);  // getting the slots of mentor 
mentorSlotRouter.get('/getBookedSlots',mentorAuth,mentorSlotController.getBookedSlots);  // for showing the data in the table
mentorSlotRouter.post('/cancelMenteeBooking',mentorAuth,mentorSlotController.cancelMenteeBooking); // Cancel the mentee booked slot
mentorSlotRouter.get('/getDefaultSlots',mentorAuth,mentorSlotController.getDefaultSlots);  // get the default slot
mentorSlotRouter.post('/setDefaultSlot',mentorAuth,mentorSlotController.setDefaultSlot); // Set the default slot
mentorSlotRouter.post('/removeDefaultSlot',mentorAuth,mentorSlotController.removeDefaultSlot); // Removing the default slots

module.exports = mentorSlotRouter;