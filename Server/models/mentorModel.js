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
});

module.exports = mongoose.model('Mentor',mentorSchema);