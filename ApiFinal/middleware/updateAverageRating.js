const Review = require('../models/Review');
const Food = require('../models/Food');

async function updateAverageReview(foodName){
  const result = await Review.aggregate([
    { $match: { name: foodName } },
    { $group: { _id: '$foodName', averageRating: { $avg: '$rating' } } }
  ]);

  if(result.length > 0){
    await Food.findOneAndUpdate(
      {name: foodName},
      {averageRating: result[0].averageRating}
    );
  } else{
    await Food.findOneAndUpdate(
      {name: foodName},
      {averageRating: 7}
    );
  };
}

module.exports = updateAverageReview;