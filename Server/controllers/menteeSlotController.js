const Slot = require("../models/slotModel");
const BookedSlot = require("../models/bookingModel");
const { default: mongoose } = require("mongoose");
const Wallet = require("../models/walletModel");
const getAdminData = require("../Helper/getAdmin");
const { refundPayment } = require("./paymentController");

const bookSlot = async (req, res) => {
  // Booking slot as a mentee
  try {
    const menteeId = req.menteeId;
    // console.log(menteeId);
    const { mentorId, slotDate, slotTime, fee, payment_id,slot_id } = req.body;
    // console.log(req.body);
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
      payment_id:payment_id,
      slot_id:slot_id,
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

// Getting the booking details of the mentee
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

// Complete mentorship and divide the wallet amount controller definition
const completeMentorShip = async (req, res) => {
  try {
    const menteeId = new mongoose.Types.ObjectId(req.menteeId);
    console.log(menteeId);
    const { bookingId, status } = req.body;
    console.log(bookingId)

    let bookingData = await BookedSlot.findOne({ menteeId: menteeId }); // Finding the mentee booking slot
    let fee;
    let mentorId;
    let adminData = await getAdminData()   // Take the admin data
    if (!bookingData) {
      return res.status(400).json({ message: "Booking not found" });
    }
    if(bookingData){
      bookingData.details.forEach((booking) => {
        // Find the booking details and update the status into completed
        if (booking._id.equals(bookingId)) {
          booking.status = status;
          fee = Number(booking.fee);      // Taking fee amount
          mentorId = booking.mentorId;  // Taking mentor Id
        }
      });
      
      bookingData.save() // Saving to the database
    }
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
    res.status(200).json({ message: "Marked As Completed" });
  } catch (error) {
    console.log('Completion error : ',error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// Cancel mentorship and return the amount 
const cancelMentorShip = async(req,res) =>{
  try {
    const menteeId = req.menteeId;
    const {bookingId,status} = req.body;
    let mentorId;  // for further operation
    let fee;   // for further operation in wallet
    let paymentId; //for razorpay refund
    let slot_id; //for changing the slot status into false

    let adminData = await getAdminData();    // getting the admin data

    let bookingData = await BookedSlot.findOne({user_id:menteeId});   //getting the mentee booking details
    
    if(!bookingData){   // IF no data available
      return res.status(400).json({message:'Booking not found'})
    }

    if(bookingData){
      bookingData.details.forEach((booking)=>{
        if(booking._id.equals(bookingId)){
          booking.status = status;
          fee = booking.fee;
          mentorId = booking.mentorId;
          paymentId = booking.payment_id;
          slot_id = booking.slot_id;
        }
      })
      await bookingData.save(); // Save the updated booking details into the database
    }
    // Wallet Management
    let dividedAmount = (fee*50)/100;
    let adminWalletAmount = (dividedAmount*20)/100;
    let mentorWalletAmount = dividedAmount - adminWalletAmount;
    let menteeWalletAmount = fee-dividedAmount;

    // Razorpay refund
    await refundPayment(paymentId,menteeWalletAmount);

    // Admin wallet management
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
    if(!mentorWallet){      // If there is no mentor wallet we want to create one
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

    // Mentee Wallet management
    let menteeWallet = await Wallet.findOne({user_id:menteeId});
    if(!menteeWallet){      // If there is no mentee wallet we want to create one
      menteeWallet = new Wallet({
        user_id:menteeId,
        balance:menteeWalletAmount,
        transaction_history:[menteeWalletAmount],
      })
    }else{               // If already exists
      menteeWallet.balance += menteeWalletAmount,
      menteeWallet.transaction_history.push(menteeWalletAmount);
    }
    await menteeWallet.save();  // Save to the database


    // Mentor slot status is in true which we change into false
    let mentorSlot = await Slot.findOneAndUpdate({mentor_id:mentorId});

    if(!mentorSlot){
      return res.status(400).json({message:'Slot not found'});
    }
    mentorSlot.added_slots.forEach((slot)=>{   // find the slot and change to false
      if(slot._id.equals(slot_id)){
        slot.is_booked = false;
      }
    })
    await mentorSlot.save()   // Updating the slot isbooked slot status changed

    res.status(200).json({message:'Booking Cancelled'});
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:'Internal server error'});
  }
}

module.exports = {
  bookSlot,
  getBookingDetails,
  completeMentorShip,
  cancelMentorShip,
};
