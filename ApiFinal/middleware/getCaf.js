const Cafeteria = require('../models/Cafeteria');

async function getCafs(cafs){
  try{
    cafIds = []

    for(caf of cafs){
      const cafId = await Cafeteria.findOne({name: caf})
      if (cafId) {
        cafIds.push(cafId._id);
      } 
    }  
    return cafIds
  } catch (error){
    console.error('Error getting food from the cafeteria:', error);
    throw error;
  }
}

module.exports = getCafs;