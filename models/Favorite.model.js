const { Schema, model } = require("mongoose");

// Define a schema for each category of data
const favoriteSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  bookmarks: [
    {
      category: {
        type: String,
        required: true,
        enum: ["style", "food", "location", "workouts"],
      },
      title: { type: String, required: true },
      url: {type: String},
      description: String,
      dateAdded: { type: Date, default: Date.now },
    },
  ],
});

const favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = favorite;