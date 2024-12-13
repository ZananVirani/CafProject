const mongoose = require('mongoose');

const schema = mongoose.Schema;

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