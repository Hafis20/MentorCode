const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    mentor_id: {
      type: mongoose.Types.ObjectId,
      ref: "Mentor",
    },
    slot_date: {
      type: String,
    },
    added_slots: [
      {
        time: {
          type: String,
        },
        is_booked: {
          type: Boolean,
        },
        slot_type:{
          type:String,
        }
      },
    ],
  },
  { timestamps: true }
);

// Register the model
const Slot = mongoose.model("slot", slotSchema);

module.exports = Slot;
