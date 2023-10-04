const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout.model"); 
const User = require("../models/User.model")

// router.get("/workout", (req, res, next) => {
//     console.log("Let's go!")
//   res.json("Alice is working OUT?! ....😂!");
// });

router.get("/workout/:workoutId/liked", (req, res) => {
  const { workoutId } = req.params;
  const userId = req.payload._id; // Assuming you have user authentication middleware

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




// Route to like a workout : WORKS! 
// router.post("/workout/:workoutId/liked", async (req, res) => {
//   try {
//     const { workoutId } = req.params;
//     const userId = req.payload._id; // Assuming you have user authentication middleware

//     const workout = await Workout.findById(workoutId).exec();
//     if (!workout) {
//       return res.status(404).json({ message: "Workout not found" });
//     }

//     if (!workout.likes.includes(userId)) {
//       workout.likes.push(userId);
//       await workout.save();
//     }

//     res.json({ message: "Workout liked" });
//   } catch (error) {
//     console.error("Error liking workout:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// Route to unlike a workout:works
// router.delete("/workout/:workoutId/liked", async (req, res) => {
//   try {
//     const { workoutId } = req.params;
//     const userId = req.payload._id; // Assuming you have user authentication middleware

//     const workout = await Workout.findById(workoutId).exec();
//     if (!workout) {
//       return res.status(404).json({ message: "Workout not found" });
//     }

//     const userIndex = workout.likes.indexOf(userId);
//     if (userIndex !== -1) {
//       workout.likes.splice(userIndex, 1);
//       await workout.save();
//     }

//     res.json({ message: "Workout unliked" });
//   } catch (error) {
//     console.error("Error unliking workout:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });



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




//WORKS
// router.get("/workout", (req, res) => {
//   Workout.find()
//     .then((workouts) => {
//       const workoutsWithLikeCount = workouts.map((workout) => ({
//         ...workout.toObject(),
//         likeCount: workout.likes.length,//userIds length
//       }));
//       res.json(workoutsWithLikeCount);
//       console.log("Workoutwithcounts", workoutsWithLikeCount)
//     })
//     .catch((error) => {
//       console.error("Error fetching workout data:", error);
//       res.status(500).json({ message: "Internal server error" });
//     });
// });
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


module.exports = router;

