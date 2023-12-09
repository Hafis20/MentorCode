const express = require('express');
const mentorSlotRouter = express.Router();
const mentorSlotController = require('../controllers/mentorSlotController');

// Router name in swagger
/**
 * @swagger
 * tags:
 *    name: MentorSlotCreate
 *    description: Crud operation of mentor slot
 */

/**
 * @swagger
 * /mentorslot/createSlot:
 *    post:
 *       summary: Used to create slot 
 *       description: Mentor can create their own free time slots
 *       tags:
 *          - MentorSlotCreate
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      date:
 *                         type: string
 *                      time:
 *                         type: string
 *       responses:
 *          201:
 *             description: Created success
 *       
 */
 
mentorSlotRouter.post('/createSlot',mentorSlotController.createSlot)  // For mentor can create their slots

module.exports = mentorSlotRouter;