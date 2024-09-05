const Review = require('../models/Review');
const Food = require('../models/Food');

async function updateAverageReview(foodID){
  const result = await Review.aggregate([
    { $match: { _id: foodID } },
    { $group: { _id: '$foodName', averageRating: { $avg: '$rating' } } }
  ]);

  if(result.length > 0){
    await Food.findOneAndUpdate(
      {_id: foodID},
      {averageRating: result[0].averageRating}
    );
  } else{
    await Food.findOneAndUpdate(
      {_id: foodID},
      {averageRating: 7}
    );
  };
}

module.exports = updateAverageReview;