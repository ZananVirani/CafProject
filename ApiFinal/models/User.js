// Things to add
// - Favourite foods (array of food object)

const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
  //consider changing 
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  allergies: {
    type: [String]
  },
  favouriteCafeterias: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cafeteria'
  }]
});

const User = mongoose.model("user", userSchema)

module.exports = User;