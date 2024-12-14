const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema;

/**
 * Identifies the schema for a User.
 * studentId: Student ID of the User.
 * firstName: First name of the User.
 * lastName: Last name of the User.
 * password: Password of the User.
 * role: Role of the User (user or admin).
 * allergies: List of allergies the User has.
 * favouriteCafeterias: List of favourite Cafeterias of the User.
 * favouriteFoods: List of favourite Food items of the User.
 */
const userSchema = new schema({
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
    required: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  allergies: {
    type: [String],
    enum: ['Meat', 'Gluten', 'Pork', 'Dairy', 'Seafood', 'Nuts'], 
  },
  favouriteCafeterias: {
    type: [String],
    enum: ["Ontario Hall", "Saugeen Hall", "Perth Hall", "Sydenham Hall", "Delaware Hall", "Elgin Hall", "Essex Hall"], 
  },
  favouriteFoods: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food'
  }],
});

const User = mongoose.model("user", userSchema)

module.exports = User;