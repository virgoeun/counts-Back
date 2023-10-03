const express = require("express");
const router = express.Router();


router.get("/workout", (req, res, next) => {

  res.json("Workout route is working just fine! 🥰!");
});

module.exports = router;