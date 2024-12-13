const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require("path")
const Food = require('../models/Food');
const User = require('../models/User');

const router = express.Router();

router.post("/", async (req,res) => {
  try{
    const {name, image, allergies, type, cafeterias} = req.body


    const newFood = new Food({
      name: name,
      image: image,  
      allergies: allergies,
      type: type,
      cafeterias: cafeterias
    });

    let something = await Food.create(newFood);

    res.status(201).json(something);

  } catch(err){
    console.log("error: ", err);
    res.status(500).send('Server error');
  }

})


router.patch('/tempRoute', async (req, res) =>{
  try{
    const temp = req.headers.mimetype
    const name = Date.now() + '.' + temp.split('/')[1]
    const smth = path.join(__dirname, '../uploads/')
    req.pipe(fs.createWriteStream(smth + name))
    return res.status(200).send(name)
  }
  catch (error){

    console.log(error)
    return res.status(500).send(null);
  }
})

router.get('/food/:foodName/:userID', async (req, res)=>{
  try{
    const {foodName, userID} = req.params

    const user = await User.findOne({studentId : userID})
    const food = await Food.findOne({name : foodName})


    if (!food || !user) return res.status(400).json({message : "Not Found"})

    return res.json({foods : food, user : user})
  }catch(e){
    res.status(500).json({message : e.message})
  }
})

router.get('/allFoods', async (req, res) =>{
  try{
    const {studentId} = req.query
    const foods = await Food.find({});
    if (studentId){
    const user = await User.findOne({studentId})
    return res.json({foods : foods, user : user});
    }else{
      return res.json(foods)
    }
  } catch (err){
    console.log(err)
    res.status(500).json({message: 'Error retrieving users', error: err.message })
  }
})


router.get('/getCafs/:foodName', async(req, res) =>{
  const food = req.params;

  const cafs = Food.findOne({foodName}, cafeterias)
})
  

module.exports = router;