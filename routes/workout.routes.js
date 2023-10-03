const express = require("express");
const router = express.Router();


router.get("/workout", (req, res, next) => {
    console.log("Let's go!")
  res.json("Alice is working OUT?! ....😂!");
});

module.exports = router;





// const express = require("express");
// const router = express.Router();
// const User = require("../models/User.model");
// const Workout= require("../models/Workout.model.js")


// router.post('/workout', (req, res) => {
//   const { workoutNumber } = req.body;
//    const userId = req.payload._id;
//   // Find the admin-created workout by its unique workout number
//   Workout.findOne({ workoutNumber })
//     .then((adminWorkout) => {
//       if (!adminWorkout) {
//         return res.status(404).json({ error: 'Admin workout not found' });
//       }
   
    
//       // Create a new user-specific workout based on the admin's workout
//       const userWorkout = new Workout({
//         title: adminWorkout.title,
//         description: adminWorkout.description,
//         imageUrl: adminWorkout.imageUrl,
//         // You can copy other fields as needed
//       });
      
//       // Save the user-specific workout
//       return userWorkout.save();
//     })
//     .then((userWorkout) => {
//       // Add the user-specific workout to the user's profile
//       return User.findByIdAndUpdate(
//         userId,
//         { $push: { workouts: userWorkout._id } }, // Push the workout ID into the workouts array
//         { new: true } // Return the updated user document
//       );
//     })
//     .then((updatedUser) => {
//       res.status(201).json({ userWorkoutId: userWorkout._id, updatedUser });
//     })
//     .catch((error) => {
//       res.status(400).json({ error: error.message });
//     });
// });

// // Get all user-specific workouts
// router.get('/workout', (req, res) => {
//   Workout.find()
//     .then((userWorkouts) => {
//       res.json(userWorkouts);
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });

// // Get a specific user-specific workout by ID
// router.get('/workout/:id', (req, res) => {
//   Workout.findById(req.params.id)
//     .then((userWorkout) => {
//       if (!userWorkout) {
//         return res.status(404).json({ error: 'User-specific workout not found' });
//       }
//       res.json(userWorkout);
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });

// // Delete a user-specific workout by ID
// router.delete('/workout/:id', (req, res) => {
//   Workout.findByIdAndDelete(req.params.id)
//     .then(() => {
//       res.sendStatus(204);
//     })
//     .catch((error) => {
//       res.status(400).json({ error: error.message });
//     });
// });

// module.exports = router;
