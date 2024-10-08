// Things to add
// - Allergies (array of strings)

const mongoose = require('mongoose');

const schema = mongoose.Schema;

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
  // ingredients: { 
  //   type: [String],
  //   required: false
  // },
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