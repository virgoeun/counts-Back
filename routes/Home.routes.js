const express = require("express");
const router = express.Router();


router.get("/", (req, res, next) => {
    console.log("Let's go!")
  res.json("HOME!!");
});

module.exports = router;
