const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    type: [String],
    enum: ['Meat', 'Gluten', 'Pork', 'Dairy', 'Seafood', 'Nuts'], 
  },
  favouriteCafeterias: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cafeteria'
  }],
  favouriteFoods: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food'
  }],
});

userSchema.pre('save', async function (next) {
  console.log('Password before hashing:', this.password);
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("user", userSchema)

module.exports = User;