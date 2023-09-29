// const router = require("express").Router();
// // require('dotenv').config();
// const mongoose = require("mongoose");

// const User = require("../models/User.model");
// const Activity = require("../models/Activity.model");
// const Favorite = require("../models/Favorite.model");

// const spotifyApi = require("../config/spotify.config");



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
//   spotifyApi
//     .searchPlaylists("workout", { limit : 5 })
//     .then((data) => {
//       console.log("Found playlists are", data.body);
//       res.status(201).json(data.body);
//     })
//     .catch((err) => {
//       res.status(400).json({ message: "Something went wrong with getting a playlist!" });
//       console.log("Something went wrong with getting a playlist!", err);
//     });
// });

// router.get("/love-playlist", (req, res, next) => {
//     spotifyApi
//       .searchPlaylists("love", { limit : 5 })
//       .then((data) => {
//         console.log("Found playlists are", data.body);
//         res.status(201).json(data.body);
//       })
//       .catch((err) => {
//         res.status(400).json({ message: "Something went wrong with getting a playlist!" });
//         console.log("Something went wrong with getting a playlist!", err);
//       });
//   });

//   router.get("/yoga-playlist", (req, res, next) => {
//     spotifyApi
//       .searchPlaylists("yoga", { limit : 5 })
//       .then((data) => {
//         console.log("Found playlists are", data.body);
//         res.status(201).json(data.body);
//       })
//       .catch((err) => {
//         res.status(400).json({ message: "Something went wrong with getting a playlist!" });
//         console.log("Something went wrong with getting a playlist!", err);
//       });
//   });

//   router.get("/dance-playlist", (req, res, next) => {
//     spotifyApi
//       .searchPlaylists("dance", { limit : 5 })
//       .then((data) => {
//         console.log("Found playlists are", data.body);
//         res.status(201).json(data.body);
//       })
//       .catch((err) => {
//         res.status(400).json({ message: "Something went wrong with getting a playlist!" });
//         console.log("Something went wrong with getting a playlist!", err);
//       });
//   });
  

//   router.get("/run-playlist", (req, res, next) => {
//     spotifyApi
//       .searchPlaylists("run", { limit : 5 })
//       .then((data) => {
//         console.log("Found playlists are", data.body);
//         res.status(201).json(data.body);
//       })
//       .catch((err) => {
//         res.status(400).json({ message: "Something went wrong with getting a playlist!" });
//         console.log("Something went wrong with getting a playlist!", err);
//       });
//   });

//   router.get("/walk-playlist", (req, res, next) => {
//     spotifyApi
//       .searchPlaylists("walk", { limit : 5 })
//       .then((data) => {
//         console.log("Found playlists are", data.body);
//         res.status(201).json(data.body);
//       })
//       .catch((err) => {
//         res.status(400).json({ message: "Something went wrong with getting a playlist!" });
//         console.log("Something went wrong with getting a playlist!", err);
//       });
//   });


//   router.get("/morning-playlist", (req, res, next) => {
//     spotifyApi
//       .searchPlaylists("morning", { limit : 5 })
//       .then((data) => {
//         console.log("Found playlists are", data.body);
//         res.status(201).json(data.body);
//       })
//       .catch((err) => {
//         res.status(400).json({ message: "Something went wrong with getting a playlist!" });
//         console.log("Something went wrong with getting a playlist!", err);
//       });
//   });


//   router.get("/sunny-playlist", (req, res, next) => {
//     spotifyApi
//       .searchPlaylists("sunny", { limit : 5 })
//       .then((data) => {
//         console.log("Found playlists are", data.body);
//         res.status(201).json(data.body);
//       })
//       .catch((err) => {
//         res.status(400).json({ message: "Something went wrong with getting a playlist!" });
//         console.log("Something went wrong with getting a playlist!", err);
//       });
//   });


// module.exports = router;
