const Cafeteria = require('../models/Cafeteria');
const Food = require('../models/Food');

// async function getFood(foodId, foods){
//   const food = await Food.findById(foodId) 
//   foods.push(food)
//   return foods       
// }

// module.exports = getFood;

async function getFoodFromCaf(menuIds){
  try{
    foods = []

    for(foodId of menuIds){
      const food = await Food.findById(foodId)
      if (food) {
        foods.push(food);
      } 
    }  
    return foods
  } catch (error){
    console.error('Error getting food from the cafeteria:', error);
    throw error;
  }
}

module.exports = getFoodFromCaf;