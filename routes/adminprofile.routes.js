const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/admin.middleware");
const User = require("../models/User.model");

// Define a route to get the admin's profile data
router.get("/admin-profile", adminMiddleware, (req, res) => {
  const userId = req.payload._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return admin user data as a response
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error("Error fetching admin profile:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
