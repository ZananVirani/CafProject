//To Change Review add patch request

const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User')
const Food = require('../models/Food')
const Review = require('../models/Review');
const updateAverageReview = require('../middleware/updateAverageRating')
const getReviewData = require('../middleware/getReviewData');

const router = express.Router();

router.post("/:userID/:foodID", async (req,res) =>{
  try{
    const {userID, foodID} = req.params;

    const {rating} = req.body;

    const user = await User.findOne({studentId : userID})

    const result = await Review.findOne({user : user._id, food : foodID})

    let status = 200;

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

    await updateAverageReview(foodID);

    return res.status(status).send("Success")
    
  }catch(error){
    console.log(error)
    res.status(500).json({ error: error.message });
  }
})

module.exports = router;