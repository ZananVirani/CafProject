const Review = require('../models/Review');
const Food = require('../models/Food');

/**
 * 
 * @param {ObjectId} foodID 
 * @returns the updated average rating of the food
 */
async function updateAverageReview(foodID){
  // Get all the reviews for the food, then calculate average rating
  const result = await Review.find({food : foodID}, {rating : 1})
  let sum = 0;

  result.forEach((item)=>{
    sum += item.rating
  })

  const avg = sum / result.length

  if(result.length > 0){
    // Update the average rating of the food
    await Food.findOneAndUpdate(
      {_id: foodID},
      {averageRating: avg}
    );
    return avg;
  } else{
    throw Exception("This is not right")
  };
}

module.exports = updateAverageReview;