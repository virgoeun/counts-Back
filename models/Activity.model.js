const { Schema, model } = require("mongoose");

// Define a schema for each category of data
const activitySchema = new Schema([
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    // category: {
    //   type: String,
    //   enum: ["sleep", "stress", "water", "sports"],
    // },
    sleep: {
      durationInHours: Number,
    },
    water: {
      type: String,
      enum: ["+3 Liters", "+2 Liters", "+1 Liters", "+0.5 Liters"],
    },
    stress: {
      type: String,
      enum: ["Burned-out", "Middle", "Low", "No Stress!"],
    },
    sports: [
      {
        date: {
          type: Date,
          default: Date.now,
        },

        durationInMinutes: Number,

        level: {
          type: String,
          enum: ["High-Intensity", "Mid-Intensity", "Mild"],
        },
        type: {
          type: String,
          enum: [
            "Yoga/Pilates",
            "Weight Training",
            "Crossfit",
            "Walk",
            "Water Sports",
            "Winter Sports",
            "Stretching",
            "Run",
            "Cycle",
            "Hiking",
            "Bouldering",
            "Boxing",
            "Others",
          ],
        },

        description: String,
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
]);

const Activity = model("Activity", activitySchema);

module.exports = Activity;
