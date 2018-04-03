"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// maybe _id auto: true
const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  emailAddress: {
    type: String,
    required: true,
    trim: true,
    // unique: true,
    validate: {
          validator: v => {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(v);
          },
          message: "{VALUE} is not a valid email address!"
        },
  },
  password: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("User", UserSchema);

// const User = mongoose.model("User", UserSchema);
// module.exports = User;


//
