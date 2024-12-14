const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const Food = require('../models/Food');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


const router = express.Router();

/**
 * Register a new user, and return the created user.
 */
router.post("/register", async (req, res) => {
  try {
    
    //Uses destructuring assignment syntax to assign values in body of request to the variables with the same name
    const {studentId, firstName, lastName, password, allergies, favouriteCafeterias} = req.body;

    //returns true if user exists in user collection
    const existingUser = await User.findOne({studentId});
  
    // Return error if user exists
    if (existingUser) {
      return res.status(400).send('User already exists.');
    }


    const newUser = new User({
      studentId: studentId,
      firstName,
      lastName,
      password,
      // Gives admin if password is "adminPassword" and user otherwise. Temporary measures for testing.
      role: password == "adminPassword" ? "admin" : "user",
      allergies,
      favouriteCafeterias,
      favouriteFoods : []
    });

    await User.create(newUser);

    
    res.send("User added")

  } catch(err){
    console.log("error: ", err)
    return res.status(500).send('Failed to create user');
  }

})

/**
 * Edit user details.
 */
router.patch("/editUser", async (req, res) => {
  try {
    
    // Uses destructuring assignment syntax to assign values in body of request to the variables with the same name
    const {studentId, firstName, lastName, allergies, favouriteCafeterias} = req.body;

    // Find the user
    const existingUser = await User.findOne({studentId});
  
    // Return error if the user does not exist.
    if (!existingUser) {
      return res.status(400).send('User does not exist.');
    }


    // Edit the information of the user
    existingUser.firstName = firstName
    existingUser.lastName = lastName
    existingUser.allergies = allergies
    existingUser.favouriteCafeterias = favouriteCafeterias

    existingUser.save()

    
    return res.send("User patched")

  } catch(err){
    console.log("error: ", err)
    return res.status(500).send('Failed to create user');
  }

})

/**
 * Returns the cafeterias that are serving the user's favourite foods.
 */
router.get("/getFavFoods", async (req, res) => {
  try {
    const {foodIDs} = req.query;

    const foods = await Food.find({_id : {$in : foodIDs}});

    let newSet = new Set()

    // Uniquely add the cafeterias serving the user's favourite foods.
    foods.forEach((item)=>{
      item.cafeterias.forEach((caf)=>{
        newSet.add(caf)
      })
    })

    const newList = Array.from(newSet)

    return res.send(newList)

  } catch(err){
    console.log("error: ", err)
    return res.status(500).send('Failed to create user');
  }

})

/**
 * Returns the user with the studentId.
 */
router.get("/getUser/:studentId", async (req, res) => {
  try {
    
    const {studentId} = req.params;

    const existingUser = await User.findOne({studentId});
  
    // Return error if user exists
    if (!existingUser) {
      return res.status(400).send('User does not exist.');
    }

    
    return res.json(existingUser)

  } catch(err){
    console.log("error: ", err)
    return res.status(500).send('Failed to create user');
  }

})

/**
 * Changes the user's favourite foods.
 */
router.patch("/changeFavouriteFoods/:userId/:itemID", async(req, res) => {
  try{
    const {userId, itemID} = req.params;
    const user = await User.findOne({studentId: userId})
    if (!user) return res.status(400).send("User not found")
    
    // If the food item is already in the user's favourites, remove it, otherwise add it.
    let newFoods = user.favouriteFoods
    if (newFoods.includes(itemID)){
      newFoods = newFoods.filter((item)=>{
        return item!=itemID
      })
    }else{
      newFoods.push(itemID)
    }

    user.favouriteFoods = newFoods
    user.save()

    res.status(200).send("New favourites changed.")
  } catch(err){
    return res.status(500).send("error: ", err)
  }
})


// /**
//  * 
//  */
// router.post('/login', async (req, res) => {
//   try{
//     const {studentId, password} = req.body;
//     const user = await User.findOne({studentId})
//     if(!user){
//       return res.status(400).json({message: 'User Not Found'})
//     }

//     const passMatch = await bcrypt.compare(password, user.password);
//     if(!passMatch){
//       return res.status(400).json({message: "Password Invalid"})
//     }
//     // console.log("Secret Key: ", process.env.JWT_SECRET)
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({token});

//   } catch (err){
//       return res.status(500).json({message: 'Error logging in', error: err.message})
//   }
// })


module.exports = router;