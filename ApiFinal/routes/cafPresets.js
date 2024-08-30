const express = require('express');
const mongoose = require('mongoose');
const Food = require('../models/Food')
const CafPreset = require('../models/CafPreset')
const Cafeteria = require('../models/Cafeteria');
const getPresetFoods = require('../middleware/getFood');

const router = express.Router();

router.get("/getPreset/:presetName", async(req, res)=>{
  try {
      const {presetName} = req.params
      const preset = await CafPreset.findOne({name : presetName})

      if (!preset) return res.status(500).json({message : "Server Error"})

      
      let finalFoods = await getPresetFoods(preset.menu)
    
      return res.status(200).json(finalFoods)
  } catch (error) {
    console.log(error)
    return res.status(500).json({error : error})
  }

})

router.patch("/editPreset/:cafeteriaName", async(req, res)=>{
  try {
      const {cafeteriaName} = req.params
      const {presetName, foodIDs} = req.body

      const cafeteria = await Cafeteria.findOne({name : cafeteriaName})
      const preset = await CafPreset.findOne({name : presetName})

      if (!preset) return res.status(500).json({message : "Server Error"})

        const oldFoods = await Food.find({cafeterias : cafeteriaName})
  oldFoods.forEach((item)=>{
    item.cafeterias = item.cafeterias.filter((value)=>value!=cafeteriaName)
    item.save()
  })

  for (let food of foodIDs){
    const item = await Food.findById(food)
    if (item){
    item.cafeterias.push(cafeteriaName)
    item.save()}
  }

      
      preset.menu = foodIDs
      preset.save()

      cafeteria.menu = foodIDs
      cafeteria.save()
    
      return res.status(200).json({message : "Successful edit"})
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
  const {presetName, foodIDs} = req.body

  const cafeteria = await Cafeteria.findOne({name : cafName})

  const newPreset = new CafPreset({
    name : presetName,
    caf : cafName,
    menu : foodIDs
  })

  await CafPreset.create(newPreset).then(async (result)=>{
    cafeteria.presets.push(result.name)
    await cafeteria.save()
  })

// Get Rid of cafeteria from Old food Items
  const oldFoods = await Food.find({cafeterias : cafName})
  oldFoods.forEach((item)=>{
    item.cafeterias = item.cafeterias.filter((value)=>value!=cafName)
    item.save()
  })

  for (let food of foodIDs){
    const item = await Food.findById(food)
    if (item){
    item.cafeterias.push(cafName)
    item.save()}
  }

  cafeteria.menu = foodIDs;
  cafeteria.save();


  return res.sendStatus(200)


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
