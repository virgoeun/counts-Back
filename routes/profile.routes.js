const router = require("express").Router();

const mongoose = require("mongoose");

const User = require("../models/User.model");
const Activity = require("../models/Activity.model");

// TESTING FOR thunder
// router.get("/abc", (req, res) => {
//   res.json("it's working");
// });

router.post("/profile", (req, res) => {
  const { userId, sports, sleep, water, stress } = req.body;

  // Create a new Activity document based on the request data
  const newActivity = new Activity({
    user: userId,
    sports,
    sleep,
    water,
    stress,
  });

  newActivity
    .save()
    .then((savedActivity) => {
      return User.findByIdAndUpdate(
        userId,
        {
          $push: { userData: savedActivity._id },
        },
        { new: true }
      );
    })
    .then((updatedUser) => {
      // Respond with the updated user document
      res.status(201).json(updatedUser);
    })
    .catch((error) => {
      console.error(error); // Log the detailed error message
      res.status(400).json({ error: error.message });
    });
});

router.post("/profile/:dataId", (req, res, next) => {
  const { dataId } = req.params;
  const { sports } = req.body;

  if (!mongoose.Types.ObjectId.isValid(dataId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Activity.findByIdAndUpdate(
    dataId,
    {
      // sleep,
      // water,
      // stress,
      $push: { sports: sports }, //updating 3 but sports pushing (add)
    },
    { new: true }
  )

    .then((updatedActivity) => res.json(updatedActivity))
    .catch((error) => res.json(error));
});


//GET all activities // Calendar
router.get("/profile", (req, res, next) => {
  Activity.find()
    .populate("user")
    .then((allActivity) => {
      console.log("AllActivities", allActivity);
      res.json(allActivity);
    })
    .catch((err) => res.json(err));
});

// ***********************************************************
// ******************** GET: retreive each data **************

router.get("/profile/:dataId", (req, res, next) => {
  const { dataId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(dataId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Activity.findById(dataId)
    .populate("user")
    .then((activity) => res.status(200).json(activity))
    // for sending a response back to the client after the server has successfully
    // retrieved and processed the requested data.
    .catch((err) => res.json(err));
});

// ***********************************************************
// ******************** PUT: update each data **************

router.put("/profile/:dataId", (req, res, next) => {
  const { dataId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(dataId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Activity.findByIdAndUpdate(dataId, req.body, { new: true })
    .then((updatedActivity) => res.json(updatedActivity))
    .catch((error) => res.json(error));
});


// PUT route to edit the 'isCompleted' property of a sports activity
router.put("/profile/:activityId/sports/:sportsId", async (req, res, next) => {
  const { activityId, sportsId } = req.params;
  const { isCompleted } = req.body;

  try {
    // Validate if 'activityId' is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(activityId)) {
      return res.status(400).json({ message: "Invalid Activity ID format" });
    }

    // Update the 'isCompleted' property using the positional operator '$'
    const updatedActivity = await Activity.findOneAndUpdate(
      {
        _id: activityId,
        "sports._id": sportsId,
      },
      {
        $set: { "sports.$.isCompleted": isCompleted },
      },
      { new: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: "Activity or Sports Activity not found" });
    }

    res.status(200).json(updatedActivity);
  } catch (error) {
    console.error("Error updating sports activity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;



// router.put("/profile/:dataId/:sportsId", (req, res, next) => {
//   const { dataId, sportsId } = req.params;

//   console.log("Received dataId:", dataId);
//   console.log("Received sportsId:", sportsId);

//   if (!mongoose.Types.ObjectId.isValid(dataId)) {
//     res.status(400).json({ message: "Specified id is not valid" });
//     return;
//   }

//   const { isCompleted } = req.body;

//   Activity.findByIdAndUpdate(dataId)
//     .then((resp) => {
//       console.log("Found Activity:", resp);
//       //const id = new mongoose.Types.ObjectId(sportsId);
//       //console.log("id?",id)
//       const foundSport = resp.sports.filter((e) => e._id.toString() === sportsId);
//       console.log("Found Sport:", foundSport);
//       console.log("sportID", sportsId)
//       //res.send({ foundSport });

//       if (!foundSport) {
//         res.status(404).json({ message: "Sport not found" })
        
//         return;
//       }

//       // Update the isCompleted property of the sport
//       foundSport.isCompleted = isCompleted;


//       // Save the updated activity
//     return foundSport.save();
//     })
//     .then((updatedActivity) => {
//       // Respond with the updated activity
//       res.status(200).json(updatedActivity);
//     })
//     .catch((error) => {
//       console.error("Error updating sport:", error);
//       res.status(500).json({ message: "Internal server error" });
//     });
// });

// ***********************************************************
// ******************** DELETE: delete each data **************

router.delete("/profile/:dataId", (req, res, next) => {
  const { dataId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(dataId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Activity.findByIdAndDelete(dataId)
    .then(() =>
      res.json({
        message: `Activity with ${dataId} is removed successfully.😎`,
      })
    )
    .catch((err) => res.json(err));
});

module.exports = router;
