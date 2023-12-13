const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    mentor_id: {
      type: mongoose.Schema.ObjectId,
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
        is_booked:{
          type:Boolean,
        },
        booked_user:{
          type:mongoose.Schema.ObjectId,
          ref:'Mentee'
        }
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("slot", slotSchema);
