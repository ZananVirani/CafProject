//Link to set up multer: https://medium.com/swlh/how-to-upload-image-using-multer-in-node-js-f3aeffb90657
//Secondary resource: https://www.sammeechward.com/uploading-images-express-and-react 
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require("path")
const Food = require('../models/Food');
// const uploadImage = require('../middleware/uploadImage')

const router = express.Router();

router.post("/", async (req,res) => {
  try{
    const {name, image, ingredients, allergies, type, cafeterias} = req.body


    const newFood = new Food({
      name: name,
      image: image,  
      ingredients: ingredients,
      allergies: allergies,
      type: type,
      cafeterias: cafeterias
    });

    await Food.create(newFood);

    res.status(201).send("Food added successfully");

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
// router.post("/", async (req, res) => {
//   try {
//     //Prints body of http request
//     console.log("req.body: ", req.body);
    
//     //Uses destructuring assignment syntax to assign values in body of request to the variables with the same name
//     //Consider discluding ingredients
//     const {name, image, ingredients, allergies, type, cafeterias} = req.body;

//     const imageName = `${name}.jpg`;

//     //Converts Base64 to buffer
//     let imageBuffer;
//     if (image.startsWith('data:')) {
//       // Remove the base64 prefix (e.g., 'data:image/jpeg;base64,')
//       const base64Data = image.split(',')[1];
//       imageBuffer = Buffer.from(base64Data, 'base64');
//     } else {
//       return res.status(400).send('Invalid image format');
//     }


//     const imageId = await new Promise((resolve, reject) => {
//       uploadImage(imageBuffer, imageName, (err, id) => {
//         if (err) {
//           console.error('Failed to upload image:', err);
//           reject(err);  // Reject the promise with the error
//           return;
//         }
//         resolve(id);  // Resolve the promise with the imageId
//       });
//     });

//     console.log("complete")

//     //Test to see if assignment works
//     const newFood = new Food({
//       name: name,
//       image: imageId,  
//       ingredients: ingredients,
//       allergies: allergies,
//       type: type,
//       cafeterias: cafeterias
//     });

//     await Food.create(newFood);

//     res.send("Food added")

//   } catch(err){
//     console.log("error: ", err)
//   }

// })

// router.get('/food/:foodName', async (req, res) => {
//   try {
//     const {foodName} = req.params;
    
//     //Returns image along with food data
//     //May not need .populate('image') since It's already returned in food
//     const food = await Food.findOne({name: foodName});

//     if (!food) {
//       return res.status(404).json({ message: 'Food item not found' });
//     }

//     //Fetch image from GridFs using imageId
//     const downloadStream = bucket.openDownloadStream(food.image);
//     let imageData = [];

//     downloadStream.on('data', (chunk) => {
//       imageData.push(chunk);
//     });

//     //Triggers when all chunks have been pushed to array
//     downloadStream.on('end', () => {
//       //Holds image data as a single buffer object
//       const buffer = Buffer.concat(imageData);
//       //Converts buffer to base64 string
//       const base64Image = buffer.toString('base64');
//       const mimeType = 'image/jpeg'; // Adjust MIME type if necessary


//       //console.log(food)
//       // Respond with the food data and image as a Base64-encoded string
//       res.json({
//         ...food.toObject(),
//          image: `data:${mimeType};charset=utf-8;base64,${base64Image}`
//       });
//     });

//     //respond instead of print to terminal
    
//     //res.json(food);
//   } catch (error) {
//     console.error('Error fetching food items:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// })


router.get('/allFoods', async (req, res) =>{
  try{
    const foods = await Food.find({});
    console.log(foods)
    res.json(foods);
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