const mongoose = require('mongoose');

const schema = mongoose.Schema;

/**
 * Identifies the schema for a Cafeteria.
 * name: Name of the Cafeteria.
 * longitude: Longitude location of the Cafeteria.
 * latitude: Latitude location of the Cafeteria.
 * menu: List of Food items currently available in the Cafeteria.
 * presets: List of preset menus available in the Cafeteria.
 */
const cafSchema = new schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  longitude: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  menu: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food'
  }],
  presets : {
    type : [String],
    required : true
  }
});

const Cafeteria = mongoose.model("cafeteria", cafSchema)

module.exports = Cafeteria;