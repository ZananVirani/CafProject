const mongoose = require('mongoose');

const schema = mongoose.Schema;

const cafSchema = new schema({
  //consider changing 
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
  }]
});

const Cafeteria = mongoose.model("cafeteria", cafSchema)

module.exports = Cafeteria;