const Food = require('../models/Food');
const User = require('../models/User');

async function getReviewData(userName, foodName){
  try{
    reviewData = []

    const userId = await User.findOne({studentId: userName})
    // console.log(userId)
    reviewData.push(userId._id)

    const foodId = await Food.findOne({name: foodName})
    // console.log(foodId)
    reviewData.push(foodId._id)

    // console.log(reviewData)
    
    return reviewData;
  } catch (err){
    console.error('Error getting data for review:', err);
    throw err;
  }
}

module.exports = getReviewData;