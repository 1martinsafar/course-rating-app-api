"use strict";

const mongoose = require("mongoose");

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/courses");
const db = mongoose.connection;
// MongoDB errror
db.on("error", err => console.error("connection error:", err));
// MongoDB ready
db.once("open", () => {
  console.log("db connection successful");
  // All database communication goes here

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

  // const ObjectId = mongoose.Schema.Types.ObjectId;
  const ReviewSchema = new Schema({
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
    steps: [StepSchema],
    reviews: [Schema.Types.ObjectId]
  });

  const User = mongoose.model("User", UserSchema);
  const Step = mongoose.model("Step", StepSchema);
  const Review = mongoose.model("Review", ReviewSchema);
  const Course = mongoose.model("Course", CourseSchema);

  const userData = [
    // {
    //   fullName: "FullName1",
    //   emailAddress: "user1@example.com",
    //   password: "password1"
    // },
    {
      fullName: "FullName2",
      emailAddress: "user2@example.com",
      password: "password2"
    }
  ];

  const stepData = [
    {
      stepNumber: 1,
      title: "Step 1",
      description: "Description 1"
    },
    {
      stepNumber: 2,
      title: "Step 2",
      description: "Description 2"
    }
  ];

  // let reviewData;
  // User.findOne({ 'fullName': 'FullName1' })
  // .then(function(result) {
  //   console.log("result");
  //   reviewData = [
  //     {
  //       user: result,
  //       rating: 3,
  //       review: "Decent"
  //     }
  //   ];
  //   Review.remove({}, function(err) {
  //     if (err) { console.log("Error Removing STEP."); }
  //     Review.create(reviewData, function(err, reviews) {
  //       if (err) { console.error("Error Saving STEP.", err); }
  //       console.log("Saved STEP.");
  //       Review.find({}, function(err, reviews) {
  //         reviews.forEach(function(review) {
  //           console.log(review);
  //         });
  //         db.close(function() {
  //           console.log("db connection closed");
  //         });
  //       });
  //     });
  //   });
  // });

  let courseData;
  User.findOne({ "fullName": "FullName1" })
  .then(function(resultUser) {
    const userId = resultUser;
    Step.findOne({ "title": "Step 1" })
    .then(function(resultStep) {
      const step = resultStep;
      console.log(step);

      courseData = [
        {
          user: userId,
          title: "Introduction to Mongoose",
          description: "learn mongoose basics",
          estimatedTime: "183",
          materialsNeeded: "MongoDB Basics, Node.js, Express.js",
          steps: [step, step],
          reviews: [userId, userId]
        }
      ];
      Course.remove({}, function(err) {
        if (err) { console.log("Error Removing STEP."); }
        Course.create(courseData, function(err, courses) {
          if (err) { console.error("Error Saving STEP.", err); }
          console.log("Saved STEP.");
          Course.find({}, function(err, courses) {
            courses.forEach(function(course) {
              console.log(course);
            });
            db.close(function() {
              console.log("db connection closed");
            });
          });
        });
      });

    });
  });

  UserSchema.pre("save", true, function(next, done) {
    const self = this;
    mongoose.models["User"].findOne({emailAddress: self.emailAddress}, function(err, found) {
      if (err) {
        done(err);
      } else if (found) {
        self.invalidate("emailAddress","That email address is already taken.");
        done(new Error("Email must be unique!"));
      } else {
        done();
      }
    });
    next();
  });

  // Mongoose-seeder
  const seeder = require('mongoose-seeder');
  const data = require('./data/data.json');

  seeder.seed(data, {dropDatabase: false}).then(function(dbData) {
      // The database objects are stored in dbData
      console.log("The database objects are stored in dbData");
  }).catch(function(err) {
      // handle error
      console.log("Error Seeding the database with data!");
      console.log(err);
  });


  // User.remove({"fullName": "FullName2"}, function(err) {
  //   if (err) { console.log("Error Removing USER."); }
  //   User.create(userData, function(err, users) {
  //     if (err) { console.error("Error Saving USER.", err); }
  //     console.log("Saved USER.");
  //     User.find({}, function(err, users) {
  //       users.forEach(function(user) {
  //         console.log(user);
  //       });
  //       db.close(function() {
  //         console.log("db connection closed");
  //       });
  //     });
  //   });
  // });


  // Step.remove({}, function(err) {
  //   if (err) { console.log("Error Removing STEP."); }
  //   Step.create(stepData, function(err, steps) {
  //     if (err) { console.error("Error Saving STEP.", err); }
  //     console.log("Saved STEP.");
  //     Step.find({}, function(err, steps) {
  //       steps.forEach(function(animal) {
  //         console.log(animal);
  //       });
  //       db.close(function() {
  //         console.log("db connection closed");
  //       });
  //     });
  //   });
  // });

  // User.find({}, function(err, users) {
  //   users.forEach(function(user) {
  //     console.log(user);
  //   });
  // });
  //
  // Step.find({}, function(err, steps) {
  //   steps.forEach(function(step) {
  //     console.log(step);
  //   });
  //   db.close(function() {
  //     console.log("db connection closed");
  //   });
  // });

});





// MONGO CONSOLE COMMANDS
/*

show dbs
use courses

db.getCollectionNames()
db.users.find()

*/



//
