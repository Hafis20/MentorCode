const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "mentor",
  },
  experience: {
    type: String,
  },
  mobile: {
    type: String,
  },
  otp: {
    type: Number,
  },
  fee: {
    type: Number,
  },
  otp_updated_at: {
    type: Date,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  is_blocked: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Mentor", mentorSchema);
