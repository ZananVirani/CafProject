const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
const cafeteriaRoutes = require('./routes/cafeterias');
const foodRoutes = require('./routes/foods');
const reviewRoutes = require('./routes/reviews')



const app = express();

app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));
//app.use('/uploads', express.static('uploads'));

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

