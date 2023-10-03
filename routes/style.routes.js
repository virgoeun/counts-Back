const express = require("express");
const router = express.Router();


router.get("/style", (req, res, next) => {

  res.json("style route is working just fine! 🥰!");
});

module.exports = router;