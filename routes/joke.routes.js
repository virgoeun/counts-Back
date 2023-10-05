const express = require("express");
const router = express.Router();


router.get("/joke", (req, res, next) => {
    console.log("Let's go!")
  res.json("Alice wanted to add e-commerce function but gotta sleep... !");
});

module.exports = router;
