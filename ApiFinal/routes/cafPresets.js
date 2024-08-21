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
