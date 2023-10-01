const axios = require("axios");
const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Activity = require("../models/Activity.model");
const Favorite = require("../models/Favorite.model");
const fileUploader = require("../config/cloudinary.config");



router.get("/video", (req, res, next) => {
  const options = {
    method: 'POST',
    url: 'https://youtube-scraper-2023.p.rapidapi.com/playlist_videos',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '2b90b0f361msh8b43d50ec02dbcep1952bdjsn487cd58b3f12',
        'X-RapidAPI-Host': 'youtube-scraper-2023.p.rapidapi.com'
      },
      data: {
        playlistId: 'PLLQHhQnYADNkQ2FYEYBMSl-g3T0xLeas8',
        nextToken: ''
      }
  };

  axios
    .request(options)
    .then((response) => {
      console.log("DATA API response", response);
      res.status(201).json(response.data);
    })
    .catch((err) => {
      res.status(400).json({ message: "can't get DATA" });
    });
});


   

module.exports = router;