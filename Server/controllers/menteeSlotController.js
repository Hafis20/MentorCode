const Slot = require("../models/slotModel");
const BookedSlot = require("../models/bookingModel");

const bookSlot = async (req, res) => {// Booking slot as a mentee
  try {
    const menteeId = req.menteeId;
    // console.log(menteeId);
    const { mentorId, slotDate, slotTime } = req.body;
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
    if(!slot){
      return res.status(404).json({ message: "Slot not available" });
    }
    const data = {
      //it is the data for adding it is slot details
      mentorId: mentorId,
      date: slotDate,
      time: slotTime,
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
    res.status(201).json({ message: "Slot booked"});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
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
    }else{
      res.status(404).json({message:'No slots booked'});
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
  }
};
module.exports = {
  bookSlot,
  getBookingDetails,
};
