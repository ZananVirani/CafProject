const express = require('express');
const mongoose = require('mongoose');
const Review = require('../models/Review');
const getReviewData = require('../middleware/getReviewData');

const router = express.Router();

router.post("/:userName/:foodName", async (req,res) =>{
  try{
    const {userName} = req.params;
    const {foodName} = req.params;

    const {rating} = req.body;

    data = await getReviewData(userName, foodName);
    console.log(data)
    user = data[0];
    food = data[1];

    const newReview = new Review({
      user,
      food,
      rating
    });
    
    await Review.create(newReview);

    res.send("Review Added")  
    
  }catch(error){
    res.status(500).json({ error: error.message });
  }
})

module.exports = router;