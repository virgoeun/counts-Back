const express = require("express");
const router = express.Router();


router.get("/", (req, res, next) => {
    console.log("Let's go!")
  res.json("Video Route is DA!");
});

module.exports = router;