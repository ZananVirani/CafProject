const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
require('dotenv').config();

// URI to connect to the MongoDB database, stored in .env file
const uri = process.env.MONGODB_CONNECTION_STRING;

/**
 * Connects the application to the MongoDB database, throws an error if connection fails
 */
const connectDB = async () => {
  try{
    mongoose.connect(uri, {
      useNewURLParser: true,
      useUnifiedTopology: true
    });
    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("MongoDB database connection established succesfully.")
      bucket = new GridFSBucket(connection.db, { bucketName: 'images' });
      console.log('GridFS bucket created');
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;


