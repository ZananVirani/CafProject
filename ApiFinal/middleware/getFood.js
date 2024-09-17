const Cafeteria = require('../models/Cafeteria');
const Food = require('../models/Food');


async function getPresetFoods(menuIds){
  try{

      const food = await Food.find({_id : {$in : menuIds}})
      if (!food) {
        throw Exception("Not good")
      } 
    return food
  } catch (error){
    console.error('Error getting food from the cafeteria:', error);
    throw error;
  }
}

module.exports = getPresetFoods;