const { Schema, model } = require("mongoose");

const styleSchema = new Schema({
    styleNumber: {
        type: Number,
        required: true,
        unique: true,
      },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  imageUrl: {
    type: String, 
  },
  likes: [  { type: Schema.Types.ObjectId, ref: "User" }], //Array!
  // Other fields as needed
});

const Style = model("Style", styleSchema);

module.exports = Style;