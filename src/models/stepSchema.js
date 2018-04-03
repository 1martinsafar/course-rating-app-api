"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StepSchema = new Schema({
  stepNumber: {
    type: Number
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
  }
});

const Step = mongoose.model("Step", StepSchema);
module.exports = Step;
