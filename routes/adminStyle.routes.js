const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Style= require("../models/Style.model")
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const fileUploader = require("../config/cloudinary.config");
const adminMiddleware = require("../middleware/admin.middleware");


// Initialize Multer with the configured storage
const upload = multer({ CloudinaryStorage });

router.post('/admin-style', adminMiddleware, fileUploader.single("imageFile"), (req, res) => {
  const { styleNumber, title, description } = req.body;

  // Check if an image file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  // Assuming you have already configured Multer to upload the image to Cloudinary
  const imageUrl = req.file.path;

  const newStyle = new Style({ styleNumber, title, description, imageUrl });
  const userId = req.payload._id; // admin user id

  newStyle
    .save()
    .then((savedStyle) => {
    
      User.findByIdAndUpdate(
        userId, 
        { $push: { styles: savedStyle._id } },
        { new: true } 
      )
        .then((updatedUser) => {
          if (!updatedUser) {
            res.status(404).json({ error: 'User not found' });
          } else {
            res.status(201).json(savedStyle);
          }
        })
        .catch((error) => {
          res.status(500).json({ error: 'Internal server error' });
        });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});
  
//do I need this?
  router.get('/admin-style/:styleId', (req, res) => {
    const { styleId } = req.params;
    Style.findById(styleId)
      .then((style) => {
        if (!style) {
          res.status(404).json({ error: 'Workout plan not found' });
        } else {
          res.json(style);
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Internal server error' });
      });
  });

  //EDIT

  router.put('/admin-style/:styleId', (req, res) => {
    const { styleId } = req.params;
    Style.findByIdAndUpdate(styleId, req.body, { new: true })
      .then((updatedStyle) => {
        res.json(updatedStyle);
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  });

  router.delete('/admin-style/:styleId', (req, res) => {
    const { styleId } = req.params;
    Style.findByIdAndDelete(styleId)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  });


//For counting likes with all fetched workouts data : GET
router.get("/admin-style", (req, res) => {
  Style.find()
    .then((styles) => {
      const stylesWithLikeCount = styles.map((style) => ({
        ...style.toObject(),
        likeCount: style.likes.length,//userIds length
      }));
      res.json(stylesWithLikeCount);
      console.log("stylesWithLikeCount", stylesWithLikeCount)
    })
    .catch((error) => {
      console.error("Error fetching workout data:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});


module.exports = router;
