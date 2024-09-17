const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
require('dotenv').config();


const uri = process.env.MONGODB_CONNECTION_STRING;


const connectDB = async () => {
  try{
    mongoose.connect(uri, {
      useNewURLParser: true,
      //useCreateIndex: true,
      useUnifiedTopology: true
    });
    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("MongoDB database connection established succesfully.")
      // Initialize the GridFS bucket
      bucket = new GridFSBucket(connection.db, { bucketName: 'images' });
      console.log('GridFS bucket created');
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;


