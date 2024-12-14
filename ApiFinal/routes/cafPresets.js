/**
 * Defines all of the routes for endpoints related to cafPresets.
 */

const express = require('express');
const mongoose = require('mongoose');
const Food = require('../models/Food')
const CafPreset = require('../models/CafPreset')
const Cafeteria = require('../models/Cafeteria');
const getPresetFoods = require('../middleware/getFood');

const router = express.Router();

/**
 * Delete all the presets in the cafeteria 'cafeteriaName' and the preset names in the body 'presetNames'.
 */
router.patch("/deletePresets/:cafeteriaName", async(req, res)=>{
  try {
      const {cafeteriaName} = req.params
      const {presetNames} = req.body

      // Get the Cafeteria document
      const cafeteria = await Cafeteria.findOne({name : cafeteriaName})

      // Delete all the presets in the cafeteria 'cafeteriaName' and the preset names in the body 'presetNames'.
      const deleted = await CafPreset.deleteMany({$and : [{name : {$in : presetNames}}, {caf : cafeteriaName}]})

      if (!deleted) return res.status(500).json({message : "Server Error"})

      // Remove the preset names from the cafeteria document if the deletion was successful
      cafeteria.presets = cafeteria.presets.filter((item)=>{
        return !presetNames.includes(item)
      })

      cafeteria.save()
    
      return res.status(200).json({message : "Successful edit"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({error : error})
  }

})

/**
 * Get the foods in the preset 'presetName'.
 */
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

/**
 * Edit the preset 'presetName' in the cafeteria 'cafeteriaName', and upload the menu to the cafeteria.
 */
router.patch("/editPreset/:cafeteriaName", async(req, res)=>{
  try {
      const {cafeteriaName} = req.params
      const {presetName, foodIDs} = req.body

      // Get the Cafeteria and CafPreset documents
      const cafeteria = await Cafeteria.findOne({name : cafeteriaName})
      const preset = await CafPreset.findOne({name : presetName})

      if (!preset) return res.status(500).json({message : "Server Error"})

      // Get all the foods being served in the cafeteria.
        const oldFoods = await Food.find({cafeterias : cafeteriaName})
      // Remove the current cafeteria from the cafeterias array of all the foods being served in the cafeteria.
      oldFoods.forEach((item)=>{
        item.cafeterias = item.cafeterias.filter((value)=>value!=cafeteriaName)
        item.save()
      })

      // Add the new cafeteria to the cafeterias array of all the foods in the new preset.
      for (let food of foodIDs){
        const item = await Food.findById(food)
        if (item){
        item.cafeterias.push(cafeteriaName)
        item.save()}
      }

      // Change the preset menu
      preset.menu = foodIDs
      preset.save()

      // Change the cafeteria menu
      cafeteria.menu = foodIDs
      cafeteria.save()
    
      return res.status(200).json({message : "Successful edit"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({error : error})
  }

})

/**
 * Just upload the menu to the cafeteria 'cafeteriaName', but do not do anything with the presets.
 */
router.patch("/tempUpload/:cafeteriaName", async(req, res)=>{
  try {
      const {cafeteriaName} = req.params
      const {foodIDs} = req.body

      const cafeteria = await Cafeteria.findOne({name : cafeteriaName})

      const oldFoods = await Food.find({cafeterias : cafeteriaName})
      // Remove the current cafeteria from the cafeterias array of all the foods being served in the cafeteria.
      oldFoods.forEach((item)=>{
        item.cafeterias = item.cafeterias.filter((value)=>value!=cafeteriaName)
        item.save()
      })

      // Add the new cafeteria to the cafeterias array of all the foods in the new preset.
      for (let food of foodIDs){
        const item = await Food.findById(food)
        if (item){
        item.cafeterias.push(cafeteriaName)
        item.save()}
      }
      
      // Change the cafeteria menu
      cafeteria.menu = foodIDs
      cafeteria.save()
    
      return res.status(200).json({message : "Successful Upload"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({error : error})
  }

})

/**
 * Get all the presets in the cafeteria 'cafeteriaName'.
 */
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

/**
 * Create a new preset in the cafeteria 'cafeteriaName', and upload the menu to the cafeteria.
 */
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

  // Create the new preset, and add it to the cafeteria's presets array if the preset was created successfully.
  await CafPreset.create(newPreset).then(async (result)=>{
    cafeteria.presets.push(result.name)
    await cafeteria.save()
  })

  // Remove the current cafeteria from the cafeterias array of all the foods being served in the cafeteria.
  const oldFoods = await Food.find({cafeterias : cafName})
  oldFoods.forEach((item)=>{
    item.cafeterias = item.cafeterias.filter((value)=>value!=cafName)
    item.save()
  })

  // Add the new cafeteria to the cafeterias array of all the foods in the new preset.
  for (let food of foodIDs){
    const item = await Food.findById(food)
    if (item){
    item.cafeterias.push(cafName)
    item.save()}
  }

  // Change the cafeteria menu
  cafeteria.menu = foodIDs;
  cafeteria.save();


  return res.sendStatus(200)


  }catch(error){
    console.log(error)
    return res.status(500).json({error : error})
  }
})

module.exports = router;
