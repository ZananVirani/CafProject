const express = require('express');
const mongoose = require('mongoose');
const Food = require('..models/Food')
const CafPreset = require('..models/CafPreset')
const Cafeteria = require('..models/Cafeteria')

const router = express.Router();

router.get('/', async (req,res) =>{
  const {name, caf, menu} = req.body;

  menuitems = []

  for(food of menu){
    const foodItem = await Food.findOne({name: food})
    if(foodItem){
      menuItems.push(foodItem)
    }
  }
  
  cafId = await Cafeteria.findOne({name: caf})

  const newCafPreset = new CafPreset({
    name,
    caf: cafId,
    menu: menuItems
  })

  await CafPreset.create(newCafPreset);
})

router.get('/', async (req,res) => {
  try{
    const {presetName} = req.body;

    const cafPreset = CafPreset.findOneAndDelete({name: presetName})

    res.send(cafPreset)

  } catch(err){
    res.status(400).send("error: ", err)

  }
})

router.patch("/", async(req, res) => {
  try{
    const {presetName, foods, type} = req.body;

    if(type === "remove"){
      const removedFood = await CafPreset.findOneAndUpdate({name: presetName},  { $pull: { menu: { $in: foods}}}, {new: true})
      res.send("food removed: ", foods)
    } else if(type === "add"){
      const addedFood = await CafPreset.findOneAndUpdate({name: presetName}, { $addToSet: { menu: { $each: foods}}}, {new: true})
      res.send("food added: ", foods)
    }
  } catch(err){
    res.status("error: ", err)
  }
})

module.exports = router;
