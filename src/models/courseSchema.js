"use strict";

// Subdocuments
const Step = require("./stepSchema");

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
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
  steps: [Step.schema],
  reviews: [Schema.Types.ObjectId]
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
