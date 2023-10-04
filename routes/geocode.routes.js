const express = require("express");
const axios = require("axios");
const router = express.Router();
const apiKey = "AIzaSyBTqoXLNCSJV4jiZdF9MlC-7lZQAFuYGUU";

function performGeocode(address) {
    const googleApiUrl = "https://maps.googleapis.com/maps/api/geocode/json";
  
    const params = {
      address: address,
      key: apiKey,
    };
  
    return axios
      .get(googleApiUrl, { params })
      .then((response) => {
        const results = response.data.results;
        if (results.length > 0) {
          const location = results[0].geometry.location;
          return {
            latitude: location.lat,
            longitude: location.lng,
          };
        } else {
          throw new Error("No results found");
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
  
  router.get("/geocode", (req, res) => {
    const { address } = req.query; // Get the address from the query parameters
  
    if (!address) {
      return res.status(400).json({ error: "Address parameter is missing." });
    }
  
    // Perform geocoding using the provided address
    performGeocode(address)
      .then((geocodeResult) => {
        res.json(geocodeResult);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while geocoding the address." });
      });
  });
  
  module.exports = router;