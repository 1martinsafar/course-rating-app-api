"use strict";

const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  estimatedTime: {
    type: String
  },
  materialsNeeded: {
    type: String,
    trim: true
  },
  steps: [StepSchema],
  reviews: [Schema.Types.ObjectId]
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
