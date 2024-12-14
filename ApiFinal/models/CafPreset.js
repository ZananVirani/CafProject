const mongoose = require('mongoose');

const schema = mongoose.Schema;

/**
 * Identifies the schema for a Cafeteria Preset menu
 * name: Name of the Cafeteria Preset menu.
 * caf: Id of the Cafeteria the preset belongs to.
 * menu: List of Food items in the Cafeteria Preset menu.
 */
const cafPresetsSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  caf: {
    type : String,
    required : true
  },
  menu: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food'
  }]
});

const CafPresets = mongoose.model("cafPresets", cafPresetsSchema)

module.exports = CafPresets;