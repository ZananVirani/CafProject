const mongoose = require('mongoose');

const schema = mongoose.Schema;

/**
 * Identifies the schema for a Review of a Food.
 * user: User who made the review.
 * food: Food item being reviewed.
 * rating: Rating given to the Food item.
 */
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