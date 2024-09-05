const express = require('express');
const mongoose = require('mongoose');
const Cafeteria = require('../models/Cafeteria');
const addFoodItemToCafeteria = require('../middleware/addFood');
const getFoodFromCaf = require('../middleware/getFood');
const Food = require('../models/Food');
const User = require('../models/User');

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    //Prints body of http request
    console.log("req.body: ", req.body);
    
    //Uses destructuring assignment syntax to assign values in body of request to the variables with the same name
    const {name, longitude, latitude, menu} = req.body;

    //Test to see if assignment works
    const newCafeteria = new Cafeteria({
      name,
      longitude, 
      latitude,
      menu
    });

    await Cafeteria.create(newCafeteria);

    res.send("Cafteria added")

  } catch(err){
    console.log("error: ", err)
  }

})

router.get("/favouriteCafs", async (req, res) => {
  try {
    //Uses destructuring assignment syntax to assign values in body of request to the variables with the same name
    const {userID} = req.query;

    //Test to see if assignment works
    const user = await User.findOne({studentId : userID})
    if (!user) return res.status(400).send("User Not Found!")

    const foods = await Food.find({cafeterias : {$in : user.favouriteCafeterias}});
   return res.json({foods : foods, user : user})

  } catch(err){
    console.log("error: ", err)
    return res.status(500).json({message : err.message})
  }

})


// //Consider converting to patch request - may make program much cleaner
// router.post('/addFood', async (req, res) => {
//   console.log('req.body: ', req.body)
//   const {cafeteriaName} = req.body;
//   const {foodName} = req.body;

//   try {
//     const result = await addFoodItemToCafeteria(cafeteriaName, foodName);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }


// })

router.get('/getFood/:cafeteriaName', async (req, res) => {
  try{
    const {cafeteriaName} = req.params;
    //Cafeteria Document
    const caf = await Cafeteria.findOne({name: cafeteriaName});

    if (!caf) {
      return res.status(404).json({ message: 'Cafeteria not found' });
    }

    const foods = await Food.find({cafeterias : cafeteriaName})

    if (!foods) return res.status(400).json({message : "Foods not found"})

    return res.json(foods);
  } catch(error){
    return res.status(500).json({ error: error.message });
  }
})

module.exports = router;