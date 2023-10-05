const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Activity = require("../models/Activity.model");

router.post("/checkin", (req, res) => {

  const { date, sports, sleep, water, stress, note } = req.body;
  console.log("CHECKIN Backend Req.body", req.body);

  const userId = req.payload._id

  const newActivity = new Activity({
    user: userId,
    date,
    sports,
    sleep,
    water,
    stress,
    note
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
      
      res.status(201).json(updatedUser);
    })
    .catch((error) => {
      console.error(error); 
      res.status(400).json({ error: error.message });
    });
});




//GET all activities // Calendar
router.get("/checkin", (req, res, next) => {
const userId = req.payload._id; //current logged-in user's logs will get retrieved!
console.log("checkin GET id", userId)
//Activity.find({ user: userId })

  Activity.find({ user: userId })
    .populate("user")
    .then((userActivities) => {
      console.log("userActivities", userActivities); 
      res.status(201).json(userActivities);
    })
    .catch((err) => res.json(err));
});


// ******************** GET: retreive each data **************

router.get("/checkin/:activityid", (req, res, next) => {
  const { activityid } = req.params;
  if (!mongoose.Types.ObjectId.isValid(activityid)) {
    return;
  }

  Activity.findById(activityid)
    .populate("user")
    .then((activity) => res.status(200).json(activity))
    // for sending a response back to the client after the server has successfully
    // retrieved and processed the requested data.
    .catch((err) => res.json(err));
});


// ******************** PUT: update each data **************

router.put("/checkin/:activityid", (req, res) => {
  const { activityid } = req.params; // Get the ID from request parameters
  const updatedData = req.body; // Get updated data from the request body

  if (!mongoose.Types.ObjectId.isValid(activityid)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Activity.findByIdAndUpdate(activityid, updatedData, { new: true })
    .then((updatedResponse) => {
      if (!updatedResponse) {
        return res.status(404).json({ message: "Log response not found" });
      }
      res.status(200).json(updatedResponse);
    })
    .catch((error) => {
      console.error("Error updating log response:", error);
      res.status(400).json({ error: error.message });
    });
});


// ******************** DELETE: delete each data **************

router.delete("/checkin/:activityid", (req, res, next) => {
  const { activityid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(activityid)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Activity.findByIdAndDelete(activityid)
    .then(() =>
      res.json({
        message: `Activity with ${activityid} is removed successfully.😎`,
      })
    )
    .catch((err) => res.json(err));
});

module.exports = router;
