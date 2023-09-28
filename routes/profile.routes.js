const router = require("express").Router();

const mongoose = require("mongoose");

const User = require("../models/User.model");
const Activity = require("../models/Activity.model");

// TESTING FOR thunder
// router.get("/abc", (req, res) => {
//   res.json("it's working");
// });

//POST: Create a new data
// router.post("/profile", (req, res, next) => {
//   const { sports, sleep, water, stress, user } = req.body;
//   console.log(sports, sleep, water, stress);

//   Activity.create({ sports, sleep, water, stress })
//     .then((response) => {
//       res.json(response);
//       console.log(response);
//     })
//     .catch((err) => res.json(err));
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

  // Save the new Activity document to the database & push to the User
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

//GET all activities
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

// ***********************************************************
// ******************** DELETE: delete each data **************

router.delete("/profile/:dataId", (req, res, next) => {

    const {dataId}=req.params;

  if (!mongoose.Types.ObjectId.isValid(dataId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Activity.findByIdAndDelete(dataId)
  .then(()=> res.json({message:`Activity with ${dataId} is removed successfully.😎`}))
  .catch((err)=> res.json(err));
});

module.exports = router;