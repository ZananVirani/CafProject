const mongoose = require('mongoose');

const schema = mongoose.Schema;

const cafPresetsSchema = new schema({
  //consider changing 
  name: {
    type: String,
    required: true,
    unique: true
  },
  caf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cafeteria'
  },
  menu: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food'
  }]
});

const CafPresets = mongoose.model("cafPresets", cafPresetsSchema)

module.exports = CafPresets;