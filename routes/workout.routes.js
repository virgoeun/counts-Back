const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout.model"); 

// router.get("/workout", (req, res, next) => {
//     console.log("Let's go!")
//   res.json("Alice is working OUT?! ....😂!");
// });

router.get("/workout/:workoutId/liked", async (req, res) => {
  try {
    const { workoutId } = req.params;
    const userId = req.payload._id; // Assuming you have user authentication middleware

    const workout = await Workout.findById(workoutId).exec();
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    const liked = workout.likes.includes(userId);
    res.json({ liked });
  } catch (error) {
    console.error("Error fetching like status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to like a workout
router.post("/workout/:workoutId/liked", async (req, res) => {
  try {
    const { workoutId } = req.params;
    const userId = req.payload._id; // Assuming you have user authentication middleware

    const workout = await Workout.findById(workoutId).exec();
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    if (!workout.likes.includes(userId)) {
      workout.likes.push(userId);
      await workout.save();
    }

    res.json({ message: "Workout liked" });
  } catch (error) {
    console.error("Error liking workout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to unlike a workout
router.delete("/workout/:workoutId/liked", async (req, res) => {
  try {
    const { workoutId } = req.params;
    const userId = req.payload._id; // Assuming you have user authentication middleware

    const workout = await Workout.findById(workoutId).exec();
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    const userIndex = workout.likes.indexOf(userId);
    if (userIndex !== -1) {
      workout.likes.splice(userIndex, 1);
      await workout.save();
    }

    res.json({ message: "Workout unliked" });
  } catch (error) {
    console.error("Error unliking workout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;

