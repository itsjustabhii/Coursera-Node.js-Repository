// Promotions Schema
const mongoose = require("mongoose");

const PromotionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  price: {
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

// Promotions Model
const Promotions = mongoose.model("Promotions", PromotionsSchema);

module.exports = Promotions;
