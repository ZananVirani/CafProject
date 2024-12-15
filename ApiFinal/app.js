const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
const cafeteriaRoutes = require('./routes/cafeterias');
const foodRoutes = require('./routes/foods');
const reviewRoutes = require('./routes/reviews')
const presetRoutes = require('./routes/cafPresets')
const path = require('path')



const app = express();

// Middleware - ensures you can use body for post request
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Allows for images to be accessed through the url
app.use('/images', express.static(path.join(__dirname, 'uploads')));

//Connects to Database
connectDB();

//Import Routes
app.use('/users', userRoutes);
app.use('/cafeterias', cafeteriaRoutes);
app.use('/foods', foodRoutes);
app.use('/reviews', reviewRoutes);
app.use('/presets', presetRoutes)

module.exports = app;

