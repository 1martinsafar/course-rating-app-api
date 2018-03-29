"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// maybe _id auto: true
const User = new Schema({
  _id: { type: ObjectId },
  fullName: { type: String, required: true, trim: true },
  emailAddress: { type: String, required: true,  trim: true },
  password: { type: String, required: true },
});

const Steps = new Schema({
  stepNumber: { type: Number },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const Reviews = new Schema({
  _id: { type: ObjectId },
  user: User._id,
  postedOn: { type: Date, default: Date.now },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String }
});

const Course = new Schema({
  _id: { type: ObjectId },
  user: User._id,
  title: { type: String, required: true },
  description: { type: String, required: true },
  estimatedTime: { type: String },
  materialsNeeded { type: String },
  steps: [Steps],
  reviews: [Reviews._id]
});





//
