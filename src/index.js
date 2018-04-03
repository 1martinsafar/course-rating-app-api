"use strict";

// Models
const User = require("./models/userSchema");
const Step = require("./models/stepSchema");
const Review = require("./models/reviewSchema");
const Course = require("./models/courseSchema");

// Modules
const express = require("express");
const app = express();

const morgan = require("morgan");
const mongoose = require("mongoose");

// Mongoose-seeder
const seeder = require('mongoose-seeder');
const data = require('./data/data.json');

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/course-rating-app");
const db = mongoose.connection;
// MongoDB errror
db.on("error", err => console.error("connection error:", err));
// MongoDB ready
// db.once("open", function() {
//   console.log("db connection successful");
//   // All database communication goes here
//   seeder.seed(data).then(function(dbData) {
//       // The database objects are stored in dbData
//       console.log("The database objects are stored in dbData");
//   }).catch(function(err) {
//       // handle error
//       console.log("Error Seeding the database with data!");
//   });
// });

// mongoose.connection.on('connected', function() {
//     seeder.seed(data);
// });

mongoose.connection.on("connected", function(ref) {
  console.log("\n\nConnected!\n\n");
  seeder.seed(data, {dropDatabase: false}).then(function(dbData) {
      // The database objects are stored in dbData
      console.log("The database objects are stored in dbData");
  }).catch(function(err) {
      // handle error
      console.log("Error Seeding the database with data!");
      console.log(err);
  });
});

// set our port
app.set("port", process.env.PORT || 5000);

// morgan gives us http request logging in the console
app.use(morgan("dev"));

// setup our static route to serve files from the "public" folder
app.use("/", express.static("public"));

// catch 404 and forward to global error handler
app.use((req, res, next) => {
  const err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

// Express's global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

// start listening on our port
const server = app.listen(app.get("port"), () => {
  console.log("Express server is listening on port " + server.address().port);
});




//
