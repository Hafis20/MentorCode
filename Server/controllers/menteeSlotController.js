const Slot = require("../models/slotModel");
const BookedSlot = require("../models/bookingModel");
const { default: mongoose } = require("mongoose");
const Wallet = require("../models/walletModel");
const Mentor = require('../models/mentorModel');
const Admin = require('../models/adminModel');

const bookSlot = async (req, res) => {
  // Booking slot as a mentee
  try {
    const menteeId = req.menteeId;
    // console.log(menteeId);
    const { mentorId, slotDate, slotTime, fee } = req.body;
    // const { menteeId,mentorId, slotDate, slotTime } = req.body;
    let bookedSlot = await BookedSlot.findOne({ menteeId: menteeId }); // We are checking the mentee have already a doc

    let slot = await Slot.findOneAndUpdate(
      {
        mentor_id: mentorId,
        slot_date: slotDate,
        "added_slots.time": slotTime,
      },
      {
        $set: {
          "added_slots.$.is_booked": true,
        },
      },
      {
        new: true,
      }
    );
    if (!slot) {
      return res.status(404).json({ message: "Slot not available" });
    }
    const data = {
      //it is the data for adding it is slot details
      mentorId: mentorId,
      date: slotDate,
      time: slotTime,
      fee: fee,
    };

    if (bookedSlot) {
      // if already exists
      bookedSlot.details.push(data);
    } else {
      bookedSlot = new BookedSlot({
        menteeId: menteeId,
        details: [data],
      });
    }
    let updatedData = await bookedSlot.save();
    res.status(201).json({ message: "Slot booked" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
  }
};

const completeMentorShip = async (req, res) => {
  try {
    const menteeId = new mongoose.Types.ObjectId(req.menteeId);
    const { bookingId, status } = req.body;
    let bookingData = await BookedSlot.findOneAndUpdate({ menteeId: menteeId }); // Finding the mentee booking slot
    let fee;
    let mentorId;
    let adminData = await Admin.findOne({role:'admin'});   // Take the admin data
    if (!bookingData) {
      return res.status(400).json({ message: "Booking not found" });
    }
    bookingData.details.forEach((booking) => {
      // Find the booking details and update the status into completed
      if (booking._id.equals(bookingId)) {
        booking.status = status;
        fee = booking.fee;      // Taking fee amount
        mentorId = booking.mentorId;  // Taking mentor Id
      }
    });
    bookingData.save(); // Saving to the database

    // Wallet management
    let adminWalletAmount = (fee * 15) / 100;
    let mentorWalletAmount = fee - adminWalletAmount;

    // Admin Wallet management
    let adminWallet = await Wallet.findOne({user_id:adminData._id});
    if(!adminWallet){      // If there is no admin wallet we want to create one
      adminWallet = new Wallet({
        user_id:adminData._id,
        balance:adminWalletAmount,
        transaction_history:[adminWalletAmount],
      })
    }else{               // If already exists
      adminWallet.balance += adminWalletAmount,
      adminWallet.transaction_history.push(adminWalletAmount);
    }
    await adminWallet.save();  // Save to the database

    // Mentor Wallet management
    let mentorWallet = await Wallet.findOne({user_id:mentorId});
    if(!mentorWallet){      // If there is no admin wallet we want to create one
      mentorWallet = new Wallet({
        user_id:mentorId,
        balance:mentorWalletAmount,
        transaction_history:[mentorWalletAmount],
      })
    }else{               // If already exists
      mentorWallet.balance += mentorWalletAmount,
      mentorWallet.transaction_history.push(mentorWalletAmount);
    }
    await mentorWallet.save();  // Save to the database

    res.status(200).json({ message: "Completed" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const getBookingDetails = async (req, res) => {
  // Passing the mentee booking details to show in the table of my bookings
  try {
    const menteeId = req.menteeId;
    // const {menteeId} = req.body;
    const bookingDetails = await BookedSlot.findOne(
      { menteeId: menteeId },
      { menteeId: 0, _id: 0 }
    ).populate({
      path: "details.mentorId",
      select: "name experience fee image",
    });
    if (bookingDetails) {
      const bookings = bookingDetails.details;
      res.status(201).json(bookings);
    } else {
      res.status(404).json({ message: "No slots booked" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
  }
};
module.exports = {
  bookSlot,
  getBookingDetails,
  completeMentorShip,
};
