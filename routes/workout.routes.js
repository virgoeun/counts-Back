const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout.model"); 
const User = require("../models/User.model")


router.get("/workout/:workoutId/liked", (req, res) => {
  const { workoutId } = req.params;
  const userId = req.payload._id; 

  Workout.findById(workoutId)
    .exec()
    .then((workout) => {
      if (!workout) {
        res.status(404).json({ message: "Workout not found" });
      } else {
        const liked = workout.likes.includes(userId);
        res.json({ liked });
      }
    })
    .catch((error) => {
      console.error("Error fetching like status:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.post("/workout/:workoutId/liked", (req, res) => {
  const { workoutId } = req.params;
  const userId = req.payload._id; // Assuming you have user authentication middleware

  Workout.findById(workoutId)
    .exec() //execute the query and return a promise that resolves to the result of the query(Mongoose)
    .then((workout) => {
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }

      // Update the workout to add the user to its likes
      workout.likes.push(userId);
      return workout.save();
    })
    .then(() => {
      // Update the user's likes to include the liked workout
      return User.findByIdAndUpdate(
        userId,
        { $push: { "likes.workouts": workoutId } },
        { new: true }
      );
    })
    .then(() => {
      res.json({ message: "Workout liked" });
    })
    .catch((error) => {
      console.error("Error liking workout:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});


router.delete("/workout/:workoutId/liked", (req, res) => {
  const { workoutId } = req.params;
  const userId = req.payload._id; // Assuming you have user authentication middleware

  Workout.findById(workoutId)
    .exec()
    .then((workout) => {
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }

      const userIndex = workout.likes.indexOf(userId); //If userId is in the workout.likes array, it returns the index of userId. If not, it returns -1.

      if (userIndex !== -1) { //NOT of "if userId is NOT in the array" : SO userID exists
        workout.likes.splice(userIndex, 1);
        return workout.save();
      }

      return Promise.resolve(); // Resolve the promise if user hasn't liked the workout (meaning userIndex ===-1)
    })
    .then(() => {
      // Remove the workout ID from the user's liked workouts
      return User.findByIdAndUpdate(
        userId,
        { $pull: { "likes.workouts": workoutId } },
        { new: true }
      );
    })
    .then(() => {
      res.json({ message: "Workout unliked" });
    })
    .catch((error) => {
      console.error("Error unliking workout:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});


router.get("/workout", (req, res) => {
  // Fetch workouts with like counts and user details for likes
  Workout.find()
    .populate('likes', 'username')  // Populate the user details (you can add other user fields you need)
    .then(workouts => {
      const workoutsWithLikeCount = workouts.map(workout => ({
        ...workout.toObject(),
        likeCount: workout.likes.length,  // User IDs length
      }));
      res.json(workoutsWithLikeCount);
      console.log("Workouts with counts:", workoutsWithLikeCount);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});


router.get("/workout/:workoutId", (req, res, next) => {
  const { workoutId } = req.params;

  Workout.findById(workoutId)
    .then((workout) => res.status(200).json(workout))
    // for sending a response back to the client after the server has successfully
    // retrieved and processed the requested data.
    .catch((err) => res.json(err));
});


module.exports = router;

