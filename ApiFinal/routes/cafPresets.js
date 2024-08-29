const express = require('express');
const mongoose = require('mongoose');
const Food = require('../models/Food')
const CafPreset = require('../models/CafPreset')
const Cafeteria = require('../models/Cafeteria')

const router = express.Router();

router.get("/getPreset", async(req, res)=>{
  try {
      const {presetName} = req.body
      const preset = await CafPreset.findOne({name : presetName})

      if (!preset) return res.status(500).json({message : "Server Error"})
    
      return res.status(200).json(preset)
  } catch (error) {
    console.log(error)
    return res.status(500).json({error : error})
  }

})

router.get("/:cafeteriaName", async(req, res)=>{
  try {
      const cafName = req.params.cafeteriaName
    
      const cafeteria = await Cafeteria.findOne({name : cafName})

      const presets = cafeteria.presets

    
      return res.status(200).send(presets)
  } catch (error) {
    console.log(error)
    return res.status(500).json({error : error})
  }

})

router.post("/:cafeteriaName", async (req, res) =>{
  try{
  const cafName = req.params.cafeteriaName
  const {presetName, foodIds} = req.body

  const cafeteria = await Cafeteria.findOne({name : cafName})

  const newPreset = new CafPreset({
    name : presetName,
    caf : cafName,
    menu : foodIds
  })

  await CafPreset.create(newPreset).then(async (result)=>{
    cafeteria.presets.push(result.name)
    await cafeteria.save()
  })



  }catch(error){
    return res.status(500).json({error : error})
  }
})

// router.get('/', async (req,res) =>{
//   const {name, caf, menu} = req.body;

//   menuitems = []

//   for(food of menu){
//     const foodItem = await Food.findOne({name: food})
//     if(foodItem){
//       menuItems.push(foodItem)
//     }
//   }
  
//   cafId = await Cafeteria.findOne({name: caf})

//   const newCafPreset = new CafPreset({
//     name,
//     caf: cafId,
//     menu: menuItems
//   })

//   await CafPreset.create(newCafPreset);
// })

// router.get('/', async (req,res) => {
//   try{
//     const {presetName} = req.body;

//     const cafPreset = CafPreset.findOneAndDelete({name: presetName})

//     res.send(cafPreset)

//   } catch(err){
//     res.status(400).send("error: ", err)

//   }
// })

// router.patch("/", async(req, res) => {
//   try{
//     const {presetName, foods, type} = req.body;

//     if(type === "remove"){
//       const removedFood = await CafPreset.findOneAndUpdate({name: presetName},  { $pull: { menu: { $in: foods}}}, {new: true})
//       res.send("food removed: ", foods)
//     } else if(type === "add"){
//       const addedFood = await CafPreset.findOneAndUpdate({name: presetName}, { $addToSet: { menu: { $each: foods}}}, {new: true})
//       res.send("food added: ", foods)
//     }
//   } catch(err){
//     res.status("error: ", err)
//   }
// })

module.exports = router;
