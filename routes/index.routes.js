const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    console.log("Let's go!")
  res.json("Let's Go!");
});

module.exports = router;
