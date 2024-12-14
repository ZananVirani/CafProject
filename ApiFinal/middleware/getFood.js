const Cafeteria = require('../models/Cafeteria');
const Food = require('../models/Food');

/**
 * Function to get the foods from the preset, which has items in the menuIds array.
 * @param {Array} menuIds: : Array of food ids
 * @returns Preset Foods
 */
async function getPresetFoods(menuIds){
  try{
      // Get the food items from the menuIds array
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