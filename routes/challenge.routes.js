const express = require("express");
const axios = require("axios");
const router = express.Router();
const apiKey = process.env.GOOGLE_API_KEY;
const placeId = process.env.GOOGLE_PLACE_ID; ; // Little Green Rabbit

router.get("/challenge", (req, res) => {
  // Function to get place details by Place ID
  const getPlaceDetails = () => {
    const googleApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_phone_number&key=${apiKey}`;

    return axios
      .get(googleApiUrl)
      .then((response) => {
        const place = response.data.result;
        return place;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  getPlaceDetails()
    .then((place) => {
      res.json(place);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "An error occurred while fetching place details." });
    });
});

module.exports = router;
