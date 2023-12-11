const Slot = require("../models/slotModel");

// Creating a slot for mentor
const createSlot = async (req, res) => {
  try {
    const { mentorId, date, time } = req.body; //date : 2023-12-14T18:30:00.000Z   time:  09:00 AM to 10:00 AM
    const exact_date = new Date(date).toDateString(); // Getting the date into string
    const slotTime = {
      // Creating the time object
      time: time,
      is_booked: false,
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
    const responseTimeArray = updatedSlot.added_slots.map(
      (times) => times.time
    ); // To provide as array;
    res.status(201).json({ message: "Slot Added", responseTimeArray });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error.message);
  }
};

// Delete one slot
const deleteSlot = async (req,res)=>{
  try {
    const {mentorId,date,time} = req.body;
    const exact_date = new Date(date).toDateString();
    const mentorSlot = await Slot.findOne({mentor_id:mentorId,slot_date:exact_date});
    if(mentorSlot){
      const slots = mentorSlot.added_slots.filter((data)=>{
        return data.time !== time
      });
      mentorSlot.added_slots = slots;
      mentorSlot.save(); 
    }
    const responseTimeArray = mentorSlot.added_slots.map((times)=>times.time);
    res.status(201).json({message:'Slot deleted',responseTimeArray});

  } catch (error) {
    res.status(500).json({message:'Internal server error'});
  }
}

// Get the slots using the date
const getSlotsByDate = async (req, res) => {
  try {
    const { mentorId, date } = req.body;
    const exact_date = new Date(date).toDateString();

    let mentorSlots = await Slot.findOne({
      mentor_id: mentorId,
      slot_date: exact_date,
    });
    if (mentorSlots) {
      const responseTimeArray = mentorSlots.added_slots.map((times) => times.time);
      return res.status(201).json({ responseTimeArray, message: "Successfully found" });
    } else {
      const responseTimeArray = [];
      return res.status(201).json({ responseTimeArray, message: "Successfully found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error.message);
  }
};

// Get the all slots of the mentor while render the calender
const getSlotsOfMentor = async(req,res) =>{
  try {
    const mentorId =  req.mentorId;
    const mentorSlots = await Slot.find({mentor_id:mentorId});
    const mentorDocs = mentorSlots.filter((doc)=>doc.added_slots.length > 0);
    const mentorSlotDates = mentorDocs.map((date)=>date.slot_date);
    res.status(201).json({message:'Success',createdSlotDates:mentorSlotDates});
  } catch (error) {
    res.status(500).json({message:'Internal server error'});
    console.log(error.message)
  }
}

module.exports = {
  createSlot,
  getSlotsByDate,
  deleteSlot,
  getSlotsOfMentor
};
