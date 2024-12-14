/**
 * Defines all of the routes for endpoints related to Foods.
 */

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require("path")
const Food = require('../models/Food');
const User = require('../models/User');

const router = express.Router();

/**
 * Create a new food item, and return the created food item.
 */
router.post("/", async (req,res) => {
  try{
    const {name, image, allergies, type, cafeterias} = req.body


    const newFood = new Food({
      name: name,
      image: image,  
      allergies: allergies,
      type: type,
      cafeterias: cafeterias
    });

    let result = await Food.create(newFood);

    res.status(201).json(result);

  } catch(err){
    console.log("error: ", err);
    res.status(500).send('Server error');
  }

})

/**
 * Upload the image of the food item, setting the name to the current date and time in milliseconds, so it is a unique name.
 * Return the name back to the user.
 * This code uses expo-file-system to write the image to the server, where it gets stored in the 'uploads' folder.
 */
router.patch('/uploadImage', async (req, res) =>{
  try{
    const temp = req.headers.mimetype
    const name = Date.now() + '.' + temp.split('/')[1]
    const smth = path.join(__dirname, '../uploads/')
    req.pipe(fs.createWriteStream(smth + name))
    return res.status(200).send(name)
  }
  catch (error){

    console.log(error)
    return res.status(500).send(null);
  }
})

/**
 * Gets the food and user data for the food item 'foodName' and the user 'userID' (this was done to combine the two queries into one).
 */
router.get('/food/:foodName/:userID', async (req, res)=>{
  try{
    const {foodName, userID} = req.params

    const user = await User.findOne({studentId : userID})
    const food = await Food.findOne({name : foodName})


    if (!food || !user) return res.status(400).json({message : "Not Found"})

    return res.json({foods : food, user : user})
  }catch(e){
    res.status(500).json({message : e.message})
  }
})

/**
 * Returns all of the food items stored in the database. If a studentId is provided, return the user data as well.
 */
router.get('/allFoods', async (req, res) =>{
  try{
    const {studentId} = req.query
    const foods = await Food.find({});
    if (studentId){
    const user = await User.findOne({studentId})
    return res.json({foods : foods, user : user});
    }else{
      return res.json(foods)
    }
  } catch (err){
    console.log(err)
    res.status(500).json({message: 'Error retrieving users', error: err.message })
  }
})
  

module.exports = router;