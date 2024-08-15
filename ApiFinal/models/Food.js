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
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'fs.files', 
    required: true 
  },
  ingredients: { 
    type: [String],
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
  cafeterias: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cafeteria' 
  }]
})

const Food = mongoose.model("food", foodSchema)

module.exports = Food;