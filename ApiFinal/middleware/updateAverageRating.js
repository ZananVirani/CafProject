const Review = require('../models/Review');
const Food = require('../models/Food');

async function updateAverageReview(foodID){
  // const result = await Review.aggregate([
  //   { $match: { food: foodID } },
  //   { $group: { _id: '$foodName', averageRating: { $avg: '$rating' } } }
  // ]);
  const result = await Review.find({food : foodID}, {rating : 1})
  let sum = 0;

  result.forEach((item)=>{
    sum += item.rating
  })

  const avg = sum / result.length

  if(result.length > 0){
    await Food.findOneAndUpdate(
      {_id: foodID},
      {averageRating: avg}
    );
    return avg;
  } else{
    // await Food.findOneAndUpdate(
    //   {_id: foodID},
    //   {averageRating: 7}
    // );
    throw Exception("This is not right")
  };
}

module.exports = updateAverageReview;