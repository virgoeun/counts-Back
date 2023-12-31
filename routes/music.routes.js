const axios = require("axios");
const router = require("express").Router();

// *********** GET // Get Spotify Playlist! **********

router.get("/music", (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://spotify23.p.rapidapi.com/search/',
    params: {q: 'fitness',
    type: 'playlist',
    offset: '0',
    limit: '10',
    numberOfTopResults: '4'},
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

module.exports = router;