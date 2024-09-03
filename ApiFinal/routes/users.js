const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const Food = require('../models/Food');
const getCafs = require('../middleware/getCaf')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    
    //Uses destructuring assignment syntax to assign values in body of request to the variables with the same name
    const {studentId, firstName, lastName, password, role, allergies, favouriteCafeterias, favouriteFoods} = req.body;

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
      role,
      allergies,
      favouriteCafeterias,
      favouriteFoods
    });

    await User.create(newUser);

    
    res.send("User added")

  } catch(err){
    console.log("error: ", err)
    return res.status(500).send('Failed to create user');
  }

})

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

router.post('/login', async (req, res) => {
  try{
    const {studentId, password} = req.body;
    const user = await User.findOne({studentId})
    if(!user){
      return res.status(400).json({message: 'User Not Found'})
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if(!passMatch){
      return res.status(400).json({message: "Password Invalid"})
    }
    // console.log("Secret Key: ", process.env.JWT_SECRET)
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({token});

  } catch (err){
      return res.status(500).json({message: 'Error logging in', error: err.message})
  }
})


//Adds more Favourite Foods; add studentId to parameters and array of favourite foods in body
router.patch("/addFavouriteFoods/:id", async(req, res) => {
  try{
    const {id} = req.params;
    const {newFavourites} = req.body;
    const newUser = await User.findOneAndUpdate({studentId: id},  { $addToSet: { favouriteFoods: { $each: newFavourites }}}, {new: true})
    res.status(200).send("New favourites added: ", newUser)
  } catch(err){
    res.status(400).send("error: ", err)
  }
})

//Removes some Favourite Foods; add studentId to parameters and array of favourite foods in body
router.patch("/removeFavouriteFoods/:id", async(req, res) => {
  try{
    const {id} = req.params;
    const {favourites} = req.body;
    const newUser = await User.findOneAndUpdate({studentId: id},  { $pull: { favouriteFoods: { $in: favourites }}}, {new: true})
    res.status(200).send("Favourites removed: ", newUser)
  } catch(err){
    res.status(400).send("error: ", err)
  }
})

//Return list of food 
router.get("/favouriteFoods/:id", async(req,res) =>{
  try{
    const {id} = req.params;
    const foodIds = await User.findOne({studentId: id}, {favouriteFoods: 1})

    const favouriteFoods = []

    foodIds.forEach((foodId) => {
      favouriteFoods.push(Food.findById({foodId}, {name: 1, image: 1}));    
    })
  } catch(err){
    res.status(400).send("error: ", err);
  }  
})


module.exports = router;