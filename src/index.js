"use strict";

// load modules
const express = require("express");
const app = express();

const morgan = require("morgan");
const mongoose = require("mongoose");

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/courses");
const db = mongoose.connection;
// MongoDB errror
db.on("error", err => console.error("connection error:", err));
// MongoDB ready
db.once("open", () => console.log("db connection successful"));

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
