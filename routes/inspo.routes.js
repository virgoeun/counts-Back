

//*********** Youtube **********

// router.get("/inspiration/youtube", (req, res, next) => {
//   const options = {
//     method: 'POST',
//     url: 'https://youtube-scraper-2023.p.rapidapi.com/playlist_videos',
//       headers: {
//         'content-type': 'application/json',
//         'X-RapidAPI-Key': '2b90b0f361msh8b43d50ec02dbcep1952bdjsn487cd58b3f12',
//         'X-RapidAPI-Host': 'youtube-scraper-2023.p.rapidapi.com'
//       },
//       data: {
//         playlistId: 'PLLQHhQnYADNkQ2FYEYBMSl-g3T0xLeas8',
//         nextToken: ''
//       }
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

//recipes
// router.get("/inspiration", (req, res, next) => {
//     const options = {
//       method: 'GET',
//       url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
//       params: {
//         query: 'pasta',
//         cuisine: 'italian',
//         excludeCuisine: 'greek',
//         diet: 'vegetarian',
//         intolerances: 'gluten',
//         equipment: 'pan',
//         includeIngredients: 'tomato,cheese',
//         excludeIngredients: 'eggs',
//         type: 'main course',
//         instructionsRequired: 'true',
//         fillIngredients: 'false',
//         addRecipeInformation: 'false',
//         titleMatch: 'Crock Pot',
//         maxReadyTime: '20',
//         ignorePantry: 'true',
//         sort: 'calories',
//         sortDirection: 'asc',
//         minCarbs: '10',
//         maxCarbs: '100',
//         minProtein: '10',
//         maxProtein: '100',
//         minCalories: '50',
//         maxCalories: '800',
//         minFat: '10',
//         maxFat: '100',
//         minAlcohol: '0',
//         maxAlcohol: '100',
//         minCaffeine: '0',
//         maxCaffeine: '100',
//         minCopper: '0',
//         maxCopper: '100',
//         minCalcium: '0',
//         maxCalcium: '100',
//         minCholine: '0',
//         maxCholine: '100',
//         minCholesterol: '0',
//         maxCholesterol: '100',
//         minFluoride: '0',
//         maxFluoride: '100',
//         minSaturatedFat: '0',
//         maxSaturatedFat: '100',
//         minVitaminA: '0',
//         maxVitaminA: '100',
//         minVitaminC: '0',
//         maxVitaminC: '100',
//         minVitaminD: '0',
//         maxVitaminD: '100',
//         minVitaminE: '0',
//         maxVitaminE: '100',
//         minVitaminK: '0',
//         maxVitaminK: '100',
//         minVitaminB1: '0',
//         maxVitaminB1: '100',
//         minVitaminB2: '0',
//         maxVitaminB2: '100',
//         minVitaminB5: '0',
//         maxVitaminB5: '100',
//         minVitaminB3: '0',
//         maxVitaminB3: '100',
//         minVitaminB6: '0',
//         maxVitaminB6: '100',
//         minVitaminB12: '0',
//         maxVitaminB12: '100',
//         minFiber: '0',
//         maxFiber: '100',
//         minFolate: '0',
//         maxFolate: '100',
//         minFolicAcid: '0',
//         maxFolicAcid: '100',
//         minIodine: '0',
//         maxIodine: '100',
//         minIron: '0',
//         maxIron: '100',
//         minMagnesium: '0',
//         maxMagnesium: '100',
//         minManganese: '0',
//         maxManganese: '100',
//         minPhosphorus: '0',
//         maxPhosphorus: '100',
//         minPotassium: '0',
//         maxPotassium: '100',
//         minSelenium: '0',
//         maxSelenium: '100',
//         minSodium: '0',
//         maxSodium: '100',
//         minSugar: '0',
//         maxSugar: '100',
//         minZinc: '0',
//         maxZinc: '100',
//         offset: '0',
//         number: '10',
//         limitLicense: 'false',
//         ranking: '2'
//       },
//         headers: {
//             'X-RapidAPI-Key': '2b90b0f361msh8b43d50ec02dbcep1952bdjsn487cd58b3f12',
//             'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
//         }
//     };

//     axios
//       .request(options)
//       .then((response) => {
//         console.log("DATA API response", response);
//         res.status(201).json(response.data);
//       })
//       .catch((err) => {
//         res.status(400).json({ message: "can't get DATA" });
//       });
//   });

// Define a dynamic route for inspiration with a data source parameter
// router.get("/inspiration/:dataSource", (req, res, next) => {
//   const dataSource = req.params.dataSource;

//   // Define API endpoints and headers for each data source
//   let apiUrl, apiHeaders, requestData;

//   switch (dataSource) {
//     case "youtube":
//       apiUrl = "https://youtube-scraper-2023.p.rapidapi.com/playlist_videos";
//       apiHeaders = {
//         "Content-Type": "application/json",
//         "X-RapidAPI-Key": "2b90b0f361msh8b43d50ec02dbcep1952bdjsn487cd58b3f12",
//         "X-RapidAPI-Host": "youtube-scraper-2023.p.rapidapi.com",
//       };
//       requestData = {
//         playlistId: "PLLQHhQnYADNkQ2FYEYBMSl-g3T0xLeas8",
//         nextToken: "",
//       };
//       break;
//     case "spotify":
//       apiUrl = "https://spotify23.p.rapidapi.com/search/";
//       apiHeaders = {
//         "X-RapidAPI-Key": "2b90b0f361msh8b43d50ec02dbcep1952bdjsn487cd58b3f12",
//         "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
//       };
//       requestData = {
//         q: "workout",
//         type: "playlist",
//         offset: "0",
//         limit: "10",
//         numberOfTopResults: "5",
//       };
//       break;
//     case "recipes":
//       apiUrl = "https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition";
//       apiHeaders = {
//         "X-RapidAPI-Key": "2b90b0f361msh8b43d50ec02dbcep1952bdjsn487cd58b3f12",
//         "X-RapidAPI-Host": "nutrition-by-api-ninjas.p.rapidapi.com",
//       };
//       requestData = {
//         query: "healthy",
//       };
//       break;
//     default:
//       res.status(404).json({ message: "Data source not found" });
//       return;
//   }

//   // Make a request to the specified API
//   axios
//     .request({
//       method: "GET", // You can specify the HTTP method (GET, POST, etc.) here
//       url: apiUrl,
//       headers: apiHeaders,
//       params: requestData, // Include the request data as params
//     })
//     .then((response) => {
//       // Process the API response here
//       res.status(200).json(response.data);
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//       res.status(500).json({ message: "Internal server error" });
//     });
// });

module.exports = router;
