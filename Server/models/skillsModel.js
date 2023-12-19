const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
  mentor_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Mentor",
  },
  skills: [],
  about:{
    type:String,
  }
});

module.exports = mongoose.model('skill',skillsSchema);