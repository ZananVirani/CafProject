const mongoose = require('mongoose');

const schema = mongoose.Schema;

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