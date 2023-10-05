const express = require("express");
const router = express.Router();
const Style = require("../models/Style.model");
const User = require("../models/User.model")

router.get("/style/:styleId/liked", (req, res) => {
  const { styleId } = req.params;
  const userId = req.payload._id; // Assuming you have user authentication middleware

  Style.findById(styleId)
    .exec()
    .then((style) => {
      if (!style) {
        res.status(404).json({ message: "Style not found" });
      } else {
        const liked = style.likes.includes(userId);
        res.json({ liked });
      }
    })
    .catch((error) => {
      console.error("Error fetching like status:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.post("/style/:styleId/liked", (req, res) => {
  const { styleId } = req.params;
  const userId = req.payload._id; // Assuming you have user authentication middleware

  Style.findById(styleId)
    .exec()
    .then((style) => {
      if (!style) {
        return res.status(404).json({ message: "Style not found" });
      }

      if (!style.likes.includes(userId)) {
        style.likes.push(userId);
        return style.save();
      }
    })
    .then(() => {
      // Update the user's likes to include the liked workout
      return User.findByIdAndUpdate(
        userId,
        { $push: { "likes.styles": styleId } },
        { new: true }
      );
    })
    .then(() => {
      res.json({ message: "Style liked" });
    })
    .catch((error) => {
      console.error("Error liking style:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.delete("/style/:styleId/liked", (req, res) => {
  const { styleId } = req.params;
  const userId = req.payload._id; 

  Style.findById(styleId)
    .exec()
    .then((style) => {
      if (!style) {
        return res.status(404).json({ message: "Style not found" });
      }

      const userIndex = style.likes.indexOf(userId);

      if (userIndex !== -1) {
        style.likes.splice(userIndex, 1);
        return style.save();
      }

      return Promise.resolve();
    })
    .then(() => {
      return User.findByIdAndUpdate(
        userId,
        { $pull: { "likes.styles": styleId } },
        { new: true }
      );
    })
    .then(() => {
      res.json({ message: "Style unliked" });
    })
    .catch((error) => {
      console.error("Error unliking style:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/style", (req, res) => {
  Style.find()
  .populate('likes', 'username') 
    .then((styles) => {
      const stylesWithLikeCount = styles.map((style) => ({
        ...style.toObject(),
        likeCount: style.likes.length,
      }));
      res.json(stylesWithLikeCount);
      console.log("stylesWithLikeCount", stylesWithLikeCount);
    })
    .catch((error) => {
      console.error("Error fetching style data:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});


router.get("/style/:styleId", (req, res, next) => {
  const { styleId } = req.params;

  Style.findById(styleId)
    .then((style) => res.status(200).json(style))
    // for sending a response back to the client after the server has successfully
    // retrieved and processed the requested data.
    .catch((err) => res.json(err));
});


module.exports = router;