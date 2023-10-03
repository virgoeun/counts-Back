// const { Schema, model } = require("mongoose");

// // Define a schema for each category of data
// const favoriteSchema = new Schema({
//   user: { type: Schema.Types.ObjectId, ref: "User" },
//   bookmarks: [
//     {
//       category: {
//         type: String,
//         required: true,
//         enum: ["style", "food", "location", "music"],
//       },
//       title: { type: String, required: true },
//       url: {type: String},
//       description: String,
//       dateAdded: { type: Date, default: Date.now },
//     },
//   ],
// });

// const favorite = model("Favorite", favoriteSchema);

// module.exports = favorite;
