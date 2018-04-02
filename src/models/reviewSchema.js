"use strict";

const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  postedOn: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    trim: true
  }
});

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Step;
