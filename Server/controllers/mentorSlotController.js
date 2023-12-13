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
    const response = {
      slot_date:updatedSlot.slot_date,
      slots:updatedSlot.added_slots,
    };
    res.status(201).json({ message: "Slot Added", response });  // Passing the response 
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
    const response = {
      slot_date:mentorSlot.slot_date,
      slots:mentorSlot.added_slots,
    };
    res.status(201).json({message:'Slot deleted',response});

  } catch (error) {
    res.status(500).json({message:'Internal server error'});
    console.log('Delete Slot : ',error.message);      // slot deletion error
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
      const response = {
        slot_date : mentorSlots.slot_date,
        slots:mentorSlots.added_slots,
      }
      return res.status(201).json({ response, message: "Successfully found" });
    } else {
      const response = {
        slot_date : '',
        slots:[],
      }
      return res.status(201).json({ response, message: "Successfully found" });
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
    const response = mentorDocs.map((data)=>{
      return {slot_date:data.slot_date,slots:data.added_slots}
    });
    res.status(201).json({message:'Success',response});
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
