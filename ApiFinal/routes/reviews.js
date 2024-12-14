/**
 * Defines all of the routes for endpoints related to Reviews.
 */

const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User')
const Food = require('../models/Food')
const Review = require('../models/Review');
const updateAverageReview = require('../middleware/updateAverageRating')

const router = express.Router();

/**
 * Either posts a new review or updates an existing review of a food item.
 * Returns 200 if a new review was created, and 201 if an existing review was updated.
 * It also returns the new average rating of the food item.
 */
router.post("/:userID/:foodID", async (req,res) =>{
  try{
    const {userID, foodID} = req.params;

    const {rating} = req.body;

    const user = await User.findOne({studentId : userID})

    // Get the review of the user for the food item
    const result = await Review.findOne({user : user._id, food : foodID})

    // Status to pass if a new food item was created.
    let status = 200;

    // If the user has already reviewed the food item, update the rating, and make status 201.
    if (result){
      status = 201;
      await Review.findOneAndUpdate({user : user._id, food : foodID}, {rating : rating})
    }else{
      const newReview = new Review({
        user  :user._id,
        food : foodID,
        rating
      });

      const answer = await Review.create(newReview);
    }

    const newAvg = await updateAverageReview(foodID);

    return res.status(status).json({newAvg : newAvg})
    
  }catch(error){
    console.log(error)
    res.status(500).json({ error: error.message });
  }
})

module.exports = router;