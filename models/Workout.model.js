const { Schema, model } = require("mongoose");

const workoutSchema = new Schema({
    workoutNumber: {
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
    type: String, // You can make this field required if image URLs/paths are essential
  },
  
  // Other fields as needed
});

const Workout = model("Workout", workoutSchema);

module.exports = Workout;