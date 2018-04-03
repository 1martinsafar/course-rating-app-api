"use strict";

const mongoose = require("mongoose");
// MongoDB connection
mongoose.connect("mongodb://localhost:27017/testing-courses");
const db = mongoose.connection;

// Mongoose-seeder
const seeder = require('mongoose-seeder');
const data = require('./data/test-data.json');

// Models
const User = require("./models/userSchema");
mongoose.model('User');

// const Step = require("./models/stepSchema");
// const Review = require("./models/reviewSchema");
// const Course = require("./models/courseSchema");

mongoose.connection.once("connected", function(ref) {
  console.log("\n\nConnected!\n\n");
  // console.log(User);
  // console.log(User.schema);
  seeder.seed(data, {dropDatabase: false}).then(function(dbData) {
    // The database objects are stored in dbData
    console.log("The database objects are stored in dbData");
  }).catch(function(err) {
    // handle error
    console.log("Error Seeding the database with data!");
    console.log(err);
  });
});
