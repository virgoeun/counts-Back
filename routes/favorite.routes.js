// const axios = require("axios");
const router = require("express").Router();
// const spotifyApi = require("../config/spotify.config");
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Activity = require("../models/Activity.model");
const Favorite = require("../models/Favorite.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
// const Instagram = require("instagram-scraper-api")

// Create a new favorite
// router.post("/favorite", (req, res, next) => {
//   const newFavorite = new Favorite(req.body);

//   newFavorite
//     .save()
//     .then((savedFavorite) => {
//       res.json(avedFavorite); // Send the saved bookmark as a response
//     })
//     .catch((error) => {
//       res.status(500).json({ error: "Error creating favorites!😭" });
//     });
// });

// Example using axios to post a new collection
router.post("/favorite", (req, res, next) => {
  const { userId, bookmarks } = req.body;

  const newFavorite = new Favorite({
    user: userId,
    bookmarks,
  });

  //   bookmarks: [
  //     {
  //       category: req.body.category,
  //       title: req.body.title,
  //       url: req.body.url,
  //       description: req.body.description,}]

  newFavorite
    .save()
    .then((savedFavorite) => {
      return User.findByIdAndUpdate(
        userId,
        { $push: { favorites: savedFavorite._id } },
        { new: true }
      );
    })
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error: error.message });
    });
});

//get all faves
router.get("/favorite", (req, res, next) => {
  Favorite.find()
    .populate("user")
    .then((allFaves) => {
      console.log("allFaves", allFaves);
      res.status(200).json(allFaves);
    })
    .catch((err) => res.json(err));
});

//Get one fav (per Id)
router.get("/favorite/:favId", (req, res, next) => {
    const{favId}=req.params;
    if (!mongoose.Types.ObjectId.isValid(favId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
      }
    
    Favorite.findById(favId)
      .populate("user")
      .then((fave) => {
        console.log("oneFave", fave);
        res.status(200).json(fave);
      })
      .catch((err) => res.json(err));
  });

  //Edit a Fav
  router.put("/favorite/:favId", (req, res, next) => {
    const { favId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(favId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Favorite.findByIdAndUpdate(favId, req.body, { new: true })
      .then((updatedFav) => res.json(updatedFav))
      .catch((error) => res.json(error));
  });


//Delete a Fav
  router.delete("/favorite/:favId", (req, res, next) => {
    const { favId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(favId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Favorite.findByIdAndDelete(favId)
      .then(() =>
        res.json({
          message: `Activity with ${favId} is removed successfully.😎`,
        })
      )
      .catch((err) => res.json(err));
  });

module.exports = router;
