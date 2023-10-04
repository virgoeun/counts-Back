const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Workout= require("../models/Workout.model.js")
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const fileUploader = require("../config/cloudinary.config");

// Initialize Multer with the configured storage
const upload = multer({ CloudinaryStorage });

router.post('/admin-workout', fileUploader.single("imageFile"), (req, res) => {
  const { workoutNumber, title, description } = req.body;

  // Check if an image file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  // Assuming you have already configured Multer to upload the image to Cloudinary
  const imageUrl = req.file.path;

  const newWorkout = new Workout({ workoutNumber, title, description, imageUrl });
  const userId = req.payload._id; // admin user id

  newWorkout
    .save()
    .then((savedWorkout) => {
      // Update the user's document to add the workout plan
      User.findByIdAndUpdate(
        userId, // Assuming you have access to the user's ID via req.payload
        { $push: { workouts: savedWorkout._id } }, // Push the workout ID into the workouts array
        { new: true } // Return the updated user document
      )
        .then((updatedUser) => {
          if (!updatedUser) {
            res.status(404).json({ error: 'User not found' });
          } else {
            res.status(201).json(savedWorkout);
          }
        })
        .catch((error) => {
          res.status(500).json({ error: 'Internal server error' });
        });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});
  

  // router.get('/admin-workout', (req, res) => {
  //   Workout.find()
  //     .then((workouts) => {
  //       res.json(workouts);
  //       console.log("allWorkouts!", workouts)
  //     })
  //     .catch((error) => {
  //       res.status(500).json({ error: 'Internal server error' });
  //     });
  // });

//do I need this?
  router.get('/admin-workout/:workoutId', (req, res) => {
    const { workoutId } = req.params;
    Workout.findById(workoutId)
      .then((workoutPlan) => {
        if (!workoutPlan) {
          res.status(404).json({ error: 'Workout plan not found' });
        } else {
          res.json(workoutPlan);
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Internal server error' });
      });
  });

  //EDIT

  router.put('/admin-workout/::workoutId', (req, res) => {
    const { workoutId } = req.params;
    Workout.findByIdAndUpdate(workoutId, req.body, { new: true })
      .then((updatedWorkout) => {
        res.json(updatedWorkout);
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  });

  router.delete('/admin-workout/::workoutId', (req, res) => {
    const { workoutId } = req.params;
    Workout.findByIdAndDelete(workoutId)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  });


//For counting likes with all fetched workouts data : GET
router.get("/admin-workout", (req, res) => {
  Workout.find()
    .then((workouts) => {
      const workoutsWithLikeCount = workouts.map((workout) => ({
        ...workout.toObject(),
        likeCount: workout.likes.length,//userIds length
      }));
      res.json(workoutsWithLikeCount);
      console.log("Workoutwithcounts", workoutsWithLikeCount)
    })
    .catch((error) => {
      console.error("Error fetching workout data:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});


module.exports = router;
