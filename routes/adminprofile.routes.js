const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.get("/admin-profile", (req, res) => {
  const userId = req.payload._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    })
    .catch((error) => {
      console.error("Error fetching admin profile:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
