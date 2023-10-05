const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Favorite = require("../models/Favorites.model"); 


router.post("/bookmarks",(req, res) => {
  const { name, uri, category } = req.body;

  const userId = req.payload._id;
  console.log("Booksmark POST Id", userId);

  const favorite = new Favorite({ name, uri, category, user: userId });

  favorite
    .save()
    .then(() => {
      return User.findByIdAndUpdate(
        userId,
        { $push: { favorites: favorite._id } },
        { new: true }
      );
    })
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((error) => {
      console.error("Error saving or updating user's bookmarks:", error);
      res.status(400).json({ error: error.message });
    });
});

router.get("/bookmarks", (req, res) => {
  const userId = req.payload._id;
  console.log("bookmark GET ID", userId);
  Favorite.find({ user: userId })
    .populate("user")
    .then((bookmarks) => {
      res.status(201).json(bookmarks);
    })
    .catch((error) => {
      console.error("Error fetching bookmarks:", error);
      res.status(400).json({ error: "Internal Server Error" });
    });
});

// ******************** GET: retreive each data **************

router.get("/bookmarks/:bookmarkId", (req, res, next) => {
  const { bookmarkId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(bookmarkId)) {
    return;
  }

  Favorite.findById(bookmarkId)
    .populate("user")
    .then((bookmark) => res.status(200).json(bookmark))

    .catch((err) => res.json(err));
});

// ******************** PUT: update each data **************

router.put("/bookmarks/:bookmarkId", (req, res) => {
  const { bookmarkId } = req.params;
  const updatedData = req.body;

  if (!mongoose.Types.ObjectId.isValid(bookmarkId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Favorite.findByIdAndUpdate(bookmarkId, updatedData, { new: true })
    .then((updatedResponse) => {
      if (!updatedResponse) {
        return res.status(404).json({ message: "Log response not found" });
      }
      res.status(200).json(updatedResponse);
    })
    .catch((error) => {
      console.error("Error updating log response:", error);
      res.status(400).json({ error: error.message });
    });
});

// ******************** DELETE: delete each data **************

router.delete("/bookmarks/:bookmarkId", (req, res, next) => {
  const { bookmarkId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookmarkId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Favorite.findByIdAndDelete(bookmarkId)
    .then(() =>
      res.json({
        message: `Activity with ${bookmarkId} is removed successfully.😎`,
      })
    )
    .catch((err) => res.json(err));
});

module.exports = router;
