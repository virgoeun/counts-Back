const axios = require("axios");
const router = require("express").Router();
const spotifyApi = require("../config/spotify.config");
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Activity = require("../models/Activity.model");
const Favorite = require("../models/Favorite.model");
// const Instagram = require("instagram-scraper-api")
const { isAuthenticated } = require("../middleware/jwt.middleware.js");


// *********** GET // Get IG Post! **********

// router.get("/inspiration", (req, res, next) => {
//   const options = {
//     method: 'GET',
//     url: 'https://instagram130.p.rapidapi.com/account-feed',
//     params: {username: 'lululemon'},
//     headers: {
//       'X-RapidAPI-Key': '2b90b0f361msh8b43d50ec02dbcep1952bdjsn487cd58b3f12',
//       'X-RapidAPI-Host': 'instagram130.p.rapidapi.com'
//     }
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


router.get("/inspiration", (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://spotify23.p.rapidapi.com/search/',
    params: {q: 'workout',
    type: 'playlist',
    offset: '0',
    limit: '10',
    numberOfTopResults: '5'},
    headers: {
      'X-RapidAPI-Key': '2b90b0f361msh8b43d50ec02dbcep1952bdjsn487cd58b3f12',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };

  axios
    .request(options)
    .then((response) => {
      console.log("Instagram API response", response);
      res.status(201).json(response.data);
    })
    .catch((err) => {
      res.status(400).json({ message: "can't get Spotify lists!" });
    });
});





// *********** GET // Get Spotify Playlist! **********
// router.get("/counts-playlist", (req, res, next) => {
//     spotifyApi
//       .getPlaylist("37i9dQZF1DXdxcBWuJkbcy")
//       .then((data) => {
//         console.log("Counts' recommended playlist is", data.body);
//         res.status(201).json(data.body);
//       })
//       .catch((err) => {
//         res.status(400).json({ message: "Something went wrong with getting a playlist!" });
//         console.log("Something went wrong with getting a playlist!", err);
//       });
//   });

// router.get("/workout-playlist", (req, res, next) => {
//     spotifyApi
//       .searchPlaylists("workout", { limit : 5 })
//       .then((data) => {
//         console.log("Found playlists are", data.body);
//         res.status(201).json(data.body);
//       })
//       .catch((err) => {
//         res.status(400).json({ message: "Something went wrong with getting a playlist!" });
//         console.log("Something went wrong with getting a playlist!", err);
//       });
//   });


module.exports = router;
