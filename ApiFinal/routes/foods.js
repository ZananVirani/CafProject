const express = require('express');
const mongoose = require('mongoose');
const Food = require('../models/Food');
const uploadImage = require('../middleware/uploadImage')

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    //Prints body of http request
    console.log("req.body: ", req.body);
    
    //Uses destructuring assignment syntax to assign values in body of request to the variables with the same name
    const {name, image, ingredients, allergies, type, cafeterias} = req.body;

    const imageName = `${name}.jpg`;

    //Converts Base64 to buffer
    let imageBuffer;
    if (image.startsWith('data:')) {
      // Remove the base64 prefix (e.g., 'data:image/jpeg;base64,')
      const base64Data = image.split(',')[1];
      imageBuffer = Buffer.from(base64Data, 'base64');
    } else {
      return res.status(400).send('Invalid image format');
    }


    const imageId = await new Promise((resolve, reject) => {
      uploadImage(imageBuffer, imageName, (err, id) => {
        if (err) {
          console.error('Failed to upload image:', err);
          reject(err);  // Reject the promise with the error
          return;
        }
        resolve(id);  // Resolve the promise with the imageId
      });
    });

    console.log("complete")

    //Test to see if assignment works
    const newFood = new Food({
      name: name,
      image: imageId,  
      ingredients: ingredients,
      allergies: allergies,
      type: type,
      cafeterias: cafeterias
    });

    await Food.create(newFood);

    res.send("Food added")

  } catch(err){
    console.log("error: ", err)
  }

})

router.get('/:foodName', async (req, res) => {
  try {
    const {foodName} = req.params;
    
    //Returns image along with food data
    //May not need .populate('image') since It's already returned in food
    const food = await Food.findOne({name: foodName});

    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    //Fetch image from GridFs using imageId
    const downloadStream = bucket.openDownloadStream(food.image);
    let imageData = [];

    downloadStream.on('data', (chunk) => {
      imageData.push(chunk);
    });

    //Triggers when all chunks have been pushed to array
    downloadStream.on('end', () => {
      //Holds image data as a single buffer object
      const buffer = Buffer.concat(imageData);
      //Converts buffer to base64 string
      const base64Image = buffer.toString('base64');
      const mimeType = 'image/jpeg'; // Adjust MIME type if necessary


      //console.log(food)
      // Respond with the food data and image as a Base64-encoded string
      res.json({
        ...food.toObject(),
         image: `data:${mimeType};charset=utf-8;base64,${base64Image}`
      });
    });

    //respond instead of print to terminal
    
    //res.json(food);
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({ message: 'Server error' });
  }
})

module.exports = router;