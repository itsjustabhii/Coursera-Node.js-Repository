// Leaders Schema
const mongoose = require("mongoose");

const LeadersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  abbr: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    required: true,
  },
});

// Leaders Model
const Leaders = mongoose.model("Leaders", LeadersSchema);

module.exports = Leaders;
