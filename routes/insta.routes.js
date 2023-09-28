const axios = require("axios");
const router = require("express").Router();
// require('dotenv').config();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Activity = require("../models/Activity.model");
const Favorite = require("../models/Favorite.model");
const Instagram = require("instagram-scraper-api")

router.get("/insta-post", (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://instagram130.p.rapidapi.com/account-feed',
    params: {username: 'lululemon'},
    headers: {
      'X-RapidAPI-Key': '2b90b0f361msh8b43d50ec02dbcep1952bdjsn487cd58b3f12',
      'X-RapidAPI-Host': 'instagram130.p.rapidapi.com'
    }
  };

  axios
    .request(options)
    .then((response) => {
      console.log("Instagram response", response);
      res.status(201).json(response.data);
    })
    .catch((err) => {
      res.status(400).json({ message: "can't get instagram posts!" });
    });
});



// router.get("/insta-post", (req, res, next) => {
//   const options = {
//     method: "GET",
//     url: "https://instagram-scraper-2022.p.rapidapi.com/ig/posts/",
//     params: {
//       id_user: "528817151",
//     },
//     headers: {
//       "X-RapidAPI-Key": "2b90b0f361msh8b43d50ec02dbcep1952bdjsn487cd58b3f12",
//       "X-RapidAPI-Host": "instagram-scraper-2022.p.rapidapi.com",
//     },
//   };

//   axios
//     .request(options)
//     .then((response) => {
//       console.log("Instagram response", response);
//       res.status(201).json(response.data);
//     })
//     .catch((err) => {
//       res.status(400).json({ message: "can't get instagram posts!" });
//     });
// });

module.exports = router;