const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema({
  mentor_id: {
    type: mongoose.Schema.ObjectId,
    ref: "mentor",
  },
  domain: [
    {
      domainName: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('domain',domainSchema);