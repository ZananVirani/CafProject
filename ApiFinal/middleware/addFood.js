const Cafeteria = require('../models/Cafeteria');
const Food = require('../models/Food');

//Fix Function
async function addFoodItemToCafeteria(cafeteriaName, foodName) {
  try {
    //.findOne check for documents in collection by selected Condition
    const cafeteria = await Cafeteria.findOne({name: cafeteriaName});
    //console.log(cafeteria)
    const food = await Food.findOne({name: foodName});
    //console.log(food)

    // Add references to each other if not already present
    if (!cafeteria.menu.includes(food._id)) {
      cafeteria.menu.push(food._id);
      await cafeteria.save();
    }

    if (!food.cafeterias.includes(cafeteria._id)) {
      food.cafeterias.push(cafeteria._id);
      await food.save();
    }
  } catch (error) {
    console.error('Error adding food item to cafeteria:', error);
  }
}

module.exports = addFoodItemToCafeteria;