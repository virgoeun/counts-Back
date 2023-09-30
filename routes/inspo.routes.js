const axios = require("axios");
const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Activity = require("../models/Activity.model");
const Favorite = require("../models/Favorite.model");


// *********** GET // Get Spotify Playlist! **********

// router.get("/inspiration", (req, res, next) => {
//   const options = {
//     method: 'GET',
//     url: 'https://spotify23.p.rapidapi.com/search/',
//     params: {q: 'workout',
//     type: 'playlist',
//     offset: '0',
//     limit: '10',
//     numberOfTopResults: '5'},
//     headers: {
//       'X-RapidAPI-Key': '2b90b0f361msh8b43d50ec02dbcep1952bdjsn487cd58b3f12',
//       'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
//     }
//   };

//   axios
//     .request(options)
//     .then((response) => {
//       console.log("Instagram API response", response);
//       res.status(201).json(response.data);
//     })
//     .catch((err) => {
//       res.status(400).json({ message: "can't get Spotify lists!" });
//     });
// });


// *********** Opengraph **********

// router.get("/inspiration", (req, res, next) => {
//   const options = {
//     method: 'GET',
//     url: 'https://opengraph-io.p.rapidapi.com/api/1.1/sites',
//     params: {  url: 'https://www.pinterest.de/search/pins/?q=workout&rs=typed',
//     accept_lang: 'en-US,en;q=0.9',
//     full_render: 'false',
//     cache_ok: 'false',
//     max_cache_age: '432000000'},
//     headers: {
//       'X-RapidAPI-Key': '2b90b0f361msh8b43d50ec02dbcep1952bdjsn487cd58b3f12',
//       'X-RapidAPI-Host': 'opengraph-io.p.rapidapi.com'
//     }
//   };

//   axios
//     .request(options)
//     .then((response) => {
//       console.log("DATA API response", response);
//       res.status(201).json(response.data);
//     })
//     .catch((err) => {
//       res.status(400).json({ message: "can't get DATA" });
//     });
// });



module.exports = router;
