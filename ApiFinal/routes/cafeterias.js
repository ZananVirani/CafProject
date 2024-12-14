/**
 * Defines all of the routes for endpoints related to Cafeteria.
 */


const express = require('express');
const mongoose = require('mongoose');
const Cafeteria = require('../models/Cafeteria');
const getFoodFromCaf = require('../middleware/getFood');
const Food = require('../models/Food');
const User = require('../models/User');

const router = express.Router();

/**
 * Get the foods being served in the user's favourite cafeterias.
 */
router.get("/favouriteCafs", async (req, res) => {
  try {

    const {userID} = req.query;

    // Get the user document
    const user = await User.findOne({studentId : userID})
    if (!user) return res.status(400).send("User Not Found!")

      // Return all the foods that are being served in the user's favourite cafeterias
    const foods = await Food.find({cafeterias : {$in : user.favouriteCafeterias}});
   return res.json({foods : foods, user : user})

  } catch(err){
    console.log("error: ", err)
    return res.status(500).json({message : err.message})
  }

})

/**
 * Get all the foods being served in the cafeteria 'cafeteriaName', 
 * and return user data (this was done to combine the two queries into one)
 */
router.get('/getFood/:cafeteriaName/:userID', async (req, res) => {
  try{
    const {cafeteriaName, userID} = req.params;
    const user = await User.findOne({studentId : userID})
    // Find and return food that is being served in the cafeteria 'cafeteriaName'.
    const foods = await Food.find({cafeterias : cafeteriaName})
    if (!user) return res.status(400).json({message : "User not found"})

    return res.json({foods : foods, user : user});
  } catch(error){
    console.log(error)
    return res.status(500).json({ error: error.message });
  }
})

module.exports = router;