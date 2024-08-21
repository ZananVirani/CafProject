const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const getCafs = require('../middleware/getCaf')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    //Prints body of http request
    console.log("req.body: ", req.body);
    
    //Uses destructuring assignment syntax to assign values in body of request to the variables with the same name
    const {studentId, firstName, lastName, password, role, allergies, favouriteCafeterias} = req.body;

    //returns true if user exists in user collection
    const existingUser = await User.findOne({studentId});
  
    // Return error if user exists
    if (existingUser) {
      return res.status(400).send('User already exists.');
    }

    if(favouriteCafeterias != null){
      cafIds = await getCafs(favouriteCafeterias);
      console.log(cafIds)

      //Test to see if assignment works
      const newUser = new User({
      studentId: studentId,
      firstName,
      lastName,
      password,
      role,
      allergies,
      favouriteCafeterias: cafIds
    });

    await User.create(newUser);

    } else{
      const newUser = new User({
        studentId: studentId,
        firstName,
        lastName,
        password,
        role,
        allergies,
        favouriteCafeterias
      });
  
      console.log(newUser)
      await User.create(newUser);
    }

    
    res.send("User added")

  } catch(err){
    console.log("error: ", err)
  }

})

router.post('/login', async (req, res) => {
  try{
    const {studentId, password} = req.body;
    const user = await User.findOne({studentId})
    if(!user){
      return res.status(400).json({message: 'User Not Found'})
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if(!passMatch){
      return res.status(400).json({message: "Password Invalid"})
    }
    // console.log("Secret Key: ", process.env.JWT_SECRET)
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({token});

  } catch (err){
      return res.status(500).json({message: 'Error logging in', error: err.message})
  }
})

module.exports = router;