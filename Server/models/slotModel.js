const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    mentor_id: {
      type: mongoose.Schema.ObjectId,
      ref: "mentor",
    },
    slot_date: {
      type: String,
    },
    added_slots: [
      {
        time: {
          type: String,
        },
        is_booked:{
          type:Boolean,
        }
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("slot", slotSchema);
