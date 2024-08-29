const express = require('express');
const mongoose = require('mongoose');
const Cafeteria = require('../models/Cafeteria');
const addFoodItemToCafeteria = require('../middleware/addFood');
const getFoodFromCaf = require('../middleware/getFood');
const Food = require('../models/Food');

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


//Consider converting to patch request - may make program much cleaner
router.post('/addFood', async (req, res) => {
  console.log('req.body: ', req.body)
  const {cafeteriaName} = req.body;
  const {foodName} = req.body;

  try {
    const result = await addFoodItemToCafeteria(cafeteriaName, foodName);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


})

router.get('/getFood/:cafeteriaName', async (req, res) => {
  try{
    const {cafeteriaName} = req.params;
    //Cafeteria Document
    const caf = await Cafeteria.findOne({name: cafeteriaName});

    if (!caf) {
      return res.status(404).json({ message: 'Cafeteria not found' });
    }

    console.log("Found Cafeteria", caf)
    //Array of Food Ids
    const menuIds = caf.menu
    const foods = await Food.find({cafeterias : caf.name})

    //getFoodFromCaf(menuIds)

    return res.json(foods);
  } catch(error){
    return res.status(500).json({ error: error.message });
  }
})


// try{
//   foods = []

//   for(foodId of menuIds){
//     const food = await Food.findById(foodId)
//     if (food) {
//       foods.push(food);
//     } 
//   }  
//   return foods
// } catch (error){
//   console.error('Error getting food from the cafeteria:', error);
//   throw error;
// }

module.exports = router;