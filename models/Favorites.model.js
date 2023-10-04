const { Schema, model } = require("mongoose");

const favoriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  uri: String,
  name: String,
  category: {
    type: String,
    required: true,
    enum: ["style", "food", "location", "music"],
  },
});

const favorite = model("Favorite", favoriteSchema);

module.exports = favorite;
