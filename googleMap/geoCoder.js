const express = require("express");
const axios = require("axios");
const router = express.Router();
const NodeGeocoder = require('node-geocoder');

const apiKey = "AIzaSyBTqoXLNCSJV4jiZdF9MlC-7lZQAFuYGUU"; 

const geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: apiKey,
  });
  function performNearbySearch(location, radius, keyword) {
    const googleApiUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
      
    const params = {
      location: location,
      radius: radius,
      keyword: keyword,
      key: apiKey,
    };
  
    return axios
      .get(googleApiUrl, { params })
      .then((response) => {
        const places = response.data.results;
        return places;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  router.get("/challenge", (req, res) => {
    const address = 'Friedrichstraße 68 Eingang Mohrentrasse, 10117 Berlin';
  
    // Geocode the address
    geocoder.geocode(address, function (err, geoRes) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while geocoding the address." });
      }
  
      if (geoRes.length > 0) {
        const latitude = geoRes[0].latitude;
        const longitude = geoRes[0].longitude;
  
        // Perform nearby search using the geocoded coordinates
        const location = `${latitude},${longitude}`;
        const radius = 800;
        const keyword = "gym";
  
        performNearbySearch(location, radius, keyword)
          .then((places) => {
            res.json({ address, latitude, longitude, nearbyPlaces: places });
          })
          .catch((error) => {
            console.error("Error:", error);
            res.status(500).json({ error: "An error occurred while performing the nearby search." });
          });
      } else {
        console.log('No results found');
        res.status(404).json({ error: "No geocoding results found for the address." });
      }
    });
  });
  
  module.exports = router;
