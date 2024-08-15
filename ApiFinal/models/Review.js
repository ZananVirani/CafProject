const mongoose = require('mongoose');

const schema = mongoose.Schema;

const reviewSchema = new schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  food: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Food',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
})

const Review = mongoose.model("review", reviewSchema)

module.exports = Review;