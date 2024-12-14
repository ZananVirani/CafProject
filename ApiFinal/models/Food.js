const mongoose = require('mongoose');

const schema = mongoose.Schema;

/**
 * Identifies the schema for a Food item.
 * name: Name of the Food item.
 * image: String of the filename of the picture of the Food item.
 * allergies: List of allergies the Food item contains.
 * type: Type of the Food item (hot food or interactive).
 * averageRating: Average rating of the Food item.
 * cafeterias: List of Cafeterias that serve the Food item.
 */
const foodSchema = new schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: { 
    type: String, 
    required: true 
  },
  allergies: { 
    type: [String],
    required: true
  },
  type: {
    type: String,
    required: true
  },
  averageRating: {
    type: Number,
    default: 7
  },
  cafeterias: { 
    type: [String], 
    default : []
  }
})

const Food = mongoose.model("food", foodSchema)

module.exports = Food;