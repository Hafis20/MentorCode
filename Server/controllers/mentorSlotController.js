const Slot = require("../models/slotModel");
const BookedSlot = require("../models/bookingModel");
const Wallet = require("../models/walletModel");
const { default: mongoose } = require("mongoose");
const getRemainingDays = require("../Helper/getRemainingDays");

// Creating a slot for mentor
const createSlot = async (req, res) => {
  try {
    const { mentorId, date, time } = req.body; //date : 2023-12-14T18:30:00.000Z   time:  09:00 AM to 10:00 AM
    const exact_date = new Date(date).toDateString(); // Getting the date into string
    const slotTime = {
      // Creating the time object
      time: time,
      is_booked: false,
      slot_type: "normal",
    };
    let mentorSlot = await Slot.findOne({
      mentor_id: mentorId,
      slot_date: exact_date,
    }); // We are checking the mentor  slots are avaliable or not
    if (mentorSlot) {
      mentorSlot.added_slots.push(slotTime); // Push the slot
    } else {
      mentorSlot = new Slot({
        // Create the document and push it
        mentor_id: mentorId,
        slot_date: exact_date,
        added_slots: [slotTime],
      });
    }
    const updatedSlot = await mentorSlot.save();
    const response = {
      slot_date: updatedSlot.slot_date,
      slots: updatedSlot.added_slots,
    };
    res.status(201).json({ message: "Slot Added", response }); // Passing the response
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error.message);
  }
};

// Delete one slot
const deleteSlot = async (req, res) => {
  try {
    const { mentorId, date, time } = req.body;
    const exact_date = new Date(date).toDateString();
    const mentorSlot = await Slot.findOne({
      mentor_id: mentorId,
      slot_date: exact_date,
    });
    if (mentorSlot) {
      const slots = mentorSlot.added_slots.filter((data) => {
        return data.time !== time;
      });
      mentorSlot.added_slots = slots;
      mentorSlot.save();
    }
    const response = {
      slot_date: mentorSlot.slot_date,
      slots: mentorSlot.added_slots,
    };
    res.status(201).json({ message: "Slot deleted", response });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Delete Slot : ", error.message); // slot deletion error
  }
};

// Get the slots using the date
const getSlotsByDate = async (req, res) => {
  try {
    const { mentorId, date } = req.body;
    const exact_date = new Date(date).toDateString();
    // console.log(req.body);
    let mentorSlots = await Slot.findOne({
      mentor_id: mentorId,
      slot_date: exact_date,
    });
    if (mentorSlots) {
      const response = {
        slot_date: mentorSlots.slot_date,
        slots: mentorSlots.added_slots,
      };
      // console.log(response);
      return res.status(201).json({ response, message: "Successfully found" });
    } else {
      const response = {
        slot_date: "",
        slots: [],
      };
      // console.log(response);
      return res.status(201).json({ response, message: "Successfully found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error.message);
  }
};

// Get the all slots of the mentor while render the calender
const getSlotsOfMentor = async (req, res) => {
  try {
    const mentorId = req.mentorId;
    const mentorSlots = await Slot.find({ mentor_id: mentorId });
    const mentorDocs = mentorSlots.filter((doc) => doc.added_slots.length > 0);
    const response = mentorDocs.map((data) => {
      return { slot_date: data.slot_date, slots: data.added_slots };
    });
    res.status(201).json({ message: "Success", response });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error.message);
  }
};

// Get the booked slots for the mentor table
const getBookedSlots = async (req, res) => {
  try {
    const mentorId = req.mentorId; // Data will get from token
    // const {mentorId} = req.body;
    const mentorDetails = await BookedSlot.aggregate([
      {
        $unwind: "$details",
      },
      {
        $match: {
          "details.mentorId": new mongoose.Types.ObjectId(mentorId),
        },
      },
      {
        $lookup: {
          from: "mentees",
          localField: "menteeId",
          foreignField: "_id",
          as: "menteeDetails",
        },
      },
      {
        $unwind: "$menteeDetails",
      },
      {
        $project: {
          "details.time": 1,
          "details._id": 1,
          "details.date": 1,
          "details.status": 1,
          "menteeDetails._id": 1,
          "menteeDetails.name": 1,
          "menteeDetails.image": 1,
        },
      },
    ]);
    if (mentorDetails) {
      res.status(201).json(mentorDetails);
    } else {
      return res.status(404).json({ message: "No Booking Yet" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
    console.log(error.message);
  }
};

// Mentor cancel the mentee booking
const cancelMenteeBooking = async (req, res) => {
  try {
    const { bookingId, status, menteeId } = req.body;
    const mentorId = req.mentorId;
    const modifyBooking = await BookedSlot.findOneAndUpdate(
      // Updating the booking document change the status into cancelled
      {
        menteeId: menteeId,
        "details._id": bookingId,
      },
      {
        $set: {
          "details.$.status": `${status}`,
        },
      },
      {
        new: true,
      }
    );
    await modifyBooking.save(); // Save to the database

    // Mentor slot booked status is true now we want to change into false
    let slotId; // for storing the slot id
    let slot_date; //for easy database query
    let returnAmount; // for returning the amount into the wallet of user from the mentor wallet

    modifyBooking.details.forEach((data) => {
      if (data._id.equals(bookingId)) {
        slotId = data.slot_id;
        returnAmount = data.fee;
        slot_date = data.date;
      }
    });
    // console.log(slotId);
    // console.log(slot_date)
    // Changing slot status
    let modifySlotStatus = await Slot.findOne({
      mentor_id: mentorId,
      slot_date: slot_date,
    });

    modifySlotStatus.added_slots.forEach((slot) => {
      if (slot._id.equals(slotId)) {
        //Checking the all id are equal
        slot.is_booked = false; // Changed to false
      }
    });
    await modifySlotStatus.save(); // Saved the changes into the database

    // Mentee wallet amount from mentor wallet
    // Find the wallet is available for the mentee?
    let menteeWallet = await Wallet.findOne({ user_id: menteeId });
    if (!menteeWallet) {
      // If no wallet
      menteeWallet = new Wallet({
        user_id: menteeId,
        balance: returnAmount,
        transaction_history: [{amount:returnAmount,date_of_transaction:new Date()}],
      });
    } else {
      // If wallet
      menteeWallet.balance += returnAmount;
      menteeWallet.transaction_history.push({amount:returnAmount,date_of_transaction:new Date()});
    }
    await menteeWallet.save();

    // Reducing amount from mentor wallet
    let mentorWallet = await Wallet.findOne({ user_id: mentorId });
    if (!mentorWallet) {
      // If no wallet
      mentorWallet = new Wallet({
        user_id: mentorId,
        balance: 0,
        transaction_history: [],
      });
    } // If wallet
    mentorWallet.balance -= returnAmount;
    mentorWallet.transaction_history.push({amount:-1 * returnAmount,date_of_transaction:new Date()});

    await mentorWallet.save();
    res.status(200).json({ message: "Slot cancelled" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// Get the default slots of the mentor
const getDefaultSlots = async (req, res) => {
  try {
    const mentorId = req.mentorId;
    // const { mentorId } = req.body;
    let slots = await Slot.aggregate([
      {
        $match: {
          mentor_id: new mongoose.Types.ObjectId(mentorId),
        },
      },
      {
        $unwind: "$added_slots",
      },
      {
        $group: {
          _id: "$added_slots.time",
        },
      },
      {
        $group: {
          _id: null,
          slot: { $push: "$_id" },
        },
      },
    ]);
    if (slots) {
      const defaultSlots = slots[0].slot;
      res.status(200).json(defaultSlots);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// Setting default slot for mentor
const setDefaultSlot = async (req, res) => {
  try {
    const mentorId = req.mentorId;
    const { time } = req.body;
    let mentorSlots = await Slot.find({ mentor_id: mentorId }); // Checking the user is already exist in db
    const remainingDates = getRemainingDays();

    if (mentorSlots.length > 0) {
      for (const date of remainingDates) {   
        let dateExists = false;
      
        for (let i = 0; i < mentorSlots.length; i++) {
          const slot = mentorSlots[i];
      
          if (slot.slot_date === date) {  // Checking the date is exists
            dateExists = true;
      
            let timeExists = false;
      
            for (const slot_time of slot.added_slots) {
              if (slot_time.time === time) {
                timeExists = true;
                break;
              }
            }
      
            if (!timeExists) {
              const data = {
                time: time,
                is_booked: false,
                slot_type: "default",
              };
      
              slot.added_slots.push(data);
              await slot.save();
            }
      
            break;
          }
        }
      
        if (!dateExists) {
          const newSlot = new Slot({
            mentor_id: mentorId,
            slot_date: date,
            added_slots: [
              {
                time: time,
                is_booked: false,
                slot_type: "default",
              },
            ],
          });
      
          await newSlot.save();
        }
      }      
    } else {
      const newSlots = remainingDates.map((date) => {
        return {
          mentor_id: mentorId,
          slot_date: date,
          added_slots: [
            {
              time: time,
              is_booked: false,
              slot_type: "default",
            },
          ],
        };
      });
      await Slot.create(newSlots);
    }
    res.status(200).json({ message: "Default slots added" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// Remove default slot of mentor
const removeDefaultSlots = async(req,res)=>{
  try {
    
  } catch (error) {
    res.status(500).json({message:'Internal Server error'});
  }
}
module.exports = {
  createSlot,
  getSlotsByDate,
  deleteSlot,
  getSlotsOfMentor,
  getBookedSlots,
  cancelMenteeBooking,
  getDefaultSlots,
  setDefaultSlot,
  removeDefaultSlots,
};
