// Example: Perform a text-based search for restaurants
// const query = "restaurant";
// const location = "latitude,longitude"; // Replace with the latitude and longitude of your desired location
// const radius = 5000; // Search radius in meters

// const googleApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_phone_number&key=${apiKey}`;

const express = require("express");
const axios = require("axios");
const router = express.Router();
const apiKey = "AIzaSyBTqoXLNCSJV4jiZdF9MlC-7lZQAFuYGUU"; 
const placeId = "ChIJP1NSCNFRqEcR1o38yvtl2_w"; // Little Green Rabbit


router.get("/challenge", (req, res) => {
  // Function to get place details by Place ID
  const getPlaceDetails = () => {
    const googleApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_phone_number&key=${apiKey}`;

    return axios
      .get(googleApiUrl)
      .then((response) => {
        // Handle the response data
        const place = response.data.result;
        return place;
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
        throw error;
      });
  };

  // Call the getPlaceDetails function to fetch place details
  getPlaceDetails()
    .then((place) => {
      res.json(place); // Send the place details as JSON response
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred while fetching place details." });
    });
});

module.exports = router;






// // Example: Perform a text-based search for restaurants
// // const query = "restaurant";
// // const location = "latitude,longitude"; // Replace with the latitude and longitude of your desired location
// // const radius = 5000; // Search radius in meters

// // const googleApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_phone_number&key=${apiKey}`;

//GEO CODER
// const express = require("express");
// const axios = require("axios");
// const router = express.Router();
// const NodeGeocoder = require('node-geocoder');

// const apiKey = "AIzaSyBTqoXLNCSJV4jiZdF9MlC-7lZQAFuYGUU"; 

// const geocoder = NodeGeocoder({
//     provider: 'google',
//     apiKey: apiKey,
//   });
//   function performNearbySearch(location, radius, keyword) {
//     const googleApiUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
      
//     const params = {
//       location: location,
//       radius: radius,
//       keyword: keyword,
//       key: apiKey,
//     };
  
//     return axios
//       .get(googleApiUrl, { params })
//       .then((response) => {
//         const places = response.data.results;
//         return places;
//       })
//       .catch((error) => {
//         console.error(error);
//         throw error;
//       });
//   }

//   router.get("/challenge", (req, res) => {
//     const address = 'Friedrichstraße 68 Eingang Mohrentrasse, 10117 Berlin';
  
//     // Geocode the address
//     geocoder.geocode(address, function (err, geoRes) {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: "An error occurred while geocoding the address." });
//       }
  
//       if (geoRes.length > 0) {
//         const latitude = geoRes[0].latitude;
//         const longitude = geoRes[0].longitude;
  
//         // Perform nearby search using the geocoded coordinates
//         const location = `${latitude},${longitude}`;
//         const radius = 800;
//         const keyword = "gym";
  
//         performNearbySearch(location, radius, keyword)
//           .then((places) => {
//             res.json({ address, latitude, longitude, nearbyPlaces: places });
//           })
//           .catch((error) => {
//             console.error("Error:", error);
//             res.status(500).json({ error: "An error occurred while performing the nearby search." });
//           });
//       } else {
//         console.log('No results found');
//         res.status(404).json({ error: "No geocoding results found for the address." });
//       }
//     });
//   });
  
//   module.exports = router;




// Places Search NearBy
//   const express = require("express");
// const axios = require("axios");
// const router = express.Router();
// const apiKey = "AIzaSyBTqoXLNCSJV4jiZdF9MlC-7lZQAFuYGUU"; 


// router.get("/challenge", (req, res) => {
//   // Function to get place details by Place ID
//   function performNearbySearch(location, radius, keyword) {
//     const googleApiUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
    
//     const params = {
//       location: location, // The latitude and longitude of the location (e.g., "latitude,longitude")
//       radius: radius,     // The search radius in meters
//       keyword: keyword,   // A keyword to search for (e.g., "restaurant")
//       key: apiKey,        // Your Google API key
//     };
  
//     return axios
//       .get(googleApiUrl, { params })
//       .then((response) => {
//         // Handle the response data
//         const places = response.data.results;
//         return places;
//       })
//       .catch((error) => {
//         // Handle errors
//         console.error(error);
//         throw error;
//       });
//   }
  
//   // Usage example
//   const location = "52.5126085,13.3905125"; // Replace with the actual latitude and longitude
//   const radius = 800; // Search radius in meters
//   const keyword = "gym"; // Keyword to search for
  
//   performNearbySearch(location, radius, keyword)
//     .then((places) => {
//       console.log("Nearby Places:", places);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// })


// module.exports = router;