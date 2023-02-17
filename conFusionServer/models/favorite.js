const mongoose = require('mongoose')

// Define the favorite schema
const favoriteSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    dishes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dish',
      required: true
    }]
  }, {
    timestamps: true
  });
  
  // Create the Favorites model using the favorite schema
  const Favorites = mongoose.model('Favorites', favoriteSchema);
  
  module.exports = Favorites;