const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
const cafeteriaRoutes = require('./routes/cafeterias');
const foodRoutes = require('./routes/foods');
const reviewRoutes = require('./routes/reviews')


const app = express();

//Connects to Database
connectDB();

// Middleware - ensures you can use body for post request
app.use(express.json());

//Import Routes
app.use('/users', userRoutes);
app.use('/cafeterias', cafeteriaRoutes);
app.use('/foods', foodRoutes);
app.use('/reviews', reviewRoutes);

module.exports = app;

